// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


contract SimpleDeFiToken is ERC20 {
    constructor() ERC20("Simple DeFi Token", "SDFT") {
        _mint(msg.sender, 1e24);
    }
    function transferWithAutoBurn(address to, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Not enough tokens");
        uint256 burnAmount = amount / 10;
        // require(amount > 0, "You are not allowed to transfer a nigative number of tokens!");
        // console.log(
        //     "Burning %s from %s, balance is %s",
        //     burnAmount,
        //     msg.sender,
        //     balanceOf(msg.sender)
        // );
        
        _burn(msg.sender, burnAmount);
        // console.log(balanceOf(msg.sender));
        transfer(to, amount - burnAmount);
    }
}