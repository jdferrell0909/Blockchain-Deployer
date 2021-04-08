const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const { v4: uuidv4 } = require("uuid");
const rp = require("request-promise");
// const dotenv = require('dotenv');

// dotenv.config();
const nodeAddress = uuidv4().split("-").join("");
const bitcoin = new Blockchain();
const PORT = process.argv[2];

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

// register a node and broadcast it to the network
app.post("/register-and-broadcast-node", (req, res) => {
  const { newNodeUrl } = req.body;
  if (bitcoin.networkNodes.includes(newNodeUrl))
    bitcoin.networkNodes.push(newNodeUrl);

  const regNodesPromises = [];
  bitcoin.networkNodes.forEach((node) => {
    const requestOptions = {
      uri: networkNodesUrl + "/register-node",
      method: "POST",
      body: { newNodeUrl },
      json: true,
    };

    rp(requestOptions);
  });

  Promise.all(reqNodesPromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
      };

      return rp(bulkRegisteroptions);
    })
    .then((data) => {
      res.json({ note: "New node registered with network successfully" });
    });
});

// register a node with the network
app.post("/register-node", (req, res) => {
  const { newNodeUrl } = req.body;
  const nodeNotAlreadyPresent = !bitcoin.networkNodes.includes(newNodeUrl);
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode)
    bitcoin.networkNodes.push(newNodeUrl);
  res.json({ note: "New node registered successfully." });
});

// register multiple nodes at once
app.post("/register-nodes-bulk", (req, res) => {});

app.listen(PORT, () => {
  console.log(`server is running..... port# ${PORT}`);
});
