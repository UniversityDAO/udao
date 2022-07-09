// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";

contract Governance is Governor, GovernorCountingSimple, GovernorVotes {
    constructor(IVotes _token, string memory name) Governor(name) GovernorVotes(_token) {}

    // NOTE: voting delay won't really matter since everyone's voting power is effectively fixed--
    // each member can have one and only one MembershipNFT. They cannot purchase or obtain more.
    // the only thing a delay will serve us is additional time before voting begins
    function votingDelay() public pure override returns (uint256) {
        return 0; // 1 block
    }

    function votingPeriod() public pure override returns (uint256) {
        return 45818; // 1 week
    }

    // The minimum number of cast votes required for a proposal to be successful. It can
    // be a fixed value, or fluctuate based on the `blockNumber`.
    function quorum(uint256) public pure override returns (uint256) {
        return 1; // for now, set to 1 for easier testing
    }

    // The number of votes required for a voter to become a proposer, ie, make a proposal
    // for the DAO.
    // I think what this means is how many "tokens" one must have in order to make a proposal.
    // "votes" refers to "tokens" here because the entire voting system relies on whether
    // someone has tokens (ERC20, or ERC721). "votes" does not refer to the traditional sense
    // of "votes", ie, an indication of some choice.
    // So we set the threshold to 1, since a user must have 1 MembershipNFT in order to vote.
    function proposalThreshold() public pure override returns (uint256) {
        return 1;
    }
}
