const { BigNumber } = require("ethers");

var JumpRateModelV2 = artifacts.require("./JumpRateModelV2.sol");

require("dotenv").config();

module.exports = async function (deployer) {
  const rateModel = {
    baseRatePerYear: (0.03e18).toString(),
    multiplierPerYear: (0.3e18).toString(),
    jumpMultiplierPerYear: (3e18).toString(),
    kink: (0.8e18).toString(),
  };

  await deployer.deploy(
    JumpRateModelV2,
    rateModel.baseRatePerYear,
    rateModel.multiplierPerYear,
    rateModel.jumpMultiplierPerYear,
    rateModel.kink,
    process.env.ADMIN
  );
};
