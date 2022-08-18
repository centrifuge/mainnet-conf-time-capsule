// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {TimeCapsule} from "src/TimeCapsule.sol";
import "forge-std/Test.sol";

contract TimeCapsuleTest is Test {
    TimeCapsule timeCap = new TimeCapsule("TimeCapsule", "TIME");
    function setUp() public {}

    function testOwner() public {
        assertEq(address(timeCap.owner()), address(this));
    }
    
    function testMintSuccess(address addr, uint id) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, id);
        assertEq(timeCap.ownerOf(id), addr);
    }

    function testMintTwiceSuccess(address addr, uint id1, uint id2) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        vm.assume(id1 != id2);
        timeCap.mint(addr, id1);
        timeCap.mint(addr, id2);
        assertEq(timeCap.ownerOf(id1), addr);
        assertEq(timeCap.ownerOf(id2), addr);
    }

    function testMintSameID(address addr, uint id1) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, id1);
        vm.expectRevert('ERC721: token already minted');        
        timeCap.mint(addr, id1);
    }


    function testFailMintToZero(uint id) public {
        timeCap.mint(address(0), id);
        assertEq(timeCap.ownerOf(id), address(0));
    }

    function testFailMintToContract(uint id) public {
        timeCap.mint(address(this), id);
        assertEq(timeCap.ownerOf(id), address(this));
    }

    function testBurn(address addr, uint id) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, id);
        assertEq(timeCap.ownerOf(id), addr);
        timeCap.burn(id);
        vm.expectRevert("ERC721: invalid token ID");
        timeCap.ownerOf(id);
    }

    function testBurnUnauthorized(address addr1, address addr2, uint id) public {
        vm.assume(addr1 != address(0));
        vm.assume(addr2 != address(0));
        vm.assume(addr2 != address(this));
        vm.assume(addr1.code.length <= 0);
        timeCap.mint(addr1, id);
        assertEq(timeCap.ownerOf(id), addr1);
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(addr2);
        timeCap.burn(0);
    }

    function testSetBaseURI(string memory baseURI) public {
        timeCap.setBaseURI(baseURI);
        assertEq(baseURI, timeCap.baseURI());
    }

    function testSetBaseURIUnauthorized(string memory baseURI, address addr1) public {
        vm.assume(addr1 != address(0));
        vm.assume(addr1 != address(this));
        vm.expectRevert("Ownable: caller is not the owner");
        vm.prank(addr1);
        timeCap.setBaseURI(baseURI);
    }
}
