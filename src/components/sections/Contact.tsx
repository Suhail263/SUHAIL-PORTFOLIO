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

/* =========================================================
   FASTAPI BACKEND
   ========================================================= */

const API_URL = "http://127.0.0.1:8000";

/* =========================================================
   TYPES
   ========================================================= */

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

/* =========================================================
   VALIDATION
   ========================================================= */

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

/* =========================================================
   CONTACT SECTION
   ========================================================= */

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  /* -------------------------------------------------------
     MESSAGE CHARACTER COUNT
     ------------------------------------------------------- */

  const messageCount = form.message.length;

  /* -------------------------------------------------------
     CURRENT FORM ACTIVITY
     ------------------------------------------------------- */

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

  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validate(form);

    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setStatus("sending");

    try {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to submit your message.",
        );
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Contact API error:", error);
      setStatus("error");
    }
  };

  /* =========================================================
     FIELD UPDATE HELPERS
     ========================================================= */

  const updateName = (value: string) => {
    setForm((previous) => ({
      ...previous,
      name: value,
    }));

    setErrors((previous) => ({
      ...previous,
      name: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const updateEmail = (value: string) => {
    setForm((previous) => ({
      ...previous,
      email: value,
    }));

    setErrors((previous) => ({
      ...previous,
      email: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const updateMessage = (value: string) => {
    setForm((previous) => ({
      ...previous,
      message: value,
    }));

    setErrors((previous) => ({
      ...previous,
      message: undefined,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section
      id="contact"
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden
        pt-[120px]
        pb-16
        sm:pt-[130px]
        lg:pt-[145px]
        lg:pb-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/contact-background.png')",
        }}
        aria-hidden="true"
      />

      {/* Dark cinematic overlay */}

      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            linear-gradient(
              110deg,
              rgba(5,5,10,0.98) 0%,
              rgba(7,7,14,0.96) 35%,
              rgba(8,8,16,0.91) 65%,
              rgba(5,7,14,0.96) 100%
            ),
            linear-gradient(
              180deg,
              rgba(5,5,10,0.72) 0%,
              rgba(5,5,10,0.25) 45%,
              rgba(5,5,10,0.96) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          AMBIENT LIGHTS
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          -z-10
          h-[600px]
          w-[600px]
          rounded-full
          blur-[150px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(91,108,255,0.18), rgba(91,108,255,0.05) 42%, transparent 72%)",
        }}
        animate={{
          x: [0, 25, 0],
          y: [0, 18, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-48
          bottom-0
          -z-10
          h-[520px]
          w-[520px]
          rounded-full
          blur-[150px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12), rgba(124,58,237,0.035) 42%, transparent 72%)",
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          ARCHITECTURAL GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          opacity-[0.16]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(148,163,184,0.10) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(148,163,184,0.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "75px 75px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 80%, transparent)",
        }}
      />

      {/* =====================================================
          DECORATIVE HORIZONTAL LINE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-[115px]
          h-px
        "
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {/* =====================================================
          MAIN CONTAINER

          IMPORTANT:
          Extra top spacing fixes navbar overlap.
      ===================================================== */}

      <div className="container-max relative z-10">
        {/* ===================================================
            EDITORIAL HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-12
            max-w-3xl
            lg:mb-16
          "
        >
          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-px
                w-10
              "
              style={{
                background:
                  "linear-gradient(90deg, #6366f1, transparent)",
              }}
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.32em]
              "
              style={{
                color: "rgba(255,255,255,0.42)",
              }}
            >
              Contact / 06
            </span>
          </div>

          {/* Main heading */}

          <h2
            className="
              max-w-[850px]
              text-[clamp(3.2rem,7vw,7rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.055em]
              text-white
            "
          >
            Let&apos;s build
            <br />

            <span
              style={{
                background:
                  "linear-gradient(90deg, #a5b4fc 0%, #8b9cff 48%, #c7d2fe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              something
            </span>

            <br />

            <span className="text-white">
              meaningful.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-7
              max-w-[560px]
              text-sm
              leading-7
              sm:text-base
            "
            style={{
              color: "rgba(255,255,255,0.52)",
            }}
          >
            Have an idea, product, experiment, or problem worth solving?
            Tell me what you&apos;re thinking. I&apos;ll turn the conversation
            into a clear next step.
          </p>

          {/* Availability */}

          <div
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              border
              px-4
              py-3
            "
            style={{
              borderColor: "rgba(139,92,246,0.28)",
              background: "rgba(91,108,255,0.035)",
            }}
          >
            <motion.span
              className="h-2 w-2 rounded-full"
              style={{
                background: "#34d399",
                boxShadow: "0 0 14px rgba(52,211,153,0.75)",
              }}
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
              "
              style={{
                color: "rgba(255,255,255,0.56)",
              }}
            >
              Available for selected projects
            </span>
          </div>
        </motion.div>

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div
          className="
            grid
            items-start
            gap-8
            lg:grid-cols-[0.88fr,1.12fr]
            lg:gap-10
          "
        >
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              flex
              min-h-full
              flex-col
              justify-between
            "
          >
            {/* -------------------------------------------------
                EDITORIAL NOTE
            ------------------------------------------------- */}

            <div className="max-w-xl">
              <div className="flex items-start gap-4">
                <div
                  className="
                    mt-2
                    h-14
                    w-px
                    shrink-0
                  "
                  style={{
                    background:
                      "linear-gradient(to bottom, #6366f1, transparent)",
                  }}
                />

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.22em]
                    "
                    style={{
                      color: "rgba(255,255,255,0.34)",
                    }}
                  >
                    A conversation starts here
                  </p>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-7
                    "
                    style={{
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Whether you have a product idea, technical challenge,
                    collaboration opportunity, or simply want to say hello,
                    feel free to reach out.
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                CONTACT META
            ------------------------------------------------- */}

            <div className="mt-14 lg:mt-28">
              <div
                className="
                  mb-8
                  h-px
                  w-full
                "
                style={{
                  background:
                    "linear-gradient(90deg, rgba(139,92,246,0.42), transparent)",
                }}
              />

              <div className="grid gap-7 sm:grid-cols-2">
                {/* Email */}

                <a
                  href={`mailto:${profile.email}`}
                  className="group"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                      "
                      style={{
                        borderColor: "rgba(167,139,250,0.20)",
                        background: "rgba(139,92,246,0.06)",
                        color: "#a78bfa",
                      }}
                    >
                      <Mail size={15} />
                    </span>

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.34)",
                      }}
                    >
                      Email
                    </span>
                  </div>

                  <p
                    className="
                      break-all
                      text-sm
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                    style={{
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    {profile.email}
                  </p>
                </a>

                {/* Location */}

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                      "
                      style={{
                        borderColor: "rgba(96,165,250,0.20)",
                        background: "rgba(59,130,246,0.06)",
                        color: "#60a5fa",
                      }}
                    >
                      <MapPin size={15} />
                    </span>

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.34)",
                      }}
                    >
                      Location
                    </span>
                  </div>

                  <p
                    className="text-sm"
                    style={{
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    Chennai, India
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                    "
                    style={{
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Available worldwide
                  </p>
                </div>
              </div>

              {/* -------------------------------------------------
                  SOCIAL LINKS
              ------------------------------------------------- */}

              <div className="mt-9 flex items-center gap-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      borderColor: "rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.025)",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <FaGithub size={17} />
                  </a>
                )}

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300
                      hover:-translate-y-1
                    "
                    style={{
                      borderColor: "rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.025)",
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <FaLinkedinIn size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT / FORM
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.985,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Form card */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[26px]
                border
              "
              style={{
                background:
                  "linear-gradient(145deg, rgba(18,18,27,0.88), rgba(8,8,14,0.94))",
                borderColor: "rgba(255,255,255,0.10)",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.42)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Card top glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-0
                  h-px
                "
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,92,246,0.55), rgba(96,165,250,0.45), transparent)",
                }}
              />

              {/* ------------------------------------------------
                  FORM HEADER
              ------------------------------------------------ */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  px-6
                  py-5
                  sm:px-8
                "
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                    "
                    style={{
                      background: "rgba(91,108,255,0.08)",
                      borderColor: "rgba(91,108,255,0.20)",
                      color: "#8b9cff",
                    }}
                  >
                    <Sparkles size={15} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.30)",
                      }}
                    >
                      Direct message
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      Start a conversation
                    </p>
                  </div>
                </div>

                <div
                  className="
                    hidden
                    items-center
                    gap-2
                    sm:flex
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                    "
                    style={{
                      background: "#34d399",
                      boxShadow:
                        "0 0 10px rgba(52,211,153,0.7)",
                    }}
                  />

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                    "
                    style={{
                      color: "rgba(255,255,255,0.32)",
                    }}
                  >
                    Online
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------
                  FORM BODY
              ------------------------------------------------ */}

              <form
                onSubmit={handleSubmit}
                className="
                  space-y-7
                  px-6
                  py-7
                  sm:px-8
                  sm:py-8
                "
                noValidate
              >
                {/* ==============================================
                    NAME
                ============================================== */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-name"
                      className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      <UserRound
                        size={12}
                        style={{
                          color: "#a78bfa",
                        }}
                      />

                      Your name
                    </label>
                  </div>

                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    placeholder="Your name..."
                    onChange={(event) =>
                      updateName(event.target.value)
                    }
                    className="
                      h-14
                      w-full
                      rounded-full
                      border
                      bg-transparent
                      px-5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-white/20
                    "
                    style={{
                      borderColor: errors.name
                        ? "#f87171"
                        : "rgba(255,255,255,0.09)",
                      background:
                        "rgba(255,255,255,0.018)",
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor =
                        "#8b5cf6";
                      event.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(139,92,246,0.08)";
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor =
                        errors.name
                          ? "#f87171"
                          : "rgba(255,255,255,0.09)";
                      event.currentTarget.style.boxShadow =
                        "none";
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name
                        ? "contact-name-error"
                        : undefined
                    }
                  />

                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="
                        mt-2
                        text-xs
                        text-red-400
                      "
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* ==============================================
                    EMAIL
                ============================================== */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-email"
                      className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      <AtSign
                        size={12}
                        style={{
                          color: "#60a5fa",
                        }}
                      />

                      Email address
                    </label>
                  </div>

                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={(event) =>
                      updateEmail(event.target.value)
                    }
                    className="
                      h-14
                      w-full
                      rounded-full
                      border
                      bg-transparent
                      px-5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-white/20
                    "
                    style={{
                      borderColor: errors.email
                        ? "#f87171"
                        : "rgba(255,255,255,0.09)",
                      background:
                        "rgba(255,255,255,0.018)",
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor =
                        "#60a5fa";
                      event.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(96,165,250,0.08)";
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor =
                        errors.email
                          ? "#f87171"
                          : "rgba(255,255,255,0.09)";
                      event.currentTarget.style.boxShadow =
                        "none";
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email
                        ? "contact-email-error"
                        : undefined
                    }
                  />

                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="
                        mt-2
                        text-xs
                        text-red-400
                      "
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* ==============================================
                    MESSAGE
                ============================================== */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                      "
                      style={{
                        color: "rgba(255,255,255,0.38)",
                      }}
                    >
                      <Lightbulb
                        size={12}
                        style={{
                          color: "#fbbf24",
                        }}
                      />

                      Tell me about your idea
                    </label>

                    <span
                      className="
                        text-[9px]
                        tabular-nums
                      "
                      style={{
                        color: "rgba(255,255,255,0.24)",
                      }}
                    >
                      {String(messageCount).padStart(3, "0")}
                      /5000
                    </span>
                  </div>

                  <textarea
                    id="contact-message"
                    rows={7}
                    maxLength={5000}
                    value={form.message}
                    placeholder="Tell me what you're building..."
                    onChange={(event) =>
                      updateMessage(event.target.value)
                    }
                    className="
                      w-full
                      resize-none
                      rounded-[24px]
                      border
                      bg-transparent
                      px-5
                      py-5
                      text-sm
                      leading-7
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-white/20
                    "
                    style={{
                      borderColor: errors.message
                        ? "#f87171"
                        : "rgba(255,255,255,0.09)",
                      background:
                        "rgba(255,255,255,0.018)",
                    }}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor =
                        "#fbbf24";
                      event.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(251,191,36,0.06)";
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor =
                        errors.message
                          ? "#f87171"
                          : "rgba(255,255,255,0.09)";
                      event.currentTarget.style.boxShadow =
                        "none";
                    }}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message
                        ? "contact-message-error"
                        : undefined
                    }
                  />

                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="
                        mt-2
                        text-xs
                        text-red-400
                      "
                    >
                      {errors.message}
                    </p>
                  )}

                  {/* Message processor */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      rounded-full
                      border
                      px-4
                      py-2.5
                    "
                    style={{
                      background:
                        "rgba(255,255,255,0.018)",
                      borderColor:
                        "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <ActivityIcon
                        size={13}
                        style={{
                          color: activity.color,
                        }}
                      />

                      <span
                        className="
                          text-[8px]
                          uppercase
                          tracking-[0.20em]
                        "
                        style={{
                          color:
                            "rgba(255,255,255,0.34)",
                        }}
                      >
                        {activity.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map(
                        (bar) => (
                          <motion.span
                            key={bar}
                            className="
                              w-[2px]
                              rounded-full
                            "
                            style={{
                              background:
                                activity.color,
                            }}
                            animate={{
                              height:
                                form.message.length >
                                0
                                  ? [
                                      4,
                                      10 + (bar % 3) * 4,
                                      5,
                                    ]
                                  : [4, 5, 4],
                              }}
                            transition={{
                              duration:
                                0.8 + bar * 0.08,
                              repeat: Infinity,
                              delay: bar * 0.06,
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* ==============================================
                    SEND BUTTON
                ============================================== */}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={
                    status === "sending"
                      ? undefined
                      : {
                          scale: 1.01,
                        }
                  }
                  whileTap={
                    status === "sending"
                      ? undefined
                      : {
                          scale: 0.985,
                        }
                  }
                  className="
                    group
                    relative
                    flex
                    h-[68px]
                    w-full
                    items-center
                    justify-between
                    overflow-hidden
                    rounded-full
                    border
                    px-6
                    text-sm
                    font-medium
                    text-white
                    disabled:cursor-not-allowed
                  "
                  style={{
                    borderColor:
                      "rgba(139,92,246,0.38)",
                    background:
                      "linear-gradient(90deg, rgba(124,58,237,0.30), rgba(91,108,255,0.22), rgba(37,99,235,0.26))",
                    boxShadow:
                      "0 15px 50px rgba(79,70,229,0.14)",
                  }}
                >
                  {/* Moving light */}

                  <motion.div
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      w-24
                      -skew-x-12
                    "
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                    }}
                    animate={{
                      x: ["-150%", "600%"],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                      "
                      style={{
                        borderColor:
                          "rgba(255,255,255,0.16)",
                        background:
                          "rgba(255,255,255,0.07)",
                      }}
                    >
                      {status === "sending" ? (
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                      ) : status === "success" ? (
                        <Check size={17} />
                      ) : (
                        <Send size={16} />
                      )}
                    </span>

                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "success"
                          ? "Message sent"
                          : "Send message"}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="
                      relative
                      z-10
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                    style={{
                      color:
                        "rgba(255,255,255,0.58)",
                    }}
                  />
                </motion.button>

                {/* ==============================================
                    SUCCESS
                ============================================== */}

                {status === "success" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      px-4
                      py-3
                    "
                    style={{
                      borderColor:
                        "rgba(52,211,153,0.22)",
                      background:
                        "rgba(16,185,129,0.055)",
                    }}
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                      "
                      style={{
                        background:
                          "rgba(16,185,129,0.10)",
                        color: "#34d399",
                      }}
                    >
                      <CheckCircle2 size={16} />
                    </span>

                    <div>
                      <p
                        className="
                          text-xs
                          font-medium
                        "
                        style={{
                          color: "#6ee7b7",
                        }}
                      >
                        Message received.
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                        "
                        style={{
                          color:
                            "rgba(255,255,255,0.30)",
                        }}
                      >
                        I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ==============================================
                    ERROR
                ============================================== */}

                {status === "error" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      rounded-2xl
                      border
                      px-4
                      py-3
                    "
                    style={{
                      borderColor:
                        "rgba(248,113,113,0.22)",
                      background:
                        "rgba(127,29,29,0.08)",
                    }}
                  >
                    <p
                      className="
                        text-xs
                        text-red-400
                      "
                    >
                      Something went wrong. Please try
                      again or email me directly.
                    </p>
                  </motion.div>
                )}
              </form>

              {/* =================================================
                  CARD FOOTER
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  px-6
                  py-5
                  sm:px-8
                "
                style={{
                  borderColor:
                    "rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                    "
                    style={{
                      background:
                        "rgba(255,255,255,0.28)",
                    }}
                  />

                  <span
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.22em]
                    "
                    style={{
                      color:
                        "rgba(255,255,255,0.22)",
                    }}
                  >
                    Suhail Khan / 2026
                  </span>
                </div>

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.22em]
                  "
                  style={{
                    color:
                      "rgba(255,255,255,0.18)",
                  }}
                >
                  Chennai + Worldwide
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="
            mt-16
            flex
            flex-col
            gap-5
            border-t
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
          style={{
            borderColor:
              "rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
              "
              style={{
                color:
                  "rgba(255,255,255,0.22)",
              }}
            >
              Computer Science
            </span>

            <span
              className="
                h-px
                w-7
              "
              style={{
                background:
                  "rgba(139,92,246,0.38)",
              }}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
              "
              style={{
                color:
                  "rgba(255,255,255,0.22)",
              }}
            >
              Data Science
            </span>

            <span
              className="
                h-px
                w-7
              "
              style={{
                background:
                  "rgba(139,92,246,0.38)",
              }}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
              "
              style={{
                color:
                  "rgba(255,255,255,0.22)",
              }}
            >
              Artificial Intelligence
            </span>
          </div>

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.28em]
            "
            style={{
              color:
                "rgba(255,255,255,0.16)",
            }}
          >
            Let&apos;s make something meaningful.
          </p>
        </motion.div>
      </div>
    </section>
  );
}