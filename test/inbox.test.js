const assert = require('assert');
const ganache = require('ganache-cli');
// Web3 is a constructor, we use it to create an instance of Web3
const Web3 = require('web3');
// creates an instance of web3 and tells that instance to connect to ganache network
//request the provider() to other networks if you want (rinkeby)
const { interface, bytecode} = require('../compile');
const provider = ganache.provider();

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};


const web3 = new Web3(provider, null, OPTIONS);
const INITIAL_STRING = "Hi there!";
let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_STRING]})
    .send({from: accounts[1], gas: "1000000"});
})


describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    })

    it('can change the message', async() => {
        const newMessage = "BYE!"
        await inbox.methods.setMessage(newMessage).send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessage);

    })

});