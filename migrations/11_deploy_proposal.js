const config = require("../config");

const Proposal = artifacts.require("./Governance/ProposalUrzReserveFactor.sol");

module.exports = async function (deployer) {
  await deployer.deploy(
    Proposal,
    config.address.governorAlpha,
    config.address.urz,
    config.address.wurz,
    config.address.account
  );
  const proposal = await Proposal.deployed();
  console.log(proposal);
};
