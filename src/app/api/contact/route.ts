import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name: string;
  method: string;
  handle: string;
  role?: string;
  message: string;
};

function esc(value: string) {
  return value
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

function buildMessage(p: Payload) {
  const lines = [
    "<b>🏢 New contact request</b>",
    "──────────────",
    `<b>Name / Company:</b> ${esc(p.name || "—")}`,
    `<b>Preferred contact:</b> ${esc(p.method || "—")}`,
    `<b>Contact handle:</b> ${esc(p.handle || "—")}`,
    p.role?.trim()
      ? `<b>Role / requirements:</b> ${esc(p.role.trim())}`
      : "",
    `<b>Message:</b>`,
    `<i>${esc(p.message || "—")}</i>`,
    "──────────────",
    "<i>Sent from soemoekyaw.dev portfolio</i>",
  ];
  return lines.filter(Boolean).join("\n");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Telegram bot is not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables." },
      { status: 500 }
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body.name?.trim() || !body.handle?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, contact and message are required." },
      { status: 400 }
    );
  }

  const payload = {
    chat_id: chatId,
    text: buildMessage({
      name: body.name.trim(),
      method: body.method || "Not specified",
      handle: body.handle.trim(),
      role: body.role?.trim() || undefined,
      message: body.message.trim(),
    }),
    parse_mode: "HTML",
  };

  // Create AbortController with 10 second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return NextResponse.json(
        { ok: false, error: "Bot could not deliver the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { ok: false, error: "Request timeout while contacting Telegram. Please try again." },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { ok: false, error: "Network error while contacting Telegram." },
      { status: 502 }
    );
  }
}