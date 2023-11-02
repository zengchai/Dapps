import React from 'react';
import CreateAccount from './CreateAccount';
import TransferEth from './TransferEth';
import CheckBalance from './CheckBalance';
import StorageApp from './StorageApp';

function App() {
    return (
        <div>
            <h1>Ether Transfer App</h1>
            <CreateAccount />
            <TransferEth />
            <CheckBalance />
            <StorageApp />
        </div>
    );
}

export default App;
