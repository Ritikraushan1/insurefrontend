import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './config/context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider  domain="dev-yyss51v6z8ckgfd6.us.auth0.com"
    clientId="lSP9Hugcj2seqyEasQe9mUwNe6QT1wIM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>

    <App />
    </Auth0Provider>
  </StrictMode>,
)
