const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

const previousBlockHash = 'JFDSHJKFSD3324343';
const currentBlockData = [
  {
    amount: 10,
    sender: 'dsdjsdkjs',
    recipient: 'fdfdfdfdaaa'
  },
  {
    amount: 200,
    sender: '12345dsdjsdkjs',
    recipient: '6789fdfdfdfdaaa'
  },
  {
    amount: 10,
    sender: '88888dsdjsdkjs',
    recipient: '7777fdfdfdfdaaaa'
  }
];
const nonce = 100;

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

