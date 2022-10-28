const { nile } = require("../utils/tronWeb");
const trxOption = require("../utils/trx");
// const { CErc20Delegator, CEther } = require("../../data/test-tokens.json");
const { CErc20Delegator } = require("../../data/tokensData");
// const BigNumber = require("bignumber.js");
const { ethers } = require("ethers");

const supply = async () => {
  try {
    const contract = await nile.contract().at(CErc20Delegator[0]);
    const noOfTokens = (1 * 10 ** 18).toString();
    // const noOfTokens = ethers.BigNumber.from((1 * 10 ** 18).toString());
    console.log(noOfTokens);
    const result = await contract.mint(noOfTokens).send(trxOption);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  await supply();
};

main();

module.exports = {
  supply,
};
