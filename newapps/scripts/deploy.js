const { ethers, network } = require("hardhat");

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which gets automatically created and destroyed every time. Use the Hardhat option '--network localhost'."
    );
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contract with the account:", deployer.address);

  const EthTransfer = await ethers.getContractFactory("EthTransfer");
  const ethTransfer = await EthTransfer.deploy();

  await ethTransfer.deployed();

  console.log("Contract address:", ethTransfer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
