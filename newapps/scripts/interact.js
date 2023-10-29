const { ethers, network } = require("hardhat");

async function main() {
  const [sender, receiver] = await ethers.getSigners();

  if (network.name === "hardhat") {
    console.warn(
      "You are trying to interact with the contract on the Hardhat Network, which may not have persistent state. Use the Hardhat option '--network localhost'."
    );
  }

  const ethTransferAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the deployed contract address

  console.log("Sender address:", sender.address);
  console.log("Receiver address:", receiver.address);

  const ethTransfer = await ethers.getContractAt("EthTransfer", ethTransferAddress);

  // Send ETH from sender to the contract
  const transferAmount = ethers.utils.parseEther("1.0"); // Amount in Ether
  await sender.sendTransaction({ to: ethTransfer.address, value: transferAmount });

  console.log("Transferred ETH to the contract");

  // Send ETH from the contract to the receiver
  await ethTransfer.transfer(receiver.address, transferAmount);

  console.log("Transferred ETH from the contract to the receiver");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
