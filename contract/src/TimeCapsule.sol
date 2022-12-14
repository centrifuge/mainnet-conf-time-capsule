// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

contract TimeCapsule is Ownable, ERC721Enumerable {
    using Strings for uint256;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) public {
    }

    string private _baseTokenURI;

    function mint(address to, uint256 id) public payable {
        _safeMint(to, id);
    }

    function burn(uint256 id) onlyOwner public {
        _burn(id);
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI(), tokenId.toString(), ".svg"));
    }
}
