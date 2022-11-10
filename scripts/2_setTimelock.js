const { nile } = require("./utils/tronWeb");
const trxOption = require("./utils/trx");

const config = require("../config");

const getGovernorAlphaContract = async () => {
  return await nile.contract().at(config.address.governorAlpha);
};

const setTimelock = async (contract, timelock) => {
  return await contract.setTimeLock(timelock).send({ trxOption });
};

const main = async () => {
  const governorContract = await getGovernorAlphaContract();
  console.log(await setTimelock(governorContract, config.address.timelock));
};

main();
