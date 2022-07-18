import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';


// Constants
const TWITTER_HANDLE = 'ronkips01';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  'https://media.giphy.com/media/fW4e8wgPQd8gWf9tOi/giphy.gif',
	'https://media.giphy.com/media/3oz8xAD1BdlSDZzOP6/giphy.gif',
	'https://media.giphy.com/media/XPGXD94nKmbPiCRwCb/giphy.gif',
  'https://media.giphy.com/media/hJBwNvPJK9sk1dZHRa/giphy.gif',
  'https://media.giphy.com/media/ehcchSQd21UxUliaqt/giphy.gif'
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet ');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
   
    const {solana} = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connect with Public Key:', response.publickey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };
  const sendGif = async() =>{
    if(inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Please try again.');
    }
  };
  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value); 
  };
 

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  const renderConnectedContainer = () => (
    <div className="connected-container">
    <form onSubmit={(event) => {
      event.preventDefault();
      sendGif();
    }}>
      <input type="text" placeholder="Please enter your git link!" value={inputValue} onChange={onInputChange}/>
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );


  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            Please view  my GIF collection in the metaverse ✨
          </p>
          {!walletAddress &&renderNotConnectedContainer()}
          {/* We just need to add the inverse here! */}
          {walletAddress && renderConnectedContainer()}
          <div className={walletAddress ? 'authed-container' : 'container'}></div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;