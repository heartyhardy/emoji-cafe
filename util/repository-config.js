/*
    Fetch the repository from the Node env. (see package.json)
*/

const REPO_TYPE = process.env.REPO_TYPE;

const file_repo = require('../data/repositories/file-repository');

const getRepository = () => {
    switch(REPO_TYPE)
    {
        case 'FILE':
            return file_repo;
        default:
            return null;
    }
}

module.exports = {
    getRepository
}