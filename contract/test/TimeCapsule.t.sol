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

    function testMintSuccess(address addr) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, "hello world");
        assertEq(timeCap.ownerOf(0), addr);
    }

    function testMintTwiceSuccess(address addr) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, "hello world");
        timeCap.mint(addr, "ok ok ok ok ok");
        assertEq(timeCap.ownerOf(0), addr);
        assertEq(timeCap.ownerOf(1), addr);
    }


    function testFailMintToZero() public {
        timeCap.mint(address(0), "hello world");
        assertEq(timeCap.ownerOf(0), address(0));
    }

    function testFailMintToContract() public {
        timeCap.mint(address(this), "hello world");
        assertEq(timeCap.ownerOf(0), address(this));
    }

    function testBurn(address addr) public {
        vm.assume(addr != address(0));
        vm.assume(addr.code.length <= 0);
        timeCap.mint(addr, "hello world");
        assertEq(timeCap.ownerOf(0), addr);
        timeCap.burn(0);
        vm.expectRevert("ERC721: invalid token ID");
        timeCap.ownerOf(0);
    }

    function testBurnUnauthorized(address addr1, address addr2) public {
        vm.assume(addr1 != address(0));
        vm.assume(addr1.code.length <= 0);
        timeCap.mint(addr1, "hello world");
        assertEq(timeCap.ownerOf(0), addr1);
        vm.prank(addr2);
        vm.expectRevert("Ownable: caller is not the owner");
        timeCap.burn(0);
    }
}
