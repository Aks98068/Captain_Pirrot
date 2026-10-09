"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";

const CATEGORIES = ["General", "Research", "Collaboration", "Security Report", "Project", "Community", "Other"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setState("sending");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f.entries())),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setRef(json.reference);
      setState("sent");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="form-success">
        <span>✓</span>
        <h2>Message received.</h2>
        <p>
          Thank you for the clear context. Your reference is <b>{ref}</b>. A member of the collective will review it
          shortly.
        </p>
        <button className="btn btn-secondary" type="button" onClick={() => setState("idle")}>
          <span>SEND ANOTHER MESSAGE</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="field-pair">
        <label>
          YOUR NAME
          <input name="name" required maxLength={120} placeholder="Name or organization" />
        </label>
        <label>
          EMAIL ADDRESS
          <input name="email" required type="email" maxLength={200} placeholder="you@example.com" />
        </label>
      </div>
      <div className="field-pair">
        <label>
          SUBJECT
          <input name="subject" required maxLength={200} placeholder="How can we help?" />
        </label>
        <label>
          CATEGORY
          <select name="category" required defaultValue="">
            <option disabled value="">
              Select category
            </option>
            {CATEGORIES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        MESSAGE
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={8}
          placeholder="Include relevant context, scope, and any time sensitivity."
        />
      </label>
      {/* honeypot: real visitors never see or fill this */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
      {error && <p className="form-error">{error}</p>}
      <div className="form-foot">
        <p>By submitting, you agree not to include passwords, private keys, or unnecessary personal data.</p>
        <Button type="submit">{state === "sending" ? "SENDING…" : "SEND MESSAGE"}</Button>
      </div>
    </form>
  );
}
