// SPDX-License-Identifier: BSD-3-Clause

pragma solidity ^0.6.0;

contract GetterSetter {
    uint storedNumber;
    string storedString;
    
    event NumberChanged(uint);
    event StringChanged(string);

    constructor () public {
        storedNumber = 2020;
        storedString = "Mexico";
    }

    function setNumber(uint x) public {
        storedNumber = x;
        emit NumberChanged(x);
    }

    function getNumber() public view returns (uint) {
        return storedNumber;
    }

    function setString(string memory s) public {
        storedString = s;
        emit StringChanged(s);
    }

    function getString() public view returns (string memory) {
        return storedString;
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}