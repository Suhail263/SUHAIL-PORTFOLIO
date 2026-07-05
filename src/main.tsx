import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter (not BrowserRouter) because GitHub Pages is static hosting
        with no server-side rewrites — a direct link or refresh on
        /projects/some-slug would 404 otherwise. URLs look like /#/projects/x
        instead of /projects/x, which is the standard trade-off for this host. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
