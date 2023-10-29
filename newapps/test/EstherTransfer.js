const { expect } = require("chai");

describe("EtherTransfer", function () {
    it("Should deploy and get contract balance", async function () {
        const EtherTransfer = await ethers.getContractFactory("EtherTransfer");
        const etherTransfer = await EtherTransfer.deploy();
        await etherTransfer.deployed();

        const contractBalance = await etherTransfer.getContractBalance();
        expect(contractBalance).to.equal(0);
    });
});