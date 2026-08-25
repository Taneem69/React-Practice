import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { StudentProvider } from './contexts/StudentContext.tsx';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
