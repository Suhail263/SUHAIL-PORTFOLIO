import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/resume';

// EmailJS credentials — create a free account at emailjs.com, then set these
// in a .env file (see .env.example). The form works end-to-end once they're set;
// until then, submissions are caught and shown as a clear config error rather
// than silently failing.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'That email doesn\u2019t look right.';
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message, to_name: profile.name },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk."
          description="Have a role, project, or question in mind? Send a message — I read every one."
        />

        <div className="grid md:grid-cols-[1fr,1.3fr] gap-8">
          <div className="space-y-6">
            <GlassCard className="p-6 space-y-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 group">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                  <Mail size={16} />
                </span>
                <span className="text-sm group-hover:underline">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-3 group">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                  <Phone size={16} />
                </span>
                <span className="text-sm group-hover:underline">{profile.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                  <MapPin size={16} />
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Chennai, India</span>
              </div>

              {(profile.github || profile.linkedin) && (
                <div className="flex gap-3 pt-2">
                  {profile.github && (
                    <Button as="a" variant="ghost" href={profile.github} target="_blank" rel="noreferrer" icon={<FaGithub size={16} />}>
                      GitHub
                    </Button>
                  )}
                  {profile.linkedin && (
                    <Button as="a" variant="ghost" href={profile.linkedin} target="_blank" rel="noreferrer" icon={<FaLinkedin size={16} />}>
                      LinkedIn
                    </Button>
                  )}
                </div>
              )}
            </GlassCard>

            <div className="rounded-2xl overflow-hidden glass h-52">
              <iframe
                title="Chennai location map"
                src="https://www.google.com/maps?q=Chennai,India&output=embed"
                className="w-full h-full border-0 grayscale-[40%] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <GlassCard className="p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-wide" style={{ color: 'var(--color-text-faint)' }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full mt-2 bg-transparent border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                  style={{ borderColor: errors.name ? '#f87171' : 'var(--glass-border)' }}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs mt-1.5 text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-wide" style={{ color: 'var(--color-text-faint)' }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full mt-2 bg-transparent border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                  style={{ borderColor: errors.email ? '#f87171' : 'var(--glass-border)' }}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs mt-1.5 text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-wide" style={{ color: 'var(--color-text-faint)' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full mt-2 bg-transparent border rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  style={{ borderColor: errors.message ? '#f87171' : 'var(--glass-border)' }}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-xs mt-1.5 text-red-400">{errors.message}</p>}
              </div>

              <Button variant="primary" disabled={status === 'sending'} className="w-full" icon={status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : undefined}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </Button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 size={16} /> Message sent — thanks for reaching out.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={16} /> Something went wrong sending that. Try emailing directly instead.
                </motion.p>
              )}
              {status === 'unconfigured' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-faint)' }}>
                  <AlertCircle size={16} /> Contact form isn't connected to an email service yet — see .env.example.
                </motion.p>
              )}
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
