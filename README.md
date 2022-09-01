# UDAO
The University DAO (UDAO) has two main objectives:
1. Increase awareness and education about blockchain and web3 across campus.
2. Fund student projects [TODO: is it important to us that the projects benefit
the wider community or is this not a requirement?].

Draft stuff:
This is an experiment in seeing how students may want to fund other students'
projects. In the following section we outline how the DAO will be governed.

## Governance
The main actions of governance occur in the following ways:
- Voting on proposals
- Voting on grants

### Proposals
Proposals are anything that concern the operation/structure of the DAO. For example:
- Increase the voting threshold from 30 to 50
- Increase the treasury budget from $1000 to $2000
- Cut the grant application window from 4 weeks to 2 weeks
- Move the DAO to the Cardano blockchain

They are anything that concern the internal operation of the DAO, from as small a
change as the voting threshold to as large a one as starting a new DAO initiative.
Thus, proposals can only be _created_ by DAO members.

The lifetime of a proposal will likely be as follows:
1. Informal Discussion - the creator(s) will initiate a discussion about their
proposed change, on Discord or some other platform, where DAO members can chat
about the implications of the proposal.
2. Creation - at any time, the creator(s) can choose to actually create their
proposal. Concretely, this means that the creator(s) will fill out a "proposal form".
The proposal metadata will be stored on IPFS, while data essential to voting
on the proposal will be stored on the blockchain. More on this later.
3. Voting - after creation, the proposal will appear on the DAO webpage, and members
can vote yes/no/abstain on the proposal. The creator(s) can elect to immediately
enter a voting phase after creation or wait a set time period. All of this data is stored
on-chain.
4. Conclusion - if the proposal is passed, the actions entailed must be taken.

Finally, only those that are members of the DAO, ie, they hold UDAO NFTs, are able to create
proposals. Each member is allowed only 1 vote.

### Grants
Grants are the actual student projects that UDAO elects to fund from its treasury
resources.

TODO

## Contracts Architecture
`IGovernor.sol` - Interface of the `Governor` core contract. 

### Governor.sol
This is the core contract that houses all of the logic and primitives
for governance. Everything else are modules/extensions added to this. Concretely, this
contract has the logic for:
- Casting votes
- Creating proposals
- Retrieving various parameters: voting delay, voting period, etc.

Uses of this contract:
- Stores `ProposalCore`s, which tracks vote start and end, state of proposal
- Query state of proposal
- Query deadlines of proposal

This contracts implements most of the methods in `IGovernor.sol`. It is also an
abstract contract and requires implementation of some functions.

`Governor.sol` does not implement the following functions defined in `IGovernor.sol`:
- COUNTING_MODE() (defined in `GovernorCountingSimple.sol`)
- quorum()
- hasVoted() (defined in `GovernorCountingSimple.sol`)
- votingDelay()
- votingPeriod()

Additionally, the contract has its own virtual functions, which must be implemented:
- `_quorumReached` (defined in `GovernorCountingSimple.sol`)
- `_voteSucceeded` (defined in `GovernorCountingSimple.sol`)
- `_getVotes` (defined in `GovernorVotes.sol`)
- `_countVote` (defined in `GovernorCountingSimple.sol`)

### GovernorCountingSimple.sol
A module that extends `Governor.sol` for a simple, 3 options, vote counting mechanism.
This is also an abstract contract, and inherits from `Governor.sol`.

Uses of this contract:
- Defining the vote types (for, against, abstain)
- Stores the votes for each proposal, as well as tracks if a member has voted or not
- Fetch the vote data for a proposal

TODO: figure out how the `_quorumReached()` function knows where to call `quorum()`

### GovernorVotes.sol
An extension of `Governor.sol`, used to extract voting weight based on an `ERC721Votes`
token, which our MembershipNFT inherits from.

I don't think this contract can be used directly. The important thing that it does is
set our NFT as the token used for voting. It implements `_getVotes`, but all that should
do is return 1, since members will only have 1 NFT (for now at least).

