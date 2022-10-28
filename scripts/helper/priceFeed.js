const { mainnet } = require("../utils/tronWeb");

const priceFeeds = require("../../data/test-pricefeed.json");

const getPricesPriceFeeds = async () => {
  for (feed in priceFeeds) {
    const contract = await mainnet.contract().at(priceFeeds[feed]);
    const price = await contract.latestAnswer().call();
    console.log(feed, price.toString());
  }
};

const main = async () => {
  await getPricesPriceFeeds();
};

module.exports = {
  getPricesPriceFeeds,
};

main();
