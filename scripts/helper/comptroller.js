const {
  abi: comptrollerAbi,
} = require("../../build/contracts/Comptroller.json");
const { CErc20Delegator, CEther } = require("../../data/tokensData");
const { nile } = require("../utils/tronWeb");
const config = require("../../config");

const getComptrollerContract = async (abi, unitroller) => {
  return await nile.contract(abi, unitroller);
};

const getAllMarkets = async (contract) => {
  return await contract.getAllMarkets().call();
};

const getMarketData = async (utokenAddress) => {
  try {
    const contract = await getComptrollerContract(
      comptrollerAbi,
      config.address.unitroller
    );
    const result = await contract.markets(utokenAddress).call();
    const collateralFactor = result?.collateralFactorMantissa.toString();
    console.log(collateralFactor);
  } catch (error) {
    console.log(error);
  }
};

const getAccountLiquidity = async () => {
  try {
    const contract = await getComptrollerContract(
      comptrollerAbi,
      config.address.unitroller
    );
    const result = await contract.getAccountLiquidity(process.env.ADMIN).call();
    const liquidityRaw = result[1];
    const liquidity = liquidityRaw.toString();

    console.log(liquidity);
  } catch (error) {
    console.log(error);
  }
};

const getAssetsIn = async () => {
  try {
    const contract = await getComptrollerContract(
      comptrollerAbi,
      config.address.unitroller
    );
    const result = await contract.getAssetsIn(process.env.ADMIN).call();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllMarketData = async (contract, cTokens) => {
  return await Promise.all(
    cTokens.map(async (v) => {
      const data = await getMarketData(contract, v);
      return {
        tokenAddress: v,
        isListed: data[0],
        collateralFactor: data[1].toString(),
      };
    })
  );
};

const getPriceOracle = async (contract) => {
  return await contract.oracle().call();
};

const main = async () => {
  // const comptrollerContract = await getComptrollerContract(
  //   comptrollerAbi,
  //   unitrollerAddress
  // );
  // console.log(
  //   `PriceOracle Address: ${nile.address.fromHex(
  //     await getPriceOracle(comptrollerContract)
  //   )}`
  // );

  // const markets = await getAllMarkets(comptrollerContract);
  // console.log(
  //   `Markets: ${JSON.stringify(markets.map((v) => nile.address.fromHex(v)))}`
  // );

  // const tokens = [...CErc20Delegator, CEther.address];
  // const marketData = await getAllMarketData(comptrollerContract, tokens);
  // console.log(marketData);
  // console.log(`Market Data: ${JSON.stringify(marketData)}`);

  // getAccountLiquidity();
  getAssetsIn();
  // getMarketData(config.address.utrx);
};

main();

module.exports = {
  getComptrollerContract,
  getAllMarkets,
  getMarketData,
  getAllMarketData,
  getPriceOracle,
};
