// deno-lint-ignore ban-ts-comment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
