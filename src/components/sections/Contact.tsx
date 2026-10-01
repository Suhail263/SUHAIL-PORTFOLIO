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
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/contact-background.png')",
          backgroundPosition: 'center center',
        }}
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(3, 8, 24, 0.97) 0%, rgba(3, 8, 24, 0.88) 45%, rgba(3, 8, 24, 0.76) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Blue Glow */}
      <div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 -z-10"
        style={{ background: '#2563eb' }}
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        {/* Section Heading */}
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--color-accent)' }}
          >
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Let's talk.
          </h2>

          <p
            className="text-base mt-3 max-w-2xl"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Have a role, project, or question in mind? Send a message — I read
            every one.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,1.3fr] gap-8 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <GlassCard className="p-6 md:p-8 space-y-6">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Get in touch
                </p>

                <h3 className="text-2xl font-semibold">
                  Let's build something
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    extraordinary.
                  </span>
                </h3>
              </div>

              {/* Email & Phone */}
              <div className="space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: 'rgba(37, 99, 235, 0.12)',
                          borderColor: 'rgba(59, 130, 246, 0.25)',
                          color: '#60a5fa',
                        }}
                      >
                        <Icon size={19} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-xs mb-1"
                          style={{ color: 'var(--color-text-faint)' }}
                        >
                          {item.label}
                        </span>

                        <span className="block text-sm break-all group-hover:text-blue-300 transition-colors">
                          {item.value}
                        </span>
                      </span>

                      <ArrowUpRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: '#60a5fa' }}
                      />
                    </a>
                  );
                })}

                {/* Location */}
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border"
                    style={{
                      background: 'rgba(37, 99, 235, 0.12)',
                      borderColor: 'rgba(59, 130, 246, 0.25)',
                      color: '#60a5fa',
                    }}
                  >
                    <MapPin size={19} />
                  </span>

                  <span>
                    <span
                      className="block text-xs mb-1"
                      style={{ color: 'var(--color-text-faint)' }}
                    >
                      Location
                    </span>

                    <span className="text-sm">Chennai, India</span>
                  </span>
                </div>
              </div>

              {/* Social Links */}
              {(profile.github || profile.linkedin) && (
                <div
                  className="flex flex-wrap gap-3 pt-5 border-t"
                  style={{ borderColor: 'var(--glass-border)' }}
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

            {/* Location Map */}
            <div
              className="relative rounded-2xl overflow-hidden border h-52"
              style={{
                borderColor: 'var(--glass-border)',
                background: 'rgba(10, 20, 40, 0.7)',
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
                className="absolute top-3 left-3 rounded-lg px-4 py-2 text-xs font-medium flex items-center gap-2"
                style={{
                  background: 'rgba(5, 12, 30, 0.9)',
                  color: '#93c5fd',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                }}
              >
                Open in Maps <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-6 md:p-8">
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Send a message
                </p>

                <h3 className="text-2xl font-semibold">
                  Have a project in mind?
                </h3>

                <p
                  className="text-sm mt-2"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Fill out the form below and I'll get back to you.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-wide"
                    style={{ color: 'var(--color-text-faint)' }}
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
                      setForm((f) => ({ ...f, name: e.target.value }));
                      setErrors((prev) => ({ ...prev, name: undefined }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 bg-black/20 border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 transition-colors placeholder:text-gray-500"
                    style={{
                      borderColor: errors.name
                        ? '#f87171'
                        : 'var(--glass-border)',
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
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

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-wide"
                    style={{ color: 'var(--color-text-faint)' }}
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
                      setForm((f) => ({ ...f, email: e.target.value }));
                      setErrors((prev) => ({ ...prev, email: undefined }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 bg-black/20 border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 transition-colors placeholder:text-gray-500"
                    style={{
                      borderColor: errors.email
                        ? '#f87171'
                        : 'var(--glass-border)',
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? 'email-error' : undefined
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

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wide"
                    style={{ color: 'var(--color-text-faint)' }}
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
                      setForm((f) => ({ ...f, message: e.target.value }));
                      setErrors((prev) => ({ ...prev, message: undefined }));
                      setStatus('idle');
                    }}
                    className="w-full mt-2 bg-black/20 border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 transition-colors resize-none placeholder:text-gray-500"
                    style={{
                      borderColor: errors.message
                        ? '#f87171'
                        : 'var(--glass-border)',
                    }}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
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

                {/* Submit Button */}
                <Button
                  variant="primary"
                  disabled={status === 'sending'}
                  className="w-full"
                  icon={
                    status === 'sending' ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )
                  }
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Success Message */}
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-emerald-400"
                    role="status"
                  >
                    <CheckCircle2 size={17} />
                    Message sent successfully. Thanks for reaching out!
                  </motion.p>
                )}

                {/* Error Message */}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                    role="alert"
                  >
                    <AlertCircle size={17} />
                    Something went wrong. Please try again or email me directly.
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