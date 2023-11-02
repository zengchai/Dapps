const express = require('express');
const { Web3 } = require('web3');
const { ethers } = require('ethers');
const cors = require('cors');
const app = express();
const port = 4000;
const contractABI = require('./contracts/YourSolidityContract.json');
const web3 = new Web3("http://127.0.0.1:8545"); 
const providerUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(providerUrl);// Replace with your Ethereum node URL

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual URL of your React app
    credentials: true, // If you need to allow cookies and other credentials
}));

// Define a route
app.get('/test', async (req, res) => {
    console.log('Test route accessed');
    const gasPrice = await web3.eth.getGasPrice();
    res.send('Test route accessed');
});

app.post('/create-account', (req, res) => {
    try {
        const newAccount = web3.eth.accounts.create();
        const { address, privateKey } = newAccount; // Get the address and private key

        // Add the account to the wallet
        web3.eth.accounts.wallet.add(newAccount);

        // NEVER expose the private key like this in production!
        // For demonstration purposes only.
        res.json({
            address,
            privateKey,
        });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: error.toString() });
    }
});


app.post('/transfer-eth', async (req, res) => {
    const { from, to, value, privateKey } = req.body;

    try {
        const transaction = await web3.eth.sendTransaction({
            from: from,
            to: to,
            value: web3.utils.toWei(value, 'wei'),
            gas: 21000,
            gasPrice: web3.utils.toWei('10', 'gwei'),
        });

        res.json({
            message: 'Ether transferred successfully',
            transaction
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

app.get('/check-balance/:address', async (req, res) => {
    const balance = await web3.eth.getBalance(req.params.address);
    res.json({ balance: web3.utils.fromWei(balance, 'ether') });
});


app.get('/fetchContractInfo', (req, res) => {
    res.json({ contractABI: contractABI.abi, providerUrl });
});

app.post('/deploy', async (req, res) => {
    const privateKey = req.body.privateKey; // Get private key from request
    const wallet = new ethers.Wallet(privateKey, provider);

    const contractFactory = new ethers.ContractFactory(
        contractABI.abi, // Use your contract's ABI
        contractABI.bytecode, // Include the contract's bytecode
        wallet
    );

    const contract = await contractFactory.deploy();
    await contract.deployed();

    res.json({ contractAddress: contract.address });
});

// Set the value
app.post('/processTransaction', async (req, res) => {
    const txHash = req.body.txHash;
    try {
        const receipt = await provider.waitForTransaction(txHash);
        // Transaction is confirmed
        // You can handle any post-transaction logic here
        console.log('Transaction confirmed:', receipt);
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error processing transaction:', error);
        res.status(500).json({ status: 'error', message: 'Failed to process the transaction' });
    }
});


// Get the value
app.get('/getValue/:contractAddress', async (req, res) => {
    const contractAddress = req.params.contractAddress;
    console.log(contractAddress);
    const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

    const value = await contract.getValue();
    res.json({ value });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
