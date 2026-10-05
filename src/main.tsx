import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LanguageProvider } from './i18n'
import { AppearanceProvider } from './appearance'
import { AudioProvider } from './audio'

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error)
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <AppearanceProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AppearanceProvider>
    </AudioProvider>
  </React.StrictMode>,
)
