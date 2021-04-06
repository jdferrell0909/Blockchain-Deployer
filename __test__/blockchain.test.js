const Blockchain = require("../dev/blockchain");

describe("Constructor function", () => {
  const newChain = new Blockchain();
  it("should create new instance of Blockchain", () => {
    expect(newChain).toBeInstanceOf(Blockchain);
  });

  it("should have chain and pendingTransaction properties", () => {
    expect(newChain).toHaveProperty("chain");
    expect(newChain).toHaveProperty("pendingTransactions");
  });

  it("should have genesis block as first index on chain array", () => {
    expect(typeof newChain.chain[0]).toBe("object");
  });

  it("genesis block should have a hash of 0, nonce of 100, previousBlockHash as 0, and empty array as transactions", () => {
    expect(newChain.chain[0].hash).toEqual("0");
    expect(newChain.chain[0].nonce).toEqual(100);
    expect(newChain.chain[0].previousBlockHash).toEqual("0");
    expect(Array.isArray(newChain.chain[0].transactions)).toBeTruthy();
  });
});

describe("createNewBlock method", () => {
  const newChain = new Blockchain();
  const nonce = 500;
  const previousBlockHash = "ABCD1234";
  const hash = "ZYXW0987";
  const newBlock = newChain.createNewBlock(nonce, previousBlockHash, hash);

  it("should return an object", () => {
    expect(typeof newBlock).toBe("object");
  });

  it("should have properties index, timestamp, and transactions", () => {
    expect(newBlock).toHaveProperty("index");
    expect(newBlock).toHaveProperty("timestamp");
    expect(newBlock).toHaveProperty("transactions");
  });

  it("should have properties nonce, hash, and previousBlockHash", () => {
    expect(newBlock).toHaveProperty("nonce");
    expect(newBlock).toHaveProperty("hash");
    expect(newBlock).toHaveProperty("previousBlockHash");
  });

  it("should reset pendingTransactions to empty", () => {
    expect(newChain.pendingTransactions.length).toEqual(0);
  });

  it("parameters should match corresponding properties", () => {
    expect(newBlock.nonce).toEqual(nonce);
    expect(newBlock.hash).toEqual(hash);
    expect(newBlock.previousBlockHash).toEqual(previousBlockHash);
  });
});

describe("getLastBlock method", () => {
  const newChain = new Blockchain();
  const lastBlock = newChain.getLastBlock();

  it("should return the last block in the chain", () => {
    expect(lastBlock).toBe(newChain.chain[0]);
  });
});

describe("createNewTransaction method", () => {
  const newChain = new Blockchain();
  const amount = 100;
  const sender = "ABC123";
  const recipient = "ZYX987";
  const newTrans = newChain.createNewTransaction(amount, sender, recipient);

  it('newTrans should return the number 2, index of next block', () => {
    expect(newTrans).toEqual(2);
  })

  it('newChain\'s pendingTransaction property should have length 1', () => {
    expect(newChain.pendingTransactions).toHaveLength(1);
  })

  it('pendingTransactions at index 0 should have properties amount, sender and recipient', () => {
    expect(newChain.pendingTransactions[0]).toHaveProperty('amount');
    expect(newChain.pendingTransactions[0]).toHaveProperty('sender');
    expect(newChain.pendingTransactions[0]).toHaveProperty('recipient');
  })
});

describe("hashBlock method", () => {
  const newChain = new Blockchain();
  const previousBlockHash = 'ABC123';
  const currentBlockData = {
    index: 1
  }
  const nonce = 100;
  const output = newChain.hashBlock(previousBlockHash, currentBlockData, nonce);

  it('should return a string', () => {
    expect(typeof output).toBe('string');
  })
});

describe("proofOfWork method", () => {
  const newChain = new Blockchain();
  const previousBlockHash = 'ABC123';
  const currentBlockData = {
    index: 1
  }
  const nonce = newChain.proofOfWork(previousBlockHash, currentBlockData);

  it('nonce to be a number greater than zero', () => {
    expect(typeof nonce).toBe('number');
    expect(nonce >= 0).toBeTruthy();
  })
});
