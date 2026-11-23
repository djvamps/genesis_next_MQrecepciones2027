import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Faltan variables de entorno de Supabase");
    return NextResponse.json({ code: "server_config" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "invalid_json" }, { status: 400 });
  }

  const { event_date, name, phone, email, event_type, message } = body;

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

  // Correos: si fallan o falta configuración, la reserva ya quedó guardada
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (apiKey && from) {
    const resend = new Resend(apiKey);

    if (notifyEmail) {
      try {
        await resend.emails.send({
          from,
          to: notifyEmail,
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
  } else {
    console.warn(
      "Omitiendo envío de correos: falta RESEND_API_KEY o MAIL_FROM",
    );
  }

  return NextResponse.json({ ok: true });
}
