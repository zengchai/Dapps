# Demoapps

Create account, transfer ETH among the accounts and check the balance of the account

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your system.
- Git installed on your system.
- MetaMask extension for your browser (for Ethereum development).

### Installation

1. Clone the repository to your local machine:

``` git clone https://github.com/zengchai/Dapps.git ```



2. Install the necessary dependencies for each part of the project:


- In the server directory:


``` cd server ``` 


``` npm install ```


- In the ethereum directory:


``` cd ethereum ```


``` npm install ```


- In the client directory:


``` cd client ```


``` npm install ```



3. Start the backend server:


``` cd server ```


``` node app.js ```



4. Start the local Ethereum development network:


``` cd ethereum ```


``` npx hardhat node ```



5. Deploy the smart contract to the local network:


``` cd ethereum ```


``` npx hardhat run scripts/deploy.js --network hardhat ```



6. Start the frontend:


``` cd client ```


``` npm start ```



### Reminder

***Install the MetaMask extension for your browser if you haven't already***

Once installed, add the custom network with the following details:

Network Name: Hardhat (or any name you prefer)

New RPC URL: http://localhost:8545

Chain ID: 31337

Currency Symbol: ETH


You're now ready to use your application. Happy coding!