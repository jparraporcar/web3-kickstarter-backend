const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
import "dotenv/config";
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.SECRET_PHRASE,
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/5caf1cf68d724da793266c0f0db09176"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: "1000000" });
    console.log("Contract deployed to", result.options.address);
  } catch (err) {
    console.log(err);
  }
  provider.engine.stop();
};
deploy();
