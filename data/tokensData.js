const tokensData = {
  underlyingTokens: ["TGaxQR6RmfkL9qhZzh8fF83dDLjnJBfVva"],
  cErc20Delegate: ["TS5aDYKwCZNVyVVQBnRUUnbfU9N7Q9isCY"],
  CEther: {
    address: "TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv", //  TGjZXu9amnEfiUy3W8Z1ptxKnTVs6cb9vv, TWq5LYhAqPGweCyt6arYQ9rWcXYoj33sAW
    exchangeRate: "101978605025782",
    reserveFactor: (0.1 * 10 ** 18).toString(),
    name: "Uruz TRX",
    symbol: "uTRX",
    decimals: 8,
    interestRateModel: "TULa2nWyFvJiPbvogDJUtzU6b9KDHFzBvz",
    collateralFactor: (0.85 * 10 ** 18).toString(),
  },
  tokenConfig: [
    {
      name: "Uruz URZ",
      symbol: "uURZ",
      interestRateModel: "THEUD8rfAkmeUgSJs8X8zN6wqNYDG71iPx",
      exchangeRate: "102516211882138512249446693",
      decimals: 8,
      reserveFactor: (0.15 * 10 ** 18).toString(),
      //   priceOracleV1Key: "0x1",
      collateralFactor: (0.85 * 10 ** 18).toString(),
    },
    // {
    //   name: "Uruz USDT",
    //   symbol: "uUSDT",
    //   interestRateModel: "TRWMtAJPFuDzfHW4itx29kzZs91eXojXaf",
    //   exchangeRate: "300000000000000000000000000",
    //   decimals: 8,
    //   reserveFactor: (0.1 * 10 ** 17).toString(),
    //   //   priceOracleV1Key: "0x2",
    //   collateralFactor: (0.9 * 10 ** 17).toString(),
    // },
  ],
  CErc20Delegator: ["TByuWrmpZQb5yYYtWBrT4Kfhzz3jJ1GQ4E"],
};

module.exports = tokensData;
