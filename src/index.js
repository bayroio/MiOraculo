var http = require("http");
var  ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider();
//const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/4a822f7586ac479bafffc81d99167a17', "goerli");
/*const provider = new ethers.providers.InfuraProvider("goerli", {
    infura: 'https://goerli.infura.io/v3/4a822f7586ac479bafffc81d99167a17',
    //projectId: "4a822f7586ac479bafffc81d99167a17",
    //projectSecret: "74cf581d44ee465f8829ea1ead408ac4"
});*/
const signer = provider.getSigner();
const contractAddress = '0x256a3A4182D7b09fCED23CBCcecb2Cf1a990008C';

//create a server object:
const contractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newnumber",
        type: "uint256"
      }
    ],
    name: "NumberChanged",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256"
      }
    ],
    name: "setNumber",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "s",
        type: "string"
      }
    ],
    name: "setString",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "newstring",
        type: "string"
      }
    ],
    name: "StringChanged",
    type: "event"
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const myContract = new ethers.Contract(contractAddress, contractAbi, signer); //provider);
//console.log("Contract: ", myContract);

/*var promiseGetString = myContract.getString();
promiseGetString.then(function(result){
  console.log(result);
});

var promiseGetNumber = myContract.getNumber();
promiseGetNumber.then(function(result){
  console.log(result);
});

var promiseNumberChangedEvent = myContract.queryFilter("NumberChanged");
promiseNumberChangedEvent.then(function(result){
    console.log(result);
  });

console.log(myContract.listenerCount(["NumberChanged"]))
*/

/*let topic = ethers.utils.id("NumberChanged(uint256)");
let filter = {
    address: contractAddress,
    topics: [ topic ]
}
provider.on(filter, (result) => {
    console.log(result);
});*/


myContract.on("NumberChanged", (number, event) => {
    console.log(number);
    console.log(event.blockNumber);
});

myContract.on("StringChanged", (cadena, event) => {
    console.log(cadena);
    console.log(event.blockNumber);
    var promiseSetNumber = myContract.setNumber(16);
});


http
  .createServer(function (req, res) {
    res.write("Hello World!");
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
