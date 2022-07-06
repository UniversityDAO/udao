import { Web3Storage } from 'web3.storage'
//import { ipfsConfig } from './config.js'

import Loading from "../components/Loading/loading"

//Testing token
//const accessToken = ipfsConfig.web3AccessToken;
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENmOUUyRjI3MzQ0ZTFmQzU5QzEzNDg5RDc4NDRBRjQ4N0ZGMEYwRUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU1NzI5NzU2NjQsIm5hbWUiOiJEQU9Ub2tlbiJ9.xfAGJ0lBKio5FU66gQLbHpNfhJtibz8UBmlKY-RhA0g'

/**
 * A Web3 Storage object that extends the standard File object
 * @typedef {Object} Web3File
 * @property {String} cid - IPFS content identifier
 * @property {String} path - Relative path of the file
 */

/**
 * A Web3 Storage object containing the metadata of 
 * an uploaed file.
 * @typedef {Object} Web3Upload
 * @property {String} name - Descriptive name of the upload (if provided, otherwise generated)
 * @property {String} cid - IPFS content identifier
 * @property {String} created - Date/Time the upload was created
 * @property {Number} dagSize - Directed Acylic Graph size in bytes
 * @property {Object[]} pins - Array of IPFS nodes that have pinned the upload
 * @property {Object[]} deals - Array of Filecoin storage providers
 * with storage deals for the uplaod
 */

/**
 * A summarized version of the Web3Upload object containing 
 * the most used fields. 
 * @typedef {Object} Web3UploadSummary 
 * @property {String} name - - Descriptive name of the upload (if provided, otherwise generated
 * in the format of 'Uploaded at {ISODateTime}'). 
 * @property {String} cid - IPFS content identifier
 * @property {String} created - Date/Time the upload was created
 */

/**
 * A Web3 Storage object that extends the standard 
 * Fetch API Response object. Note: Not all of the 
 * Response properties are listed here. Just some important
 * ones and the ones included in the Web3 Storage extension.
 * @typedef {Object} Web3Response
 * ** Standard Response properties **
 * @property {ReadableStream} body - Http response body contents
 * @property {Boolean} ok - Flag indicating if the response was 
 * successfull. (http response status between 200 and 299)
 * @property {Number} status - Http response status code
 * @property {String} statusText - Http message related to the status code
 * ***
 * ** Web3 specific properties ** 
 * @property {Web3File[]} files - Async function that returns an array of
 * Web3File objects. 
 * @property {UNIXFS[]} unixFsIterator - Not used, use files() 
 * instead. (Exists for backward compatibility)
 */


/**
 * Create a new Web3Storage client with the access token contained
 * in the configuration file or environment variables.
 * @returns {Object} - A new Web3Storage client.
 */
function makeStorageClient(){
    return new Web3Storage({
        token:accessToken
    });
}

/**
 * Upload one or more files to Web3Storage IPFS. Note: The name 
 * of the archive is required to allow the option for the archive
 * to later be retrieved by name. 
 * @param {File[]} files - Array of File objects to be stored in a 
 * single content archive. If multiple files are included, 
 * they will all be available at the returned cid. 
 * @param {String} archiveName - Name of the archive containing the
 * uploaded file(s). *Required
 * @param {Boolean} [withProgress] - Optional flag to emit
 * progress events as chunks of the files are being uploaded.
 * @returns {Promise} - IPFS content identifier string
 */
export async function upload(files, archiveName, withProgress){
    if(!archiveName){
        throw new Error('The archiveName parameter must be provided. It will make your life easier down the road.');
    }
    
    const client = makeStorageClient();
    let options = {
        name:archiveName
    };
    if(withProgress){
        //TODO: Replace temporary console logging for the upload progress. 
        options.onStoredChunk = chunkSize => console.log(`Stored ${chunkSize} bytes...`);
    }

    const cid = await client.put(files, options);
    return cid;
}

/**
 * Retrieve a Content Archive by its CID.  
 * @param {String} cid - IPFS content identifier
 * @returns {Promise<Web3File[], undefined>} - Array of Web3File objects
 * corresponding to the provided cid or undefined if there are no matches.   
 */
export async function retrieveArchiveByCid(cid){
    const client = makeStorageClient();
    const response = await client.get(cid);

    if(response.ok){
        const archives = await response.files();
        return archives;
    }
    else{
        throw new Error(`Call to the Web3Storage api for cid ${cid} failed. HttpResponse: ${response.status} - ${response.statusText}`);
    }
}

/**
 * Retrieve a Content Archive by its name
 * @param {String} archiveName - Name of the archive provided when it was uploaded. 
 * @returns {Promise<String, null>} - The Web3File (CAR) object
 * corresponding to the provided name or null if there are no matches. 
 */
export async function retrieveArchiveCidByName(archiveName){
    let uploads = await listContents();

    const archiveIndex = uploads.findIndex(u => u.name === archiveName);
    if(archiveIndex !== -1){
        const archive = uploads[archiveIndex];
        return archive.cid;
    }
    
    //Archive was not found for this api token.
    return null;
}

/*
    Note: Web3Storage only stores the cid of the file and its contents
    within an archive. That is why there is no retrieve by file name
    method. The file names themselves are just for viewing within the
    Web3Storage browser page. 
*/

/**
 * Retrieve an individual file based on its CID and the CID
 * of the archive it is being stored in. 
 * @param {String} archiveCid - CID of the archive the file is in. 
 * @param {String} fileCid - CID of the file being requested. 
 * @returns {Promise<File, null>} - File object corresponding to 
 * the provided fileCid or null if there are no matches. 
 */
export async function retrieveFileByArchiveCidFileCid(archiveCid, fileCid){
    const archive = await retrieveArchiveByCid(archiveCid);
    if(archive){
        const fileIndex = archive.findIndex(f => f.cid === fileCid);
        if(fileIndex !== -1){
            return archive[fileIndex];
        }
    }
    else{
        //If the archive cid is not found, we want to differentiate 
        //between passing in an invalid archive cid vs a file that
        //isn't found.
        throw new Error(`An archive with CID: ${archiveCid} was not found.`);
    }

    //File was not found within the archive
    return null;
}

/**
 * Retrieve an individual file based on its CID and the name
 * of the archive it is being stored in. 
 * @param {String} archiveName - Name of the archive the file is in. 
 * @param {String} fileCid - CID of the file being requested. 
 * @returns {Promise<File, null>} - File object corresponding to 
 * the provided fileCid or null if there are no matches. 
 */
export async function retrieveFileByArchiveNameFileCid(archiveName, fileCid){
    const archiveCid = await retrieveArchiveCidByName(archiveName);
    
    if(archiveCid){
        return await retrieveFileByArchiveCidFileCid(archiveCid, fileCid);
    }
    else{
        throw new Error(`An archive named ${archiveName} was not found.`);
    }
}

/**
 * Retrieve a list of uploaded content archives associated with the
 * configured access token.
 * @returns {Promise<Web3UploadSummary[]>} An array of summarized Web3Upload objects
 */
export async function listContents(){
    let uploads = [];
    const client = makeStorageClient();
    for await (const upload of client.list()){
        //The name, cid, date created are probably the
        //most important properties right now but the remaining
        //properties could always be added later. 
        uploads.push({
            name:upload.name,
            cid:upload.cid,
            created:upload.created
        });
    }

    return uploads;
}

export async function listContentsWithText(){
    let uploads = [];
    const client = makeStorageClient();
    for await (const upload of client.list()){
        //The name, cid, date created are probably the
        //most important properties right now but the remaining
        //properties could always be added later. 
        let files = await retrieveArchiveByCid(upload.cid);
        uploads.push({
            name:upload.name,
            cid:upload.cid,
            created:upload.created,
            text: await files[0].text()
        });
    }

    return uploads;
}