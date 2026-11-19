"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  Check,
  CheckCircle2,
  Lightbulb,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Terminal,
  UserRound,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { profile } from "@/data/resume";

const API_URL = "http://127.0.0.1:8000";

type Status = "idle" | "sending" | "success" | "error";

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
    errors.name = "Please enter your name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email.";
  }

  if (!form.message.trim()) {
    errors.message = "Please tell me about your idea.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const messageCount = form.message.length;

  const activity = useMemo(() => {
    if (form.message.length > 0) {
      return {
        label: "IDEA PROCESSOR",
        color: "#fbbf24",
        icon: Lightbulb,
      };
    }

    if (form.email.length > 0) {
      return {
        label: "SIGNAL RECEIVED",
        color: "#60a5fa",
        icon: AtSign,
      };
    }

    if (form.name.length > 0) {
      return {
        label: "IDENTITY DETECTED",
        color: "#a78bfa",
        icon: UserRound,
      };
    }

    return {
      label: "READY TO CONNECT",
      color: "#94a3b8",
      icon: Terminal,
    };
  }, [form.name, form.email, form.message]);

  const ActivityIcon = activity.icon;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setStatus("sending");

    try {
      // Attempt API submission
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: "Portfolio Contact",
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit via API");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      // Fallback: If static site on GitHub Pages (no local backend), simulate success and trigger mailto
      setStatus("success");
      const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name.trim()}`);
      const body = encodeURIComponent(
        `Hi Suhail,\n\n${form.message.trim()}\n\nBest regards,\n${form.name.trim()}\n(${form.email.trim()})`
      );
      window.setTimeout(() => {
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      }, 700);

      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  const updateName = (value: string) => {
    setForm((previous) => ({ ...previous, name: value }));
    setErrors((previous) => ({ ...previous, name: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const updateEmail = (value: string) => {
    setForm((previous) => ({ ...previous, email: value }));
    setErrors((previous) => ({ ...previous, email: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const updateMessage = (value: string) => {
    setForm((previous) => ({ ...previous, message: value }));
    setErrors((previous) => ({ ...previous, message: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  return (
    <section
      id="contact"
      className="relative isolate min-h-screen overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Background with Dark Cinematic Gradients */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/contact-background.png')`,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            linear-gradient(110deg, rgba(5,5,10,0.98) 0%, rgba(7,7,14,0.96) 35%, rgba(8,8,16,0.91) 65%, rgba(5,7,14,0.96) 100%),
            linear-gradient(180deg, rgba(5,5,10,0.72) 0%, rgba(5,5,10,0.25) 45%, rgba(5,5,10,0.96) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Lighting */}
      <motion.div
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[550px] w-[550px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(91,108,255,0.18) 0%, rgba(91,108,255,0.05) 40%, transparent 72%)",
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(124,58,237,0.035) 40%, transparent 72%)",
        }}
        animate={{
          x: [0, -18, 0],
          y: [0, -12, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Architectural Cyber Grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "75px 75px",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 18%, black 80%, transparent)",
        }}
      />

      {/* Main Balanced 2-Column Content Layout */}
      <div className="container-max relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">

          {/* =========================================================
              LEFT COLUMN: Editorial Header, Pitch & Direct Contact Info
              Occupies 6 of 12 columns on large screens
             ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-px w-10"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, transparent)",
                  }}
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">
                  Contact / 06
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                Let&apos;s build
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a5b4fc 0%, #8b9cff 48%, #c7d2fe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  something
                </span>
                <br />
                <span className="text-white">meaningful.</span>
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base">
                Have an idea, product, experiment, or problem worth solving? Tell me what you&apos;re thinking. I&apos;ll turn the conversation into a clear next step.
              </p>

              {/* Availability Badge */}
              <div
                className="mt-6 inline-flex items-center gap-3 border px-4 py-2.5 rounded-full"
                style={{
                  borderColor: "rgba(139,92,246,0.30)",
                  background: "rgba(91,108,255,0.04)",
                }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: "#34d399",
                    boxShadow: "0 0 12px rgba(52,211,153,0.75)",
                  }}
                  animate={{
                    opacity: [0.45, 1, 0.45],
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                  Available for selected projects
                </span>
              </div>

              {/* Editorial Note */}
              <div className="mt-8 flex items-start gap-4 border-l-2 border-[#6366f1]/60 pl-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                    A conversation starts here
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-6 text-white/45">
                    Whether you have a product idea, technical challenge, collaboration opportunity, or simply want to say hello, feel free to reach out.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Metadata & Socials */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="group block"
                >
                  <div className="mb-2 flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border"
                      style={{
                        borderColor: "rgba(167,139,250,0.25)",
                        background: "rgba(139,92,246,0.08)",
                        color: "#a78bfa",
                      }}
                    >
                      <Mail size={14} />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Email
                    </span>
                  </div>
                  <p className="break-all text-xs sm:text-sm text-white/75 group-hover:text-white transition-colors">
                    {profile.email}
                  </p>
                </a>

                {/* Location */}
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border"
                      style={{
                        borderColor: "rgba(96,165,250,0.25)",
                        background: "rgba(59,130,246,0.08)",
                        color: "#60a5fa",
                      }}
                    >
                      <MapPin size={14} />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                      Location
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75">
                    Chennai, India
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/30">
                    Available worldwide
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-white/30"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:border-white/30"
                  >
                    <FaLinkedinIn size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT COLUMN: The Sleek Glassmorphic Contact Form
              Occupies 6 of 12 columns on large screens
             ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-6"
          >
            {/* Form Card */}
            <div
              className="relative overflow-hidden rounded-[26px] border"
              style={{
                background: "linear-gradient(145deg, rgba(18,18,27,0.92), rgba(8,8,14,0.96))",
                borderColor: "rgba(255,255,255,0.10)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Card Top Border Beam */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(96,165,250,0.5), transparent)",
                }}
              />

              {/* Form Header */}
              <div
                className="flex items-center justify-between border-b px-6 py-4 sm:px-7"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full border"
                    style={{
                      background: "rgba(91,108,255,0.08)",
                      borderColor: "rgba(91,108,255,0.20)",
                      color: "#8b9cff",
                    }}
                  >
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Direct message
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      Start a conversation
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "#34d399",
                      boxShadow: "0 0 10px rgba(52,211,153,0.7)",
                    }}
                  />
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Online
                  </span>
                </div>
              </div>

              {/* Form Body */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 px-6 py-6 sm:px-7 sm:py-7"
                noValidate
              >
                {/* Name */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="contact-name"
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40"
                    >
                      <UserRound size={11} className="text-[#a78bfa]" />
                      Your name
                    </label>
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    placeholder="Your name..."
                    onChange={(event) => updateName(event.target.value)}
                    className="h-12 w-full rounded-xl border bg-transparent px-4 text-xs sm:text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20"
                    style={{
                      borderColor: errors.name ? "#f87171" : "rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#8b5cf6";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.name ? "#f87171" : "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="contact-email"
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40"
                    >
                      <AtSign size={11} className="text-[#60a5fa]" />
                      Email address
                    </label>
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={(event) => updateEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border bg-transparent px-4 text-xs sm:text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20"
                    style={{
                      borderColor: errors.email ? "#f87171" : "rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#60a5fa";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,165,250,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? "#f87171" : "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40"
                    >
                      <Lightbulb size={11} className="text-[#fbbf24]" />
                      Tell me about your idea
                    </label>
                    <span className="text-[9px] tabular-nums text-white/25">
                      {String(messageCount).padStart(3, "0")}/5000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={5000}
                    value={form.message}
                    placeholder="Tell me what you're building..."
                    onChange={(event) => updateMessage(event.target.value)}
                    className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-xs sm:text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-white/20"
                    style={{
                      borderColor: errors.message ? "#f87171" : "rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#fbbf24";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(251,191,36,0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.message ? "#f87171" : "rgba(255,255,255,0.10)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}

                  {/* Message processor status */}
                  <div
                    className="mt-3 flex items-center justify-between rounded-lg border px-3.5 py-2"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <ActivityIcon size={12} style={{ color: activity.color }} />
                      <span className="text-[8px] uppercase tracking-[0.20em] text-white/35">
                        {activity.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map((bar) => (
                        <motion.span
                          key={bar}
                          className="w-[2px] rounded-full"
                          style={{ background: activity.color }}
                          animate={{
                            height: form.message.length > 0 ? [3, 9 + (bar % 3) * 3, 4] : [3, 4, 3],
                          }}
                          transition={{
                            duration: 0.8 + bar * 0.08,
                            repeat: Infinity,
                            delay: bar * 0.06,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={status === "sending" ? undefined : { scale: 1.01 }}
                  whileTap={status === "sending" ? undefined : { scale: 0.99 }}
                  className="group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-xl border px-5 text-xs sm:text-sm font-medium text-white disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    borderColor: "rgba(139,92,246,0.40)",
                    background: "linear-gradient(90deg, rgba(124,58,237,0.32), rgba(91,108,255,0.24), rgba(37,99,235,0.28))",
                    boxShadow: "0 12px 40px rgba(79,70,229,0.16)",
                  }}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    }}
                    animate={{ x: ["-150%", "600%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  />

                  <span className="relative z-10 flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full border"
                      style={{
                        borderColor: "rgba(255,255,255,0.18)",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      {status === "sending" ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : status === "success" ? (
                        <Check size={15} />
                      ) : (
                        <Send size={13} />
                      )}
                    </span>
                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "success"
                          ? "Message sent!"
                          : "Send message"}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-white/60"
                  />
                </motion.button>

                {/* Feedback Banners */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-emerald-300">
                        Message received!
                      </p>
                      <p className="text-[10px] text-white/40">
                        I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3"
                  >
                    <p className="text-xs text-red-300">
                      Something went wrong. Please try again or email me directly at {profile.email}.
                    </p>
                  </motion.div>
                )}
              </form>

              {/* Card Footer */}
              <div
                className="flex items-center justify-between border-t px-6 py-4 sm:px-7"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                    Suhail Khan / 2026
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.22em] text-white/20">
                  Chennai + Worldwide
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section Bottom Border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between border-white/10"
        >
          <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.28em] text-white/25">
            <span>Computer Science</span>
            <span className="h-px w-6 bg-[#8b5cf6]/40" />
            <span>Data Science</span>
            <span className="h-px w-6 bg-[#8b5cf6]/40" />
            <span>Artificial Intelligence</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            Let&apos;s make something meaningful.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
