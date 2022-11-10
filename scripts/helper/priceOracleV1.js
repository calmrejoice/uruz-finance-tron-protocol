const { nile } = require("../utils/tronWeb");
const { tokens } = require("../../data/test-tokens.json");
const config = require("../../config");

const getPrice = async (utokenAddress) => {
  try {
    const contract = await nile.contract().at(config.address.oracleV1);
    const result = await contract.getPrice(utokenAddress).call();
    console.log(result.toString());
  } catch (error) {
    console.log(error);
  }
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

const setPrice = async (utokenAddress, price) => {
  try {
    const contract = await nile.contract().at(config.address.oracleV1);
    const result = await contract.setPrice(utokenAddress, price).send();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  const price = (0.0673 * 10 ** 18).toString();
  await setPrice(config.address.uurz, price);
  await getPrice(config.address.uurz);
};

main();
