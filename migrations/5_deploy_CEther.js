const tokenData = require("../data/test-tokens.json");
const { unitroller } = require("../data/test-comptroller.json");
require("dotenv").config();

const cEther = artifacts.require("./CEther.sol");

module.exports = async (deployer) => {
  await deployer.deploy(
    cEther,
    unitroller,
    tokenData.CEther.interestRateModel,
    tokenData.CEther.exchangeRate,
    tokenData.CEther.name,
    tokenData.CEther.symbol,
    tokenData.CEther.decimals,
    process.env.ADMIN,
    process.env.RESERVER_ADMIN,
    tokenData.CEther.reserveFactor // scaled by 1e18, equals to 0.2, 20%
  );
};
