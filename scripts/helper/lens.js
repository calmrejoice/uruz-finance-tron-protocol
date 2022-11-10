const { nile } = require("../utils/tronWeb");
const trxOption = require("../utils/trx");
const config = require("../../config");

const getUTokenMetadata = async () => {
  try {
    const contract = await nile.contract().at(lens);
    const uTokenMetadata = await contract
      .cTokenMetadata("TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E")
      .send(trxOption);
    console.log(uTokenMetadata);
  } catch (error) {
    console.log(error);
  }
};

const getAccountLimits = async () => {
  try {
    const contract = await nile.contract().at(config.address.lens);
    const accountLimits = await contract
      .getAccountLimits(config.address.unitroller, config.address.account)
      .send(trxOption);
    console.log(accountLimits);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  getAccountLimits();
};

main();
