// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {TimeCapsule} from "src/TimeCapsule.sol";
import "forge-std/Test.sol";

contract TimeCapsuleTest is Test {
    TimeCapsule timeCap = new TimeCapsule();
    function setUp() public {}

    function testExample() public {
        assertEq(address(timeCap.owner()), address(this));
    }
}
