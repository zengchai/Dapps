require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  
  networks: {
    // in built test network to use when developing contracts
    hardhat: {
    },
    quickstart: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      // test accounts only, all good ;)
      accounts: [
        "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
        "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
        "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
      ]
    }
  },  
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  paths: {
    sources: "./contracts", // Path to your Solidity contract files
    artifacts: "./artifacts", // Path where Hardhat stores compiled contract artifacts
  },
  mocha: {
    timeout: 40000
  }
};

task("deploy", "Deploy the EthTransfer contract")
  .setAction(async () => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying EthTransfer contract with account:", deployer.address);

    const EthTransfer = await ethers.getContractFactory("EthTransfer");
    const ethTransfer = await EthTransfer.deploy();

    await ethTransfer.deployed();

    console.log("EthTransfer contract deployed to:", ethTransfer.address);
  });
