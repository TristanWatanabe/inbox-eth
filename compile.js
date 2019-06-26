 //allows for cross-platform integration
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//sets path that points directly to the contract file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//read raw source code of the file
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];