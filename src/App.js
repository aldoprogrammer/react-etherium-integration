import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [connected, setConnected] = useState(false);
  const [id, setId] = useState(null);

  const connect = async () => {
    try {
      if(!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const dispalyAddress = address?.substring(0, 6) + '...';
        const message = "Hello world"
        const sig = await signer.signMessage(message);
        ethers.verifyMessage(message, sig);
        setId(dispalyAddress);
        setConnected(true);
      } else {
        window.ethereum.selectedAddress = null;
        setConnected(false);
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="parent">
      <nav className="glass">
        <a href="./">Home</a>
        <a href="./">About</a>
        <a href="./">Contact</a>
      </nav>
      <section className="glass">
        <button onClick={connect}>
          {connected ? id : 'Connect Wallet'}
        </button>
      </section>
      <footer className="glass">
  <a href="https://github.com/aldoprogrammer" target="_blank">@aldoprogrammer</a>
</footer>

    </div>
  );
}

export default App;
