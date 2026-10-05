import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/resume';

// FastAPI Backend Configuration
const API_URL = 'http://127.0.0.1:8000';

type Status = 'idle' | 'sending' | 'success' | 'error';

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

  if (!form.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "That email doesn't look right.";
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter your message.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }

  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  // Submit Contact Form to FastAPI Backend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: 'Portfolio Contact',
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === 'string'
            ? data.detail
            : 'Unable to submit your message.',
        );
      }

      setStatus('success');

      setForm({
        name: '',
        email: '',
        message: '',
      });

      setErrors({});
    } catch (error) {
      console.error('Contact API error:', error);
      setStatus('error');
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
  ];

  return (
    <section
      id="contact"
      className="section relative isolate overflow-hidden"
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/contact-background.png')",
          backgroundPosition: 'center center',
        }}
        aria-hidden="true"
      />

      {/* =========================================================
          DARK MULTI-TONE OVERLAY
      ========================================================= */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            linear-gradient(
              110deg,
              rgba(5, 5, 10, 0.98) 0%,
              rgba(8, 7, 16, 0.94) 38%,
              rgba(10, 8, 20, 0.82) 68%,
              rgba(12, 8, 22, 0.72) 100%
            ),
            linear-gradient(
              180deg,
              rgba(5, 5, 10, 0.70) 0%,
              rgba(5, 5, 10, 0.25) 50%,
              rgba(5, 5, 10, 0.92) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* =========================================================
          VIOLET GLOW
      ========================================================= */}
      <div
        className="absolute -top-56 right-[-80px] -z-10 h-[560px] w-[560px] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.28) 0%, rgba(124, 58, 237, 0.08) 42%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================
          PINK GLOW
      ========================================================= */}
      <div
        className="absolute bottom-[8%] left-[-180px] -z-10 h-[480px] w-[480px] rounded-full blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.16) 0%, rgba(236, 72, 153, 0.05) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================
          ORANGE / AMBER ACCENT
      ========================================================= */}
      <div
        className="absolute right-[15%] bottom-[18%] -z-10 h-[260px] w-[260px] rounded-full blur-[130px]"
        style={{
          background:
            'radial-gradient(circle, rgba(251, 146, 60, 0.10) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* =========================================================
          SUBTLE COLOR GRID
      ========================================================= */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(139, 92, 246, 0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(236, 72, 153, 0.06) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '80px 80px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-max relative z-10">

        {/* =======================================================
            SECTION HEADING
        ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-10"
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-3 font-medium"
            style={{
              color: '#a78bfa',
            }}
          >
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Let's talk.
          </h2>

          <p
            className="text-base mt-3 max-w-2xl"
            style={{
              color: 'rgba(255,255,255,0.58)',
            }}
          >
            Have a role, project, or question in mind? Send a message — I read
            every one.
          </p>
        </motion.div>

        {/* =======================================================
            MAIN GRID
        ======================================================= */}
        <div className="grid md:grid-cols-[1fr,1.3fr] gap-8 items-start">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-6"
          >

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}
            <GlassCard
              className="p-6 md:p-8 space-y-6"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(124,58,237,0.035))',
                borderColor: 'rgba(167,139,250,0.16)',
              }}
            >
              <div>
                <p
                  className="text-xs uppercase tracking-[0.22em] mb-2 font-medium"
                  style={{
                    color: '#c4b5fd',
                  }}
                >
                  Get in touch
                </p>

                <h3 className="text-2xl font-semibold text-white">
                  Let's build something
                  <br />

                  <span
                    style={{
                      background:
                        'linear-gradient(90deg, #a78bfa 0%, #ec4899 52%, #fb923c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    extraordinary.
                  </span>
                </h3>
              </div>

              {/* ===============================================
                  EMAIL + PHONE
              =============================================== */}
              <div className="space-y-5">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;

                  const accent =
                    index === 0 ? '#a78bfa' : '#f472b6';

                  const accentBg =
                    index === 0
                      ? 'rgba(139,92,246,0.10)'
                      : 'rgba(236,72,153,0.09)';

                  const accentBorder =
                    index === 0
                      ? 'rgba(167,139,250,0.22)'
                      : 'rgba(244,114,182,0.20)';

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
                        style={{
                          background: accentBg,
                          borderColor: accentBorder,
                          color: accent,
                        }}
                      >
                        <Icon size={19} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-xs mb-1"
                          style={{
                            color: 'rgba(255,255,255,0.35)',
                          }}
                        >
                          {item.label}
                        </span>

                        <span
                          className="block text-sm break-all transition-colors duration-300"
                          style={{
                            color: 'rgba(255,255,255,0.86)',
                          }}
                        >
                          {item.value}
                        </span>
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{
                          color: accent,
                        }}
                      />
                    </a>
                  );
                })}

                {/* =============================================
                    LOCATION
                ============================================= */}
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border"
                    style={{
                      background: 'rgba(251,146,60,0.08)',
                      borderColor: 'rgba(251,146,60,0.20)',
                      color: '#fb923c',
                    }}
                  >
                    <MapPin size={19} />
                  </span>

                  <span>
                    <span
                      className="block text-xs mb-1"
                      style={{
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      Location
                    </span>

                    <span className="text-sm text-white/85">
                      Chennai, India
                    </span>
                  </span>
                </div>
              </div>

              {/* =================================================
                  SOCIAL LINKS
              ================================================= */}
              {(profile.github || profile.linkedin) && (
                <div
                  className="flex flex-wrap gap-3 pt-5 border-t"
                  style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  {profile.github && (
                    <Button
                      as="a"
                      variant="ghost"
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      icon={<FaGithub size={17} />}
                    >
                      GitHub
                    </Button>
                  )}

                  {profile.linkedin && (
                    <Button
                      as="a"
                      variant="ghost"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      icon={<FaLinkedin size={17} />}
                    >
                      LinkedIn
                    </Button>
                  )}
                </div>
              )}
            </GlassCard>

            {/* =================================================
                LOCATION MAP
            ================================================= */}
            <div
              className="relative rounded-2xl overflow-hidden border h-52"
              style={{
                borderColor: 'rgba(167,139,250,0.16)',
                background: 'rgba(10,10,16,0.82)',
                boxShadow:
                  '0 20px 70px rgba(0,0,0,0.30)',
              }}
            >
              <iframe
                title="Chennai location map"
                src="https://www.google.com/maps?q=Chennai,India&output=embed"
                className="w-full h-full border-0 grayscale-[40%] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href="https://www.google.com/maps/search/?api=1&query=Chennai,India"
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 left-3 rounded-lg px-4 py-2 text-xs font-medium flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    'rgba(15,10,24,0.92)',
                  color: '#c4b5fd',
                  border:
                    '1px solid rgba(167,139,250,0.30)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                Open in Maps
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT SIDE — CONTACT FORM
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <GlassCard
              className="p-6 md:p-8"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(236,72,153,0.025))',
                borderColor: 'rgba(236,72,153,0.14)',
              }}
            >
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-[0.22em] mb-2 font-medium"
                  style={{
                    color: '#f0abfc',
                  }}
                >
                  Send a message
                </p>

                <h3 className="text-2xl font-semibold text-white">
                  Have a project in mind?
                </h3>

                <p
                  className="text-sm mt-2"
                  style={{
                    color: 'rgba(255,255,255,0.52)',
                  }}
                >
                  Fill out the form below and I'll get back to you.
                </p>
              </div>

              {/* =================================================
                  FORM
              ================================================= */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* =================================================
                    NAME
                ================================================= */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-wide"
                    style={{
                      color: 'rgba(255,255,255,0.40)',
                    }}
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        name: e.target.value,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 placeholder:text-white/25"
                    style={{
                      background:
                        'rgba(0,0,0,0.25)',
                      borderColor: errors.name
                        ? '#f87171'
                        : 'rgba(255,255,255,0.10)',
                      color: '#ffffff',
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name
                        ? 'name-error'
                        : undefined
                    }
                  />

                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-xs mt-1.5 text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-wide"
                    style={{
                      color: 'rgba(255,255,255,0.40)',
                    }}
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 placeholder:text-white/25"
                    style={{
                      background:
                        'rgba(0,0,0,0.25)',
                      borderColor: errors.email
                        ? '#f87171'
                        : 'rgba(255,255,255,0.10)',
                      color: '#ffffff',
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email
                        ? 'email-error'
                        : undefined
                    }
                  />

                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-xs mt-1.5 text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wide"
                    style={{
                      color: 'rgba(255,255,255,0.40)',
                    }}
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    rows={6}
                    maxLength={5000}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        message: e.target.value,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        message: undefined,
                      }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300 resize-none placeholder:text-white/25"
                    style={{
                      background:
                        'rgba(0,0,0,0.25)',
                      borderColor: errors.message
                        ? '#f87171'
                        : 'rgba(255,255,255,0.10)',
                      color: '#ffffff',
                    }}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message
                        ? 'message-error'
                        : undefined
                    }
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-xs mt-1.5 text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    SUBMIT BUTTON
                ================================================= */}
                <Button
                  variant="primary"
                  disabled={status === 'sending'}
                  className="w-full"
                  icon={
                    status === 'sending' ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={16} />
                    )
                  }
                >
                  {status === 'sending'
                    ? 'Sending...'
                    : 'Send Message'}
                </Button>

                {/* =================================================
                    SUCCESS
                ================================================= */}
                {status === 'success' && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-center gap-2 text-sm text-emerald-400"
                    role="status"
                  >
                    <CheckCircle2 size={17} />
                    Message sent successfully. Thanks for
                    reaching out!
                  </motion.p>
                )}

                {/* =================================================
                    ERROR
                ================================================= */}
                {status === 'error' && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-center gap-2 text-sm text-red-400"
                    role="alert"
                  >
                    <AlertCircle size={17} />
                    Something went wrong. Please try again
                    or email me directly.
                  </motion.p>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}