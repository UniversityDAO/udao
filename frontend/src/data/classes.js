/**
 * Representation of a Proposal object. Contains complete information on proposals.
 * Divided into 4 sections: the proposalCreatedEvent data, ipfs metadata, vote data, and state
 */
export class Proposal {
    constructor(proposalCreatedEvent, ipfsMetadata, voteData, state) {
        this.event = proposalCreatedEvent;
        this.metadata = ipfsMetadata;
        this.votes = {
            forVotes: voteData.forVotes.toNumber(),
            againstVotes: voteData.againstVotes.toNumber(),
            abstainVotes: voteData.abstainVotes.toNumber(),
        };
        this.state = state;
    }
}

/**
 * Isomorphic representation of a Governance contract `ProposalCreated` event
 * See: https://docs.openzeppelin.com/contracts/4.x/api/governance#IGovernor-ProposalCreated-uint256-address-address---uint256---string---bytes---uint256-uint256-string-
 */
export class ProposalCreatedEvent {
    constructor(args) {
        this.proposalId = args.proposalId.toHexString();
        this.proposer = args.proposer;
        this.targets = args.targets;
        this.values = args[3];
        this.signatures = args.signatures;
        this.calldatas = args.calldatas;
        this.startBlock = args.startBlock.toNumber();
        this.endBlock = args.endBlock.toNumber();
        this.description = args.description;
    }
}

/**
 * Proposal metadata information. Title and description are strings from the frontend form.
 * isGrant is a boolean indicating whether this proposal a grant or not.
 */
export class ProposalMetadata {
    constructor(title, description, isGrant) {
        this.title = title;
        this.description = description;
        this.isGrant = isGrant;
    }
}
