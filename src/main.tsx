/**
 * FraudShield Entry Point
 * -----------------------
 * Description: Initializes the React application and mounts it to the DOM.
 * Author: FraudShield Team
 * File: src/main.tsx
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
