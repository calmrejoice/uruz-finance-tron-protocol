const { mainnet } = require("../utils/tronWeb");

const priceFeeds = require("../../data/test-pricefeed.json");

const main = async () => {
  for (feed in priceFeeds) {
    const contract = await mainnet.contract().at(priceFeeds[feed]);
    const price = await contract.latestAnswer().call();
    console.log(feed, price.toString());
  }
};

module.exports = {
  getTrxUsdPrice,
  getBtcUsdPrice,
};

main();
