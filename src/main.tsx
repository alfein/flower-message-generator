import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { registerServiceWorker, checkForUpdates } from './pwa'

// Ensure HMR works properly
if (import.meta.hot) {
  import.meta.hot.accept()
}

// Register PWA service worker
registerServiceWorker()
checkForUpdates()

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
