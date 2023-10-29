import React, { useState } from 'react';
import axios from 'axios';

function CreateAccount() {
    const [newAccount, setNewAccount] = useState(null);

    const handleCreateAccount = async () => {
        try {
            const response = await axios.post('http://localhost:4000/create-account');
            setNewAccount(response.data);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            <button onClick={handleCreateAccount}>Create New Account</button>
            {newAccount && (
                <div>
                    <p>Address: {newAccount.address}</p>
                    <p>Private Key: {newAccount.privateKey}</p>
                </div>
            )}
        </div>
    );
}

export default CreateAccount;
