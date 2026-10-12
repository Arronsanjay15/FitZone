import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './components/ToastProvider.tsx'

// Always open on the hero (Home) section instead of restoring the last scroll.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Drop any section hash so a refresh can't jump to a mid-page anchor.
if (window.location.hash) {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  )
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
