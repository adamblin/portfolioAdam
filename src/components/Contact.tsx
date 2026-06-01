import { useEffect, useRef, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [noticeMsg, setNoticeMsg] = useState<string>("");

  useEffect(() => {
    if (status === "error" && errorRef.current) {
      errorRef.current.focus();
    }
  }, [status]);

  const getFormParams = () => {
    const form = formRef.current;
    const data = form ? new FormData(form) : new FormData();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    return { name, email, message };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { name, email, message } = getFormParams();

    const to = contactEmail || "";
    const subject = encodeURIComponent(`Portfolio contact from ${name || "(no name)"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name || "(no name)"} ${email ? `(${email})` : ""}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    // Si hay endpoint de Formspree, enviar por ahí
    if (formspreeEndpoint) {
      try {
        setStatus("sending");
        setErrorMsg("");
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ name, email, message })
        });
        if (res.ok) {
          setStatus("sent");
          formRef.current?.reset();
          return;
        } else {
          const text = await res.text();
          setStatus("error");
          setErrorMsg(text || "Failed to send. Please try an alternative below.");
          return;
        }
      } catch {
        setStatus("error");
        setErrorMsg("Network error. Please try an alternative below.");
        return;
      }
    }

    // Fallback a mailto si no hay Formspree
    if (!to) {
      if (import.meta.env.DEV) {
        setNoticeMsg("Dev: set VITE_CONTACT_EMAIL or VITE_FORMSPREE_ENDPOINT in .env to enable sending.");
      }
      return;
    }

    // Abrir cliente de email
    try {
      const a = document.createElement("a");
      a.href = mailto;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.location.href = mailto;
    }

    setNoticeMsg("Opening your default mail client...");
  };

  const openGmail = () => {
    const { name, email, message } = getFormParams();
    const to = encodeURIComponent(contactEmail || "");
    const subject = encodeURIComponent(`Portfolio contact from ${name || "(no name)"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name || "(no name)"} ${email ? `(${email})` : ""}`);
    const url = `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`;
    window.open(url, "_blank");
  };

  const openOutlook = () => {
    const { name, email, message } = getFormParams();
    const to = encodeURIComponent(contactEmail || "");
    const subject = encodeURIComponent(`Portfolio contact from ${name || "(no name)"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name || "(no name)"} ${email ? `(${email})` : ""}`);
    const url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${to}&subject=${subject}&body=${body}`;
    window.open(url, "_blank");
  };

  const copyEmail = async () => {
    if (!contactEmail) {
      setNoticeMsg("No contact email configured yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(contactEmail);
      setNoticeMsg("Email copied to clipboard.");
    } catch {
      setNoticeMsg(`Unable to copy automatically. Email: ${contactEmail}`);
    }
  };

  return (
    <article className="contact-card">
      <div className="contact-grid">
        <div className="contact-form-section" data-reveal>
          <h3 className="contact-heading">Send me a message</h3>
          <p className="form-required-note"><span aria-hidden="true">*</span> Required fields</p>
          <form
            className="contact-form"
            method="POST"
            action={formspreeEndpoint || undefined}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="form-row" data-reveal data-reveal-delay="80">
              <label htmlFor="name">Name <span className="required-mark" aria-hidden="true">*</span></label>
              <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
            </div>
            <div className="form-row" data-reveal data-reveal-delay="140">
              <label htmlFor="email">Email <span className="required-mark" aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </div>
            <div className="form-row" data-reveal data-reveal-delay="200">
              <label htmlFor="message">Message <span className="required-mark" aria-hidden="true">*</span></label>
              <textarea id="message" name="message" placeholder="Write your message here..." rows={5} autoComplete="off" required />
            </div>
            <div className="form-actions" data-reveal data-reveal-delay="260">
              <button type="submit" className={`send-button${status === "sending" ? " is-loading" : ""}`} disabled={status === "sending"}>
                {formspreeEndpoint ? (status === "sending" ? "Sending…" : status === "sent" ? "✓ Sent" : "Send") : "Send Email"}
              </button>
              <button type="button" className="social-button gmail" onClick={openGmail}>Gmail</button>
              <button type="button" className="social-button outlook" onClick={openOutlook}>Outlook</button>
              <button type="button" className="social-button" onClick={copyEmail}>Copy email</button>
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="contact-hint" style={{textDecoration:"none"}}>
                  Having trouble? Click here to open your mail client.
                </a>
              )}
              {!contactEmail && import.meta.env.DEV && (
                <p className="contact-hint">
                  Dev: set <code>VITE_CONTACT_EMAIL</code> in <code>.env</code> to enable sending.
                </p>
              )}
              <div aria-live="polite" aria-atomic="true">
                {status === "sent" && (
                  <p className="contact-hint contact-status contact-status--success">Thanks! Your message was sent.</p>
                )}
                {status === "error" && (
                  <p ref={errorRef} tabIndex={-1} className="contact-hint contact-status contact-status--error" role="alert">{errorMsg}</p>
                )}
                {noticeMsg && status !== "error" && (
                  <p className="contact-hint contact-status contact-status--info">{noticeMsg}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
}
