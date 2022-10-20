const { nile } = require("../utils/tronWeb");
const { tokens } = require("../../data/test-tokens.json");
const { oracleV1: oracleV1Address } = require("../../data/test-oracle.json");

const getPriceOracleV1Contract = async () => {
  return await nile.contract().at(oracleV1Address);
};

const getPrice = async (underlying) => {
  const contract = await getPriceOracleV1Contract();
  const result = await contract.assetPrices(underlying).call();
  return result.toString();
};

const getPrices = async () => {
  let assets = [
    {
      address: "TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW",
      name: "uTRX",
    },
    {
      address: "TGaxQR6RmfkL9qhZzh8fF83dDLjnJBfVva",
      name: "uURZ",
    },
    {
      address: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
      name: "uUSDT",
    },
  ];

  for (let i = 2; i < tokens.length; i++) {
    assets.push({
      address: tokens[i],
      name: `T${i + 1}`,
    });
  }

  const result = assets.map(async (v) => {
    return {
      address: v.address,
      name: v.name,
      price: await getPrice(v.address),
    };
  });
  const finalResult = await Promise.all(result);
  return finalResult;
};

const setPrice = async (underlying, price) => {
  // TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW, 0.0622 * 10 ** 18
  const contract = await getPriceOracleV1Contract();
  const result = await contract.setPrice(underlying, price).send();
  console.log(result);
};

const setPrices = async (assetsAddress, price) => {
  const contract = await getPriceOracleV1Contract();
  await contract.setPrices(assetsAddress, price).send();
};

const main = async () => {
  // const prices = await getPrices();
  // console.log(JSON.stringify(prices));
  const tempPrice = (0.0673 * 10 ** 18).toString();
  // const cEtherPrice = (1 * 10 ** 18).toString();
  // console.log(cEtherPrice);
  await setPrice("TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW", tempPrice);

  const price = await getPrice("TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW");
  console.log(price);
};

main();

module.exports = {
  getPriceOracleV1Contract,
  getPrice,
  getPrices,
  setPrice,
  setPrices,
};
