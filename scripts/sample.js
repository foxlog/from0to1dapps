// -----------
// run script: node scripts/sample.js
// -----------

const Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');
const ProjectList = require('../compiled/ProjectList');
const address = require('../address.json');
const web3 = new Web3(new HDWalletProvider(
    process.env.metamasksecretkey,
    process.env.infuratestneturl
));
const contract = new web3.eth.Contract(JSON.parse(ProjectList.interface), address);


(async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const projects = [
        {
            description: 'Ethereum DApp Tutorial',
            minInvest: web3.utils.toWei('0.01', 'ether'),
            maxInvest: web3.utils.toWei('1', 'ether'),
            goal: web3.utils.toWei('1')
        },

        {
            description: 'Ethereum Video Tutorial',
            minInvest: web3.utils.toWei('0.1', 'ether'),
            maxInvest: web3.utils.toWei('1', 'ether'),
            goal: web3.utils.toWei('5', 'ether'),
        },

    ];

    console.log('projects',projects);

    const owner = accounts[0];
    console.log('owner:', owner);
    const results = await Promise.all(projects.map(x =>
        contract
            .methods.createProject(x.description, x.minInvest, x.maxInvest, x.goal)
            .send({from: owner, gas: '2000000'})));


    console.log(results);
})();

