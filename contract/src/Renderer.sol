//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './SVG.sol';
import './Utils.sol';

contract Renderer {
    function render(uint256 _tokenId, string memory message) public pure returns (string memory) {
        return
            string.concat(
                '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" style="background:#000">',
                svg.text(
                    string.concat(
                        svg.prop('x', '20'),
                        svg.prop('y', '40'),
                        svg.prop('font-size', '22'),
                        svg.prop('fill', 'white'),
                        svg.prop('font-family', 'Montserat')
                    ),
                    string.concat(
                        svg.cdata('Centrifuge Time Capsule #'),
                        utils.uint2str(_tokenId)
                    )
                ),
                svg.foreignObject(
                    string.concat(
                        svg.prop('x', '40'),
                        svg.prop('y', '60'),
                        svg.prop('width', '300'),
                        svg.prop('height', '300')
                    ),
                    svg.textarea(
                        string.concat(
                            svg.prop('readonly', 'true'),
                            svg.prop('rows', '10'),
                            svg.prop('style',
                                string.concat(
                                    "cursor: unset; "
                                    "background: transparent; "
                                    "color: white; "
                                    "border: none; "
                                    "font-size: 16px; "
                                    "resize: none; "
                                )
                            )
                        ), "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the disabled attribute, the readonly attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.")
                ),
                svg.rect(
                    string.concat(
                        svg.prop('fill', 'purple'),
                        svg.prop('x', '20'),
                        svg.prop('y', '50'),
                        svg.prop('width', utils.uint2str(160)),
                        svg.prop('height', utils.uint2str(10))
                    ),
                    utils.NULL
                ),
                '</svg>'
            );
    }

    function example() external pure returns (string memory) {
        return render(1, "I predict the world will be round");
    }
}
