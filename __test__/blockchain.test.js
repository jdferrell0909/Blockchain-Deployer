const Blockchain = require('../dev/blockchain');


describe('Constructor function', () => {
  const newChain = new Blockchain();
  it('should create new instance of Blockchain', () => {
    console.log(newChain.chain[0])
    expect(newChain).toBeInstanceOf(Blockchain);
  })

  it('should have chain and pendingTransaction properties', () => {
    expect(newChain).toHaveProperty('chain');
    expect(newChain).toHaveProperty('pendingTransactions');
  })

  it('should have genesis block as first index on chain array', () => {
    expect(typeof newChain.chain[0]).toBe('object');
  })

  it('genesis block should have a hash of 0, nonce of 100, previousBlockHash as 0, and empty array as transactions', () => {
    expect(newChain.chain[0].hash).toEqual('0');
    expect(newChain.chain[0].nonce).toEqual(100);
    expect(newChain.chain[0].previousBlockHash).toEqual('0');
    expect(Array.isArray(newChain.chain[0].transactions)).toBeTruthy();
  })
})

describe('createNewBlock method', () => {
  
})

describe('getLastBlock method', () => {
  
})

describe('createNewTransaction method', () => {
  
})

describe('hashBlock method', () => {
  
})

describe('proofOfWork method', () => {
  
})