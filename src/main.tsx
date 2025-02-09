// deno-lint-ignore ban-ts-comment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'

// ייבוא הדפים
import GeneticsGame from './pages/JeopardyGenetics.tsx'
import CellsGame from './pages/JeopardyCells.tsx'
import IsraeliGame from './pages/ImIsraeli.tsx'
import CipherCreator from './pages/CipherCreator.tsx'


// Get the root element
const container = document.getElementById('root')

// Make sure container exists
if (!container) {
  throw new Error('Root element not found')
}

// Create root and render app
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/genetics" element={<GeneticsGame />} />
        <Route path="/cells" element={<CellsGame />} />
        <Route path="/israeli" element={<IsraeliGame />} />
        <Route path="/cipher" element={<CipherCreator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)