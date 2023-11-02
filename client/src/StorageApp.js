import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
    const [privateKey, setPrivateKey] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [setValueInput, setSetValueInput] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [contractABI, setContractABI] = useState(null);
    const [provider, setProvider] = useState(null);
    const [storedValue, setStoredValue] = useState('');

    useEffect(() => {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Request MetaMask to enable the Ethereum provider
            window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        // Fetch contract ABI and provider information from your backend
        fetchContractInfo();
    }, []);

    const fetchContractInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/fetchContractInfo');
            if (response.ok) {
                const data = await response.json();
                setContractABI(new ethers.utils.Interface(data.contractABI));
                setProvider(new ethers.providers.JsonRpcProvider(data.providerUrl));
            } else {
                console.error('Failed to fetch contract info');
            }
        } catch (error) {
            console.error('Error while fetching contract info:', error);
        }
    };

    const deployContract = async () => {
        try {
            const response = await fetch('http://localhost:4000/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ privateKey }),
            });

            if (response.ok) {
                const data = await response.json();
                setContractAddress(data.contractAddress);
            } else {
                console.error('Deployment failed');
            }
        } catch (error) {
            console.error('Error during deployment:', error);
        }
    };

    const setNewValue = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' }); // Prompt user to connect their MetaMask wallet
                const wallet = new ethers.Wallet(privateKey, provider);
                const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    
                // Replace 'yourFunctionName' with the actual name of the function in your smart contract
                const tx = await contract.setValue(setValueInput); // Pass the new value as an argument
                await tx.wait();
    
                // Display the transaction hash
                setTransactionHash(tx.hash);
            } else {
                console.error('MetaMask not available');
            }
        } catch (error) {
            console.error('Error while setting value:', error);
        }
    };
    

    const getValue = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getValue/${contractAddress}`);
    
            if (response.ok) {
                const data = await response.json();
    
                if (data.value && data.value.type === 'BigNumber' && data.value.hex) {
                    const bigNumberValue = ethers.BigNumber.from(data.value.hex);
                    const stringValue = bigNumberValue.toString();
                    setStoredValue(stringValue);
                } else {
                    console.error('Invalid value format:', data.value);
                }
            } else {
                console.error('Getting value failed');
            }
        } catch (error) {
            console.error('Error while getting value:', error);
        }
    };
    
    
    
    
    return (
        <div>
            <h1>Simple Storage DApp</h1>

            <h2>Deploy Contract</h2>
            <div>
                <label htmlFor="privateKey">Private Key:</label>
                <input
                    type="text"
                    id="privateKey"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                />
                <button onClick={deployContract}>Deploy Contract</button>
            </div>
            <p>Contract Address: {contractAddress}</p>

            <h2>Set Value</h2>
            <div>
                <label htmlFor="setValue">New Value:</label>
                <input
                    type="number"
                    id="setValue"
                    value={setValueInput}
                    onChange={(e) => setSetValueInput(e.target.value)}
                />
                <button onClick={setNewValue}>Set Value</button>
            </div>
            <p>Transaction Hash: {transactionHash}</p>

            <h2>Get Value</h2>
            <div>
                <button onClick={getValue}>Get Value</button>
            </div>
            <p>Stored Value: {storedValue}</p>
        </div>
    );
}

export default App;
