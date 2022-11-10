const { nile } = require("./utils/tronWeb");
const trxOption = require("./utils/trx");
const config = require("../config");

const createProposal = async () => {
  try {
    const contract = await nile.contract().at(config.address.proposal);
    const result = await contract.createPropose().send(trxOption);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  createProposal();
};

main();
