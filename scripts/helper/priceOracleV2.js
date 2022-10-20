const { nile } = require("../utils/tronWeb");
const {
  oracleV1: oracleV1Address,
  oracle: oracleAddress,
} = require("../../data/test-oracle.json");

const getPriceOracleContract = async () => {
  const v1 = await nile.contract().at(oracleV1Address);
  const proxy = await nile.contract().at(oracleAddress);
  return {
    v1,
    proxy,
  };
};

const getPrice = async (proxy, cToken) => {
  const result = await proxy.getUnderlyingPrice(cToken).call();
  return result.toString();
};

const getPrices = async (proxy) => {
  let cAssets = [
    {
      address: "TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW", // TRX CEther address
      name: "cEther",
    },
    {
      address: "TVxb8THh3V7LKMyamG5tX46Eb5rqxYTCG8", // uURZ Delegator address
      name: "uURZ",
    },
    {
      address: "TAZh2JdxuiXZrwWoxWSRznpqZgcK1rueXP", // uUSDT Delegator address
      name: "uUSDT",
    },
  ];

  const result = cAssets.map(async (v) => {
    return {
      address: v.address,
      name: v.name,
      price: (await getPrice(proxy, v.address)).toString(),
    };
  });
  const finalResult = await Promise.all(result);
  return finalResult;
};

const getSaiPrice = async (proxy) => {
  const result = await proxy.saiPrice().call();
  return result.toString();
};

const main = async () => {
  try {
    const { proxy } = await getPriceOracleContract();
    const prices = await getPrices(proxy);
    console.log(`Asset Prices: ${JSON.stringify(prices)}`);

    // const saiPrice = await getSaiPrice(proxy);
    // console.log(`Sai Price: ${saiPrice}`);
  } catch (error) {
    console.log(error);
  }
};

main();

module.exports = {
  getPriceOracleContract,
  getPrice,
  getPrices,
  getSaiPrice,
};
