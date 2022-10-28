const CompoundLens = artifacts.require("./lens/CompoundLens.sol");

module.exports = async function (deployer) {
  await deployer.deploy(CompoundLens);
  const compoundLens = await CompoundLens.deployed();
  console.log(compoundLens);
};
