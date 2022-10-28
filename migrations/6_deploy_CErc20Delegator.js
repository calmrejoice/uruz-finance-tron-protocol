const {
  cErc20Delegate,
  tokenConfig,
  underlyingTokens,
} = require("../data/tokensData.js");
const { unitroller } = require("../data/test-comptroller.json");
require("dotenv").config();

const cErc20Delegator = artifacts.require("./CErc20Delegator.sol");

module.exports = async (deployer) => {
  const cErc20DelegateDeployer = cErc20Delegate.map(async (v, i) => {
    await deployer.deploy(
      cErc20Delegator,
      underlyingTokens[i],
      unitroller,
      tokenConfig[i].interestRateModel,
      tokenConfig[i].exchangeRate,
      tokenConfig[i].name,
      tokenConfig[i].symbol,
      tokenConfig[i].decimals,
      process.env.ADMIN,
      process.env.RESERVER_ADMIN,
      v,
      "0x", //Currently Unused
      tokenConfig[i].reserveFactor
    );
  });

  await Promise.all(cErc20DelegateDeployer);
};
