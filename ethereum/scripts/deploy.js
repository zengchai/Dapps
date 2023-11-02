const { ethers } = require("hardhat");

const path = require("path");

async function main() {
  const YourSolidityContract = await ethers.getContractFactory("YourSolidityContract");
  
  // You can pass constructor arguments if your contract's constructor requires them.
  // Example: const yourContract = await YourSolidityContract.deploy(arg1, arg2, ...);

  const yourContract = await YourSolidityContract.deploy();
  await yourContract.deployed();

  console.log("YourContract deployed to:", yourContract.address);
  saveFrontendFiles(yourContract);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "..", "server", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("YourSolidityContract");

  fs.writeFileSync(
    path.join(contractsDir, "YourSolidityContract.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });