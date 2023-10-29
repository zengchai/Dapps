import React from 'react';
import CreateAccount from './CreateAccount';
import TransferEth from './TransferEth';
import CheckBalance from './CheckBalance';

function App() {
    return (
        <div>
            <h1>Ether Transfer App</h1>
            <CreateAccount />
            <TransferEth />
            <CheckBalance />
        </div>
    );
}

export default App;
