const Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
//console.log(web3);

//转换string to byte
console.log(Web3.utils.stringToHex('AUDI'));
//result: 0x41554449

//转换byte到string
console.log(Web3.utils.hexToUtf8('0x41554449'));

