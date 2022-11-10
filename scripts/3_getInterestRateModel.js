const { BigNumber } = require("ethers");

const generateModel = (
  mulPerBlock,
  baseRatePerBlock,
  reserveFactor,
  jumpMulPerBlock,
  kink
  //   blocksPerYear
) => {
  const model = [];

  for (var i = 0; i <= 100; i++) {
    // Supply and Borrow APY
    const mantissa = BigNumber.from((1e18).toString());
    const blocksPerDay = 20 * 60 * 24;
    const daysPerYear = 365;

    const utilizationBN = BigNumber.from(((i / 100) * mantissa).toString());
    const utilization = i / 100;

    let borrowRatePerBlock;
    if (utilizationBN.lte(kink)) {
      borrowRatePerBlock = utilizationBN
        .mul(mulPerBlock)
        .div(mantissa)
        .add(baseRatePerBlock);
    } else {
      const normalRate = kink
        .mul(mulPerBlock)
        .div(mantissa)
        .add(baseRatePerBlock);
      const excessUtil = utilizationBN.sub(kink);
      borrowRatePerBlock = excessUtil
        .mul(jumpMulPerBlock)
        .div(mantissa)
        .add(normalRate);
      console.log(normalRate.toString(), excessUtil.toString());
    }
    console.log(borrowRatePerBlock.toString(), i);

    const oneMinusReserveFactor = mantissa.sub(reserveFactor);
    const rateToPool = borrowRatePerBlock
      .mul(oneMinusReserveFactor)
      .div(mantissa);
    const supplyRatePerBlock = utilizationBN.mul(rateToPool).div(mantissa);

    const supplyApy =
      (Math.pow(
        supplyRatePerBlock.div(mantissa).mul(blocksPerDay).add(1).toNumber(),
        daysPerYear
      ) -
        1) *
      100;
    const borrowApy =
      (Math.pow(
        (borrowRatePerBlock / mantissa) * blocksPerDay + 1,
        daysPerYear
      ) -
        1) *
      100;

    model.push({
      borrow: borrowApy,
      supply: supplyApy,
      base: utilization,
    });
  }
  return model;
};

const main = async () => {
  const mul = BigNumber.from("35673515981");
  const baseRate = BigNumber.from("1902587519");
  const reserveFactor = BigNumber.from((0.1e18).toString());
  const kink = BigNumber.from((0.8e18).toString());
  //   const jumpMul = BigNumber.from("1284246575342");
  const jumpMul = BigNumber.from("380517503805");
  //   const baseRate = BigNumber.from((1902587519 * 2).toString());
  //   const blocksPerYear = 10512000;

  const model = await generateModel(
    mul,
    baseRate,
    reserveFactor,
    jumpMul,
    kink
  );
  console.log(model);
};

main();
