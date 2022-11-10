const { nile } = require("../utils/tronWeb");
const {
  oracleV1: oracleV1Address,
  oracleProxy: oracleProxyAddress,
} = require("../../data/test-oracle.json");

const getPriceOracleContract = async () => {
  const v1 = await nile.contract().at(oracleV1Address);
  const proxy = await nile.contract().at(oracleProxyAddress);
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
      address: "TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv", // TRX CEther address
      name: "uTRX",
    },
    {
      address: "TAZh2JdxuiXZrwWoxWSRznpqZgcK1rueXP", // uUSDT Delegator address
      name: "uUSDT",
    },
    {
      address: "TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E", // uUSDT Delegator address
      name: "uURZ",
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
    console.log(prices);

    // const saiPrice = await getSaiPrice(proxy);
    // console.log(`Sai Price: ${saiPrice}`);

    // const price = await getPrice(proxy, CEther.address);
    // console.log(price);
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
