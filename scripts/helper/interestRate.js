const { ethers } = require("ethers");

const { nile } = require("../utils/tronWeb");
const calculator = require("../utils/calculator");

const config = require("../../config");

const getInterestRateContract = async () => {
  const trxInterestRateAddress = config.address.trxInterestRate;
  const urzInterestRateAddress = config.address.urzInterestRate;
  return {
    trxInterestRateModel: await nile.contract().at(trxInterestRateAddress),
    urzInterestRateModel: await nile.contract().at(urzInterestRateAddress),
  };
};

const getParams = async () => {
  const { trxInterestRateModel, urzInterestRateModel } =
    await getInterestRateContract();
  let baseRate = await trxInterestRateModel.baseRatePerBlock().call();
  let blocksPerYear = await trxInterestRateModel.blocksPerYear().call();
  let multiplierPerBlock = await trxInterestRateModel
    .multiplierPerBlock()
    .call();

  const trxData = {
    baseRatePerYear: calculator
      .getBaseRatePerYear(baseRate, blocksPerYear)
      .toString(),
    blocksPerYear: blocksPerYear.toString(),
    multiplierPerYear: calculator
      .getMultiplierPerYear(
        multiplierPerBlock,
        blocksPerYear,
        ethers.BigNumber.from("0")
      )
      .toString(),
  };

  baseRate = await urzInterestRateModel.baseRatePerBlock().call();
  blocksPerYear = await urzInterestRateModel.blocksPerYear().call();
  multiplierPerBlock = await urzInterestRateModel.multiplierPerBlock().call();
  jumpMultiplierPerBlock = await urzInterestRateModel
    .jumpMultiplierPerBlock()
    .call();
  kink = await urzInterestRateModel.kink().call();

  const urzData = {
    baseRatePerYear: calculator
      .getBaseRatePerYear(baseRate, blocksPerYear)
      .toString(),
    blocksPerYear: blocksPerYear.toString(),
    multiplierPerYear: calculator
      .getMultiplierPerYear(multiplierPerBlock, blocksPerYear, kink)
      .toString(),
    jumpMultiplierPerYear: calculator
      .getJumpMultiplierPerYear(jumpMultiplierPerBlock, blocksPerYear)
      .toString(),
    kink: kink.toString(),
  };

  const result = {
    trxInterestRate: trxData,
    urzInterestRate: urzData,
  };
  console.log(`InterestRateModel Params: ${JSON.stringify(result)}`);
  return result;
};

const main = async () => {
  await getParams();
};

main();

module.exports = {
  getInterestRateContract,
  getParams,
};
