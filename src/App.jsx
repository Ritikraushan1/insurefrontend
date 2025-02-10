import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteConfig from './route';
import { UserProvider } from './config/context/userContext';

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false); // State to track if bot is open or not

  const toggleBot = () => {
    setIsBotOpen((prevState) => !prevState); // Toggle the bot's state
  };

  return (
    <UserProvider>
      <Navbar />
      <RouteConfig />

      {/* Bot Button */}
      <button
        className="bot-button"
        onClick={toggleBot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366', // Example bot-like color
          borderRadius: '50%',
          padding: '15px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
      >
        <img
          src="/chatbot.png"
          alt="Chat Bot"
          style={{ width: '30px', height: '30px' }}
        />
      </button>

      {/* Conditional iframe rendering */}
      {isBotOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '350px',
            height: '500px',
            zIndex: 1000,
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/29/10/20250129104650-M4LD1YWL.json"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
            }}
            title="Bot Chat"
          />
        </div>
      )}

      <Footer />
    </UserProvider>
  );
}

export default App;
