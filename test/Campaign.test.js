const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
//require the .json version of the compiled files
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("testing", () => {
  let balance;
  it("prints accounts", async () => {
    for (let account of accounts) {
      balance = await web3.eth.getBalance(account);
      console.log(account, balance);
    }
    assert(true);
  });
});

describe("Campaigns", () => {
  it("deployes a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.ok(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as aprovers", async () => {
    await campaign.methods
      .contribute()
      .send({ value: "200", from: accounts[1] });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert.ok(isContributor, true);
  });

  it("It is not posible to contribute with a value less than 100", async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ value: "90", from: accounts[0] });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("A manager has the hability to create a payment request", async () => {
    await campaign.methods
      .createRequest("test request", "9999", accounts[1])
      .send({ from: accounts[0], gas: "1000000" });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.description, "test request");
  });

  it("processeses requests", async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[0], value: web3.utils.toWei("10", "ether") });

    let accountOneInitialBalance = await web3.eth.getBalance(accounts[1]);
    accountOneInitialBalance = web3.utils.fromWei(
      accountOneInitialBalance,
      "ether"
    );
    accountOneInitialBalance = parseFloat(accountOneInitialBalance);
    console.log(accountOneInitialBalance);

    await campaign.methods
      .createRequest(
        "buy cocacola",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    let accountOneFinalBalance = await web3.eth.getBalance(accounts[1]);
    accountOneFinalBalance = web3.utils.fromWei(
      accountOneFinalBalance,
      "ether"
    );
    accountOneFinalBalance = parseFloat(accountOneFinalBalance);
    console.log(accountOneFinalBalance);

    inputEther = accountOneFinalBalance - accountOneInitialBalance;
    console.log(inputEther);
    assert(inputEther >= 5);
  });
});
