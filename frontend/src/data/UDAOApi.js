import * as web3Storage from './web3StorageAPI'

/**
 * @typedef UDAOGrant
 * @property {String} - title
 * @property {String} - description
 * @property {Number} - yesVotes
 * @property {Number} - noVotes
 * @property {Boolean} - isActive
 * @property {String[]} - tags
 */

/**
 * @typedef UDAOProposal
 * @property {String} - title
 * @property {String} - description
 * @property {Number} - yesVotes
 * @property {Number} - noVotes
 * @property {Boolean} - isActive
 * @property {String[]} - tags
 */


/*
    Technically, the getGrants and getProposals methods could be combined 
    into one since they basically do the same thing just with
    different file names. They are just separated here for 
    ease of use / readability. 
*/

/**
 * Retrieve the array of UDAOGrant objects
 * from IPFS (Web3Storage). Note: This method assumes
 * that the archive specified by the name contains
 * a single JSON file containing the grants.
 * @param {String} [archiveName=Grants.json] - Optional name 
 * of the Web3Storage archive containing the Grants.  
 * @returns {Promise<UDAOGrant[]>} - Array of UDAOGrant objects. 
 */
export async function getGrants(){
    let grants = [];
    const allContainers = await web3Storage.listContentsWithText();
    allContainers.forEach((container) => {
        if(container.name.substring(0, 5)== 'Grant') {
            console.log(container.text);
            let textContents = container.text;
            let grant = JSON.parse(textContents);
            grant.cid = container.cid;
            grants.push(grant);   
        }
    });
    return grants;
}

export async function getItemsByCID(cid) {
    if(cid) {
        const grantsArchive = await web3Storage.retrieveArchiveByCid(cid);
        if(grantsArchive) {
            let textContents = await grantsArchive[0].text();
            return JSON.parse(textContents);
        }
    }
}


/**
 * Add a new Grant 
 * @param {UDAOGrant} grant - Grant object to be added. 
 * @param {String} [archiveName=Grants.json] - Optional name of the
 * Web3Storage archive containing the Grants. Defaults to Grants.json.
 * @returns {Promise<String>} - The CID of the new grant. 
 */
export async function addGrant(grant, archiveName){
    if(!archiveName){
        archiveName = 'Grants.json';
    }

    let grants = await getGrants(archiveName);

    if(Array.isArray(grants)){
        //TODO: You probably want some sort of duplicate checking
        //here in case a grant with the same title, properties, etc. 
        //has already been previously created.
        grants.push(grant);
        const grantsBlob = new Blob([JSON.stringify(grants)], { type:'application/json'});
        const files = [
            new File([grantsBlob], `${grant.title}.json`)
        ];

        console.log(`Calling web3Storage.upload with archiveName: ${archiveName}`);
        const newGrantCid = await web3Storage.upload(files, archiveName);
        //Once you have the CID of the new grant, you would want to 
        //add it to your index on IPFS, initialize it on the blockchain, etc.
        return newGrantCid;
    }
    else{
        //If the grants archive can't be found, the getGrants array will
        //throw the error. However if an object is found but isn't an array
        //we need to throw a different type of error. 
        throw new Error(`An error occurred while parsing the grants in ${archiveName}. The object returned was not an array.`);
    }
}

/**
 * Retrieve the array of UDAOProposal objects
 * from IPFS (Web3Storage). Note: This method assumes
 * that the archive specified by the name contains a 
 * single JSON file containing the proposals.
 * @param {String} [archiveName=Proposals.json] - Optional name 
 * of the Web3Storage archive containing the Proposals.
 * @returns {Promise<UDAOProposal[]} - Array of UDAOProposal objects.
 */
export async function getProposals(){
let proposals = [];
    const allContainers = await web3Storage.listContentsWithText();
    allContainers.forEach((container) => {
        if(container.name.substring(0, 8)== 'Proposal') {
            let textContents = container.text;
            let proposal = JSON.parse(textContents);
            proposal.cid = container.cid;
            proposals.push(proposal);   
        }
    });

    return proposals;
}

/**
 * Add a new Proposal
 * @param {UDAOProposal} proposal - Proposal object to be added. 
 * @param {String} [archiveName=Proposals.json] - Optional name of the
 * Web3Storage archive containing the Proposals. Defaults to Proposals.json.
 */
export async function addProposal(proposal, archiveName){

}