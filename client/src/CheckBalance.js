import React, { useState } from 'react';
import axios from 'axios';

function CheckBalance() {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleCheckBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/check-balance/${address}`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error checking balance:', error);
        }
    };

    return (
        <div>
            <h2>Check Balance</h2>
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleCheckBalance}>Check Balance</button>
            <p>Balance: {balance} wei</p>
        </div>
    );
}

export default CheckBalance;
