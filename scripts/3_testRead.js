const { mainnet } = require("./utils/tronWeb");

let contractAddress = "TPBngLaAUtFe9DzqKJri7ziMrS2SRK25XB"; // Paste Contract address here

const main = async () => {
  try {
    const contract = await mainnet.contract().at(contractAddress);
    const res = await contract.pendingAdmin().call();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

main();
