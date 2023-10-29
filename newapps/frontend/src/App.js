import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");

  async function transferETH() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: ethers.utils.parseEther(amount),
      });

      alert(`Transaction sent: ${tx.hash}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>ETH Transfer DApp</h1>
      <div>
        <input
          type="text"
          placeholder="Receiver Address"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={transferETH}>Transfer ETH</button>
    </div>
  );
}

export default App;
