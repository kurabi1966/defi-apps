// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleDeFiToken is ERC20 {
    constructor() ERC20("Simple DeFi Token", "SDFT") {
        _mint(msg.sender, 1e24);
    }
}