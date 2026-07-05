import { profile } from '@/data/resume';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t" style={{ borderColor: 'var(--glass-border)' }}>
      <div className="container-max py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
          © {year} {profile.name}. Built with React, Three.js &amp; a lot of coffee.
        </p>
        <button
          onClick={scrollTop}
          className="text-xs uppercase tracking-wide hover:text-[var(--color-text)] transition-colors"
          style={{ color: 'var(--color-text-faint)' }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
