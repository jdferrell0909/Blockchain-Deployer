const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, "JFDS49HREW", "JFDKSH23");
bitcoin.createNewBlock(11, "JFDS4gfdgdfgEW", "JFdfgfdgdfDKSH23");
bitcoin.createNewBlock(343, "JFDSggggggg49HREW", "JFDKSHgfgffgf23");

console.log(bitcoin);
