const { expect } = require("chai");

describe("MyContract", function () {
  it("Should return the correct name", async function () {
    // Load the contract and accounts from the network
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
    await myContract.deployed();

    // Call a function in your contract
    const name = await myContract.getName();

    // Assert the result
    expect(name).to.equal("My Awesome Contract");
  });

  it("Should allow owner to change the name", async function () {
    // Load the contract and accounts from the network
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
    await myContract.deployed();

    // Change the contract's name (assuming you have a function for that)
    const newName = "New Contract Name";
    await myContract.changeName(newName);

    // Get the updated name
    const updatedName = await myContract.getName();

    // Assert the result
    expect(updatedName).to.equal(newName);
  });
});
