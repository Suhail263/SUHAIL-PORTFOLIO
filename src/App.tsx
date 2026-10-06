import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PortfolioIntro } from '@/components/intro/PortfolioIntro';
import { PageLoader } from '@/components/layout/PageLoader';
import { Navbar } from '@/components/layout/Navbar';
import { AvatarPanel } from '@/components/avatar/AvatarPanel';
import { useLenis } from '@/hooks/useLenis';

// Route-level code splitting:
// Home pulls in Three.js through the hero background,
// while ProjectDetail is loaded only when a project is opened.
const Home = lazy(() =>
  import('@/pages/Home').then((m) => ({
    default: m.Home,
  }))
);

const ProjectDetail = lazy(() =>
  import('@/pages/ProjectDetail').then((m) => ({
    default: m.ProjectDetail,
  }))
);

function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        color: 'var(--color-text-muted)',
      }}
    >
      <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin" />
    </div>
  );
}

function App() {
  useLenis();

  return (
    <>
      {/* Cinematic portfolio intro */}
      <PortfolioIntro />

      {/* Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full"
        style={{
          background: 'var(--color-accent)',
          color: 'white',
        }}
      >
        Skip to content
      </a>

      {/* Existing page loader */}
      <PageLoader />

      {/* Main navigation */}
      <Navbar />

      {/* Main application content */}
      <div id="main-content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/projects/:slug"
              element={<ProjectDetail />}
            />
          </Routes>
        </Suspense>
      </div>

      {/* AI Avatar */}
      <AvatarPanel />
    </>
  );
}

export default App;