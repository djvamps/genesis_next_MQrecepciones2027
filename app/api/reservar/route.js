import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req) {
  const { event_date, name, phone, email, event_type, message } =
    await req.json();

  if (!event_date || !name || !phone) {
    return NextResponse.json({ code: "invalid" }, { status: 400 });
  }

  const { error } = await supabase.from("reservas").insert({
    event_date,
    name,
    phone,
    email: email || null,
    event_type: event_type || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json(
      { code: error.code },
      { status: error.code === "23505" ? 409 : 500 },
    );
  }

  // Correos: si fallan, la reserva ya quedó guardada
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.MAIL_FROM;

  try {
    await resend.emails.send({
      from,
      to: process.env.NOTIFY_EMAIL,
      subject: `Nueva pre-reserva: ${event_date}`,
      html: `
        <h2>Nueva pre-reserva</h2>
        <p><b>Fecha:</b> ${esc(event_date)}</p>
        <p><b>Nombre:</b> ${esc(name)}</p>
        <p><b>Teléfono:</b> ${esc(phone)}</p>
        <p><b>Correo:</b> ${esc(email) || "—"}</p>
        <p><b>Evento:</b> ${esc(event_type) || "—"}</p>
        <p><b>Mensaje:</b> ${esc(message) || "—"}</p>
      `,
    });
  } catch (e) {
    console.error("Error correo al dueño:", e);
  }

  if (email) {
    try {
      await resend.emails.send({
        from,
        to: email,
        subject: "Recibimos tu solicitud de fecha",
        html: `
          <p>Hola ${esc(name)},</p>
          <p>Recibimos tu solicitud para el <b>${esc(event_date)}</b>.
          Es una pre-reserva: te contactaremos pronto para confirmarla.</p>
        `,
      });
    } catch (e) {
      console.error("Error correo al cliente:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
