"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import AvailabilityCalendar from "@/components/availability-calendar";

const EMPTY = { name: "", phone: "", email: "", event_type: "", message: "" };

const formatDate = (iso) => {
  const txt = new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return txt.charAt(0).toUpperCase() + txt.slice(1);
};

const field =
  "glass w-full rounded-xl bg-black/20 px-4 py-3 text-sm text-white placeholder-white/60 outline-none backdrop-blur-md transition focus:border-white/60 focus:bg-black/30";

function StepTitle({ n, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="glass flex size-8 items-center justify-center rounded-full text-sm font-semibold">
        {n}
      </span>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

export default function Reservar() {
  const [date, setDate] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { ok: boolean, text: string }
  const [refresh, setRefresh] = useState(0);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      setStatus({ ok: false, text: "Elige una fecha en el calendario." });
      return;
    }

    setSending(true);
    setStatus(null);

    const res = await fetch("/api/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_date: date, ...form }),
    });
    const data = await res.json().catch(() => ({}));
    const error = res.ok ? null : { code: data.code };

    setSending(false);

    if (error) {
      setStatus({
        ok: false,
        text:
          error.code === "23505"
            ? "Esa fecha acaba de ser reservada. Elige otra."
            : "No se pudo enviar la solicitud. Intenta de nuevo.",
      });
      if (error.code === "23505") {
        setDate(null);
        setRefresh((n) => n + 1);
      }
      return;
    }

    setStatus({
      ok: true,
      text: "¡Solicitud enviada! Te contactaremos para confirmar tu fecha.",
    });
    setForm(EMPTY);
    setDate(null);
    setRefresh((n) => n + 1); // recarga el calendario
  };

  return (
    <>
      {/* Fondo con el mismo degradado del hero */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute top-80 left-2/5 size-130 -translate-x-1/2 rounded-full bg-[#D10A8A] blur-[100px]" />
        <div className="absolute top-80 right-0 size-130 -translate-x-1/2 rounded-full bg-[#2E08CF] blur-[100px]" />
        <div className="absolute top-0 left-1/2 size-130 -translate-x-1/2 rounded-full bg-[#EFB810] blur-[100px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-32 pb-12">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          <span className="glass rounded-full px-3 py-1 text-xs font-medium">
            Agenda 2026 - 2027
          </span>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            Elige la fecha de tu evento
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80 md:text-base">
            Selecciona un día disponible y déjanos tus datos. Te contactaremos
            por WhatsApp para confirmar tu reserva.
          </p>
        </motion.div>

        <div className="mt-12 grid w-full gap-6 lg:grid-cols-2 lg:items-start">
          {/* Paso 1: fecha */}
          <motion.section
            className="glass rounded-3xl bg-black/25 p-5 backdrop-blur-xl sm:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <StepTitle n={1} title="Elige tu fecha" />
            <AvailabilityCalendar
              key={refresh}
              selected={date}
              onSelect={setDate}
            />
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
              <CalendarDays className="size-5 shrink-0" />
              {date ? (
                <span>
                  <span className="text-white/60">Fecha elegida: </span>
                  <b className="font-semibold">{formatDate(date)}</b>
                </span>
              ) : (
                <span className="text-white/60">Aún no eliges una fecha</span>
              )}
            </div>
          </motion.section>

          {/* Paso 2: datos */}
          <motion.section
            className="glass rounded-3xl bg-black/25 p-5 backdrop-blur-xl sm:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <StepTitle n={2} title="Tus datos" />
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Nombre completo"
                aria-label="Nombre completo"
                required
                className={field}
              />
              <div>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Teléfono / WhatsApp"
                  aria-label="Teléfono o WhatsApp"
                  required
                  className={field}
                />
                <p className="mt-1.5 px-1 text-xs text-white/70">
                  Usaremos este número para confirmar tu reserva por WhatsApp.
                </p>
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="Correo (opcional)"
                aria-label="Correo (opcional)"
                className={field}
              />
              <select
                name="event_type"
                value={form.event_type}
                onChange={onChange}
                aria-label="Tipo de evento"
                className={`${field} [&>option]:text-black`}
              >
                <option value="">Tipo de evento</option>
                <option>Boda</option>
                <option>Cumpleaños</option>
                <option>Quinceañero</option>
                <option>Corporativo</option>
                <option>Otro</option>
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Cuéntanos más (invitados, horario, etc.)"
                aria-label="Mensaje"
                rows={3}
                className={`${field} resize-none`}
              />

              {/* Paso 3 (próximo): código de verificación por WhatsApp.
                  Se insertará aquí, antes del botón de envío. */}

              <button
                type="submit"
                disabled={sending}
                className="btn mt-2 w-full border border-white/30 bg-pink-600/60 backdrop-blur-md hover:bg-pink-600/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Solicitar fecha"}
              </button>

              {status && (
                <p
                  role="status"
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    status.ok
                      ? "border-green-400/40 bg-green-500/15 text-green-200"
                      : "border-red-400/40 bg-red-500/15 text-red-200"
                  }`}
                >
                  {status.text}
                </p>
              )}
            </form>
          </motion.section>
        </div>
      </main>
    </>
  );
}
