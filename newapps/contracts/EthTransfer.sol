// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract EthTransfer {
    function transfer(address payable to) external payable {
        require(msg.value > 0, "Must send Ether");
        to.transfer(msg.value);
    }
}
