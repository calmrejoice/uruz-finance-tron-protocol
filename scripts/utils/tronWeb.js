const TronWeb = require("tronweb");

require("dotenv").config();

const tronWeb = {
  nile: new TronWeb(
    "https://api.nileex.io/",
    "https://api.nileex.io/",
    "https://api.nileex.io/",
    process.env.PRIVATE_KEY_NILE
  ),
  mainnet: new TronWeb(
    "https://api.trongrid.io",
    "https://api.trongrid.io",
    "https://api.trongrid.io",
    process.env.PRIVATE_KEY_MAINNET
  ),
  shasta: new TronWeb(
    "https://api.shasta.trongrid.io",
    "https://api.shasta.trongrid.io",
    "https://api.shasta.trongrid.io",
    process.env.PRIVATE_KEY_SHASTA
  ),
};

module.exports = tronWeb;
