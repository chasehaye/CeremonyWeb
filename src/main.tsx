import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { OrgProvider } from './context/OrgContext.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <OrgProvider>
        <Router>
          <App />
        </Router>
      </OrgProvider>
    </AuthProvider>
  </React.StrictMode>
);
