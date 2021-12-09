const simpleStorageABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "data",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const simpleStargeAddress = '0x33c8112B8fD27216E46a884f47BB3BEB1e823a0d';
const web3 = new Web3('http://localhost:9545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStargeAddress);

document.addEventListener('DOMContentLoaded', () => {

  const $setData = document.getElementById('setData');
  const $data = document.getElementById('data');
  let accounts = [];

  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  const getData = () => {
    simpleStorage.methods
      .get()
      .call()
      .then(result => {
        $data.innerHTML = result;
      })
  };

  getData();

  $setData.addEventListener('submit', e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    simpleStorage.methods
      .set(data)
      .send({from: accounts[0]})
      .then(getData);
  })

});