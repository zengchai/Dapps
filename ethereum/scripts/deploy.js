const { ethers } = require("hardhat");

async function main() {
  const YourSolidityContract = await ethers.getContractFactory("YourSolidityContract");
  
  // You can pass constructor arguments if your contract's constructor requires them.
  // Example: const yourContract = await YourSolidityContract.deploy(arg1, arg2, ...);

  const yourContract = await YourSolidityContract.deploy();
  await yourContract.deployed();

  console.log("YourContract deployed to:", yourContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
