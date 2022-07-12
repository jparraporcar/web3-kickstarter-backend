# Short summary (documentation preparation ongoing)

The project is the backend for a kickstarter-like application where users interested in collecting funds can create campaigns.

- Only the creator of a campaign can carry out speficic actions
- The different actions related with a campaing must be approved by votation of the contributors
- In order for a campaign action to be approved needs to collect more than 50% of positive votes

### Content of the project:

1. /ethereum/build

Contract Solidity/JavaScript interface

2. /ethereum/contracts

Raw Solidity contracts

3. /ethereum/compile.js

Solidity compiler. It has to be executed in order to create the Solidity/JavaScript interface

4. /test/campaign.test.js

Contains all tests to be carried out in the local ganache provider prior to the deployment in the Ethereum testnet and mainnnet

### Steps to test the code:

1. -> run npm install

2. Compile Solidity contracts: -> node compile.js

3. test with mocha in local ganache provider the contract: -> npm test

4. deploy contract (ethereum testnet) -> node deploy.js

# Project Title

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

- Describe any prerequisites, libraries, OS version, etc., needed before installing program.
- ex. Windows 10

### Installing

- How/where to download your program
- Any modifications needed to be made to files/folders

### Executing program

- How to run the program
- Step-by-step bullets

```
code blocks for commands
```

## Help

Any advise for common problems or issues.

```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

- 0.2
  - Various bug fixes and optimizations
  - See [commit change]() or See [release history]()
- 0.1
  - Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments
