const express = require('express');
const { Web3 } = require('web3');
const cors = require('cors');
const app = express();
const port = 4000;
const web3 = new Web3('http://127.0.0.1:8545'); // Replace with your Ethereum node URL

app.use(cors());
app.use(express.json());
// Define a route
app.get('/example', (req, res) => {
    // Handle the request and send a response
    res.send('This is the example route.');
});
app.post('/create-account', (req, res) => {
    const newAccount = web3.eth.accounts.create();

    // NEVER expose the private key like this in production!
    // For demonstration purposes only.
    res.json({
        address: newAccount.address,
        privateKey: newAccount.privateKey
    });
});

app.post('/transfer-eth', async (req, res) => {
    const { from, to, value } = req.body;

    try {
        const transaction = await web3.eth.sendTransaction({
            from,
            to,
            value: web3.utils.toWei(value, 'ether')
        });

        res.json({
            message: 'Ether transferred successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer Ether' });
    }
});

app.get('/check-balance/:address', async (req, res) => {
    const balance = await web3.eth.getBalance(req.params.address);
    res.json({ balance: web3.utils.fromWei(balance, 'ether') });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
