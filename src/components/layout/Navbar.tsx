import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { profile } from '@/data/resume';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'internship', label: 'Internship' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="container-max flex items-center justify-between py-4">
        <button
          onClick={() => scrollTo('home')}
          className="text-sm font-semibold tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label="Go to top"
        >
          SK<span style={{ color: 'var(--color-accent)' }}>.</span>
        </button>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-4 py-1.5 text-sm rounded-full transition-colors"
              style={{ color: activeId === item.id ? 'var(--color-text)' : 'var(--color-text-muted)' }}
            >
              {activeId === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--glass-fill-strong)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>

        {(profile.github || profile.linkedin) && (
          <div className="hidden md:flex items-center gap-3">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="opacity-70 hover:opacity-100 transition-opacity">
                <FaGithub size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity">
                <FaLinkedin size={18} />
              </a>
            )}
          </div>
        )}

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden container-max pb-4"
        >
          <div className="glass rounded-2xl p-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm"
                style={{
                  color: activeId === item.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                  background: activeId === item.id ? 'var(--glass-fill-strong)' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
            {(profile.github || profile.linkedin) && (
              <div className="flex gap-4 px-4 pt-2">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
