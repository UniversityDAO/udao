
/**
 * Get a list of grants from the data source. 
 * @returns {Object[]} - Array of grant objects
 */
export function getGrants(){
    return [
        { 
            title: "Give Austin $15,000", 
            desc: "Please I'm broke", 
            yesVotes: 75, 
            noVotes: 16, 
            active: true, 
            tags: ["Money"]
        },
        { 
            title: "Give Victor $2", 
            desc: "Want Hershey's bar", 
            yesVotes: 49, 
            noVotes: 38, 
            active: false, 
            tags: ["Money"]
        },
        {
            title: "Give Carter $25,000", 
            desc: "Must buy more ETH", 
            yesVotes: 1, 
            noVotes: 420, 
            active: true, 
            tags: ["Money", "Investing"]},
        { 
            title: "Give Jagger $420", 
            desc: "Drug Money", 
            yesVotes: 69, 
            noVotes: 2, 
            active: false, 
            tags: ["Money", "Drugs"]}
    ];
}

/**
 * Gets proposals from ipFS
 * @returns {Object[]} - Array of proposal objects. 
 */
export function getProposals(){
    return [
        { 
            title: "Talk about Binance smart chain at next meeting", 
            desc: "Binance is amazing", 
            yesVotes: 1, 
            noVotes: 1000, 
            active: true, 
            tags: ["Meeting"]},
        { 
            title: "Promote Austin to supreme emperor", 
            desc: "You already know what to do", 
            yesVotes: 15000, 
            noVotes: 3, 
            active: true, 
            tags: ["Member Roles"]},
        { 
            title: "Hold a poster competition for UDAO", 
            desc: "Promote UDAO and our message", 
            yesVotes: 47, 
            noVotes: 15, 
            active: false, 
            tags: ["Awareness"]},
        { 
            title: "Start minting our own Bored Ape NFTs", 
            desc: "Let's make an exclusive club", 
            yesVotes: 17, 
            noVotes: 51, 
            active: true, 
            tags: ["NFTs"]}
    ];
}
