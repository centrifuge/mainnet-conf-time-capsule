// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TimeCapsule is Ownable, ERC721Enumerable {

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) public {
    }

    mapping(uint => address) ownership;
    mapping(uint => string) messages;

    function mint(address to, string calldata message) public payable {
        uint256 id = totalSupply();
        messages[id] = message;

        _safeMint(to, id);
    }

    function burn(uint256 id) onlyOwner public {
        _burn(id);
    }
}
