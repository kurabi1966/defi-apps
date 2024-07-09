require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./src/backend/contracts",
    artifacts: "./src/backend/artifacts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
