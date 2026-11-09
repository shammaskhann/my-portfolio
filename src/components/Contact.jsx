import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button, Icon, StatusDot, cx } from "./ui";
import { PROFILE } from "../data/portfolio";
import css from "./Contact.module.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact({ data }) {
  const formRef = useRef(null);
  const copyTimer = useRef(0);
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ from_name: "", reply_to: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      setForm({ from_name: "", reply_to: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={css.grid}>
          <div className={css.left}>
            <p className={css.eyebrow}>
              <span className={css.eyebrowIndex}>05</span>
              <span className={css.eyebrowDash} aria-hidden="true" />
              Contact
            </p>
            <h2 className={css.title}>
              Let's ship your <span className={css.titleAccent}>next app.</span>
            </h2>
            <p className={css.lead}>
              Have a product in mind, a role to fill, or a release that needs a senior pair of hands? Tell me what
              you're building.
            </p>

            <div className={css.rows}>
              <div className={cx(css.row, css.rowStatic)}>
                <span className={css.iconBox}>
                  <Icon name="mail" size={17} />
                </span>
                <span className={css.rowText}>
                  <span className={css.rowLabel}>{copied ? "Copied" : "Email"}</span>
                  <a className={css.rowValue} href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </span>
                <button
                  type="button"
                  className={css.copyButton}
                  onClick={copyEmail}
                  aria-label={`Copy email address ${data.email}`}
                >
                  <Icon name={copied ? "check" : "copy"} size={15} />
                </button>
              </div>

              <a className={css.row} href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <span className={css.iconBox}>
                  <Icon name="linkedin" size={16} />
                </span>
                <span className={css.rowText}>
                  <span className={css.rowLabel}>LinkedIn</span>
                  <span className={css.rowValue}>/in/shammaskhan</span>
                </span>
                <Icon name="arrowUpRight" size={16} className={css.rowArrow} />
              </a>

              <a className={css.row} href={data.github} target="_blank" rel="noopener noreferrer">
                <span className={css.iconBox}>
                  <Icon name="github" size={16} />
                </span>
                <span className={css.rowText}>
                  <span className={css.rowLabel}>GitHub</span>
                  <span className={css.rowValue}>/shammaskhann</span>
                </span>
                <Icon name="arrowUpRight" size={16} className={css.rowArrow} />
              </a>
            </div>

            <div className={css.meta}>
              <span>
                <Icon name="pin" size={13} /> {PROFILE.location}
              </span>
              <span>
                <StatusDot /> {PROFILE.availability}
              </span>
              <span>
                <Icon name="check" size={13} /> Replies within 24 hours
              </span>
            </div>
          </div>

          <div className={css.formCard}>
            <div className={css.formHead}>
              <p className={css.formKicker}>Start a conversation</p>
              <p className={css.formHint}>Usually replies within 24 hours.</p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  className={css.success}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={css.successIcon}>
                    <Icon name="check" size={24} />
                  </span>
                  <h3>Message sent.</h3>
                  <p>Thanks for reaching out — I'll get back to you within 24 hours.</p>
                  <Button as="button" type="button" variant="ghost" onClick={() => setStatus("idle")}>
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className={css.field}>
                    <label className={css.label} htmlFor="contact-name">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      className={css.input}
                      name="from_name"
                      value={form.from_name}
                      onChange={onChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className={css.field}>
                    <label className={css.label} htmlFor="contact-email">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      className={css.input}
                      type="email"
                      name="reply_to"
                      value={form.reply_to}
                      onChange={onChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className={css.field}>
                    <label className={css.label} htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      className={cx(css.input, css.textarea)}
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Tell me about the product, timeline, and what success looks like."
                      rows={5}
                      required
                    />
                  </div>

                  {status === "error" ? (
                    <div className={css.error} role="alert">
                      Something went wrong. Please try again, or email me directly at{" "}
                      <a href={`mailto:${data.email}`}>{data.email}</a>.
                    </div>
                  ) : null}

                  <Button
                    as="button"
                    type="submit"
                    className={css.submit}
                    disabled={status === "sending"}
                    icon={status === "sending" ? undefined : "arrowUpRight"}
                  >
                    {status === "sending" ? (
                      <>
                        <span className={css.spinner} aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>

                  <p className={css.status} aria-live="polite">
                    {status === "sending" ? "Sending your message…" : ""}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
