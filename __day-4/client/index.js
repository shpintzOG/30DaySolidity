import Web3 from 'web3';
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

// holds the web3 value 
let web3;
// contract instance of our smart contract
let advancedStorage;

// initalize web3 instance
const initWeb3 = () => {
  return new Promise((resolve, reject) => {

    // case 1: new metamask is present
    if(typeof window.web3 !== 'undefined'){
      window.ethereum.enable()
        .then(() => {
          resolve (
            new Web3(window.ethereum)
          )
        })
        .catch((e) => {
          reject(e);
        })

        return;
    }

    // case 2: old metamask is present
    if(typeof window.web3 !== 'undefined'){
      return resolve (
        new Web3(window.web3.currentProvider)
      )
    }


    // case 3: no metamask present, connect to ganache
    resolve(new Web3('http://localhost:9545'));
  })

};

// intialize advanced storage variable - a way to interact with smart contract
const initContract = () => {
  
  // gets the key from networks first object
  const deploymentKey = Object.keys(
    AdvancedStorage.networks
  )[0];

  return new web3.eth.Contract(
   
    AdvancedStorage.abi,
    AdvancedStorage.networks[deploymentKey].address,
  )
}

// initialze the whole app - where we will actually use the functions ^^
const initApp = () => {

  const $addData = document.getElementById('addData');
  const $data = document.getElementById('data');
  let accounts = [];

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
      return advancedStorage.methods
        .getall()
        .call()
    })
    .then(result => {
      $data.innerHTML = result.join(', ')
    })

    $addData.addEventListener('submit', e => {
      e.preventDefault();
      const data = e.target.elements[0].value;
      advancedStorage.methods
        .add(data)
        .send({from:accounts[0]})
        .then(() => {
          return advancedStorage.methods
            .getall()
            .call()
        })
        .then(result => {
          $data.innerHTML = result.join(', ')
        })
    })

};


// wait till dom is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // create web3 inistance
  initWeb3()
    .then(_web3 => {
      // set global variable to intilized web3
      web3 = _web3;
      advancedStorage = initContract();
      initApp();
    })
    .catch(e => console.log(e.message))
});

