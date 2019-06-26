const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

//parameters: account mnemonics, url of what network you want to connect to
const provider = new HDWalletProvider("truth thrive drop spell put clay top pioneer nothing repeat ball quarter", "https://rinkeby.infura.io/v3/c0623cdf86d745f89c3c15e828f9fbe4")
// const provider = new HDWalletProvider(
//  'stereo anchor spray copper galaxy recycle forest anxiety december trap drive silly',
//  'https://rinkeby.infura.io/v3/268ce44ab380448fa176774cd98c0e39'
// );

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: ['Hi there!']
    })
    .send({
        gas: '1000000',
        from: accounts[0]
    });

    // const result = await new web3.eth.Contract(JSON.parse(interface))
    //  .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
    //  .send({from: accounts[0]}); // remove 'gas'

    console.log('contract deployed to', result.options.address);
};

deploy();