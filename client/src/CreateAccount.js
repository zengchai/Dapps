import React, { useState } from 'react';

function CreateAccount() {
    const [newAccount, setNewAccount] = useState(null);
    const [privateKeyInput, setPrivateKeyInput] = useState('');
    const [privateKeyToPass, setPrivateKeyToPass] = useState('');

    const handleCreateAccount = async () => {
        try {
            const response = await fetch('http://localhost:4000/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ privateKey: privateKeyInput }), // Use privateKeyInput
            });
            const data = await response.json();
            setNewAccount(data);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            {newAccount ? (
                <div>
                    <p>Address: {newAccount.address}</p>
                    <p>Private Key: {newAccount.privateKey}</p>
                </div>
            ) : (
                <div>
                    <button onClick={handleCreateAccount}>Create New Account</button>
                </div>
            )}
        </div>
    );
}

export default CreateAccount;
