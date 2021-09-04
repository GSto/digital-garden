# Solidity 

programming language used to write smart contracts.

## Types
- uint - unsigned int
- boolean
- address - refers to an address of a wallet. have their own functions, like 'transfer'.
- struct - like defining an interface in [[TypeScript]]
- bytes32 - string up to 32 characters

## Access modifiers
- public - like any other OOP language
- payable - states than an address can receive tokens(?)


## Structure of a smart contract
Include the license information and solidity version at the top of the file. Example: 

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
```

declare contracts like this: 
```
contract MyContract {

}
```
Contracts can contain
- variable declarations
- a constructor
- functions
- events
- errors

## Developing on The Blockchain
- [Hardhat](https://hardhat.org/) - used for setting up a Solidity development environment.
- [Truffle](https://www.trufflesuite.com/) - another development environment
- [Remix IDE](https://remix.ethereum.org/) - Online IDE

## Resources
- [Documentation](https://docs.soliditylang.org/en/v0.8.7/)
- [Solidity By Example](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html)