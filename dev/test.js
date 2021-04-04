const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(873921, "fhdsjh3829", "sfuiu12331");

bitcoin.createNewTransaction(100, "ALEXfjdkhsakhdsa2123232", "JENjffhjds");

bitcoin.createNewBlock(1212121, "JFKDSNJK321121", "OOOSOSOSOSO");

bitcoin.createNewTransaction(100, "ALEXfjdkhsakhdsa2123232", "JENjffhjds");
bitcoin.createNewTransaction(500, "ALEXfjdkhsakhdsa2123232", "JENjffhjds");
bitcoin.createNewTransaction(800, "ALEXfjdkhsakhdsa2123232", "JENjffhjds");

bitcoin.createNewBlock(99999, "JFKDSNJK3211218989898", "OOOSOSOSOSO657565");

console.log(bitcoin.chain[2]);
