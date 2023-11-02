// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract YourSolidityContract {
    uint256 private storedValue;

    event ValueChanged(uint256 newValue);

    function setValue(uint256 _newValue) public {
        storedValue = _newValue;
        emit ValueChanged(_newValue);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
    
}
