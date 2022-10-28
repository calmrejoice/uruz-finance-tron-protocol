const { lens } = require("../../data/test-lens.json");
const { nile } = require("../utils/tronWeb");
const trxOption = require("../utils/trx");
const { CEther } = require("../../data/test-tokens.json");

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

const main = async () => {
  await getUTokenMetadata();
};

main();

module.exports = {
  getUTokenMetadata,
};
