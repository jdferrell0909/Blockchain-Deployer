const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const { v4: uuidv4 } = require("uuid");
const dotenv = require('dotenv');

dotenv.config();
const nodeAddress = uuidv4().split("-").join("");
const bitcoin = new Blockchain();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blockchain", (req, res) => {
  res.status(200).send(bitcoin);
});

app.post("/transaction", (req, res) => {
  const { amount, sender, recipient } = req.body;
  const blockIndex = bitcoin.createNewTransaction(amount, sender, recipient);
  res
    .status(201)
    .json({ note: `Transaction will be added in block ${blockIndex}.` });
});

app.get("/mine", (req, res) => {
  const { hash, index } = bitcoin.getLastBlock();
  const previousBlockHash = hash;
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: index + 1,
  };
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  bitcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  res.status(200).json({
    note: "New block mined successfully",
    block: newBlock,
  });
});

app.listen(PORT, () => {
  console.log(`server is running..... port# ${PORT}`);
});
