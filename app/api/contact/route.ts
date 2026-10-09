import { NextResponse } from "next/server";
import { dbConfigured, getPool } from "@/lib/db";

export const runtime = "nodejs";

const CATEGORIES = ["General", "Research", "Collaboration", "Security Report", "Project", "Community", "Other"];
const hits = new Map<string, number[]>(); // naive per-IP limiter: 5 messages / 10 minutes
const fail = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof b.website === "string" && b.website.trim()) return NextResponse.json({ reference: "CP-0000-0000" });

  const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const name = s("name"), email = s("email"), subject = s("subject"), category = s("category"), message = s("message");

  if (!name || name.length > 120) return fail(400, "Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return fail(400, "Please enter a valid email address.");
  if (!subject || subject.length > 200) return fail(400, "Please enter a subject.");
  if (!CATEGORIES.includes(category)) return fail(400, "Please choose a category.");
  if (message.length < 10 || message.length > 5000) return fail(400, "Message must be between 10 and 5000 characters.");

  const ip = (req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return fail(429, "Too many messages. Please try again later.");
  hits.set(ip, [...recent, now]);

  if (!dbConfigured) return fail(503, "Message storage is not configured yet. Please email us directly instead.");

  try {
    const [r] = await getPool().execute(
      "INSERT INTO contact_messages (name,email,subject,category,message,ip) VALUES (?,?,?,?,?,?)",
      [name, email, subject, category, message, ip.slice(0, 64)],
    );
    const id = (r as { insertId: number }).insertId;
    return NextResponse.json({ reference: `CP-${new Date().getFullYear()}-${String(id).padStart(4, "0")}` });
  } catch (err) {
    console.error("[contact] insert failed:", (err as Error).message);
    return fail(500, "Could not save your message. Please try again shortly.");
  }
}
