"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const pad = (n) => String(n).padStart(2, "0");
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

export default function AvailabilityCalendar({ onSelect, selected }) {
  const today = new Date();
  const todayISO = toISO(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [busy, setBusy] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .rpc("get_unavailable_dates", {
        p_from: toISO(year, month, 1),
        p_to: toISO(year, month, daysInMonth),
      })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError("No se pudo cargar la disponibilidad.");
        } else {
          setBusy(
            Object.fromEntries(
              (data ?? []).map((r) => [r.event_date, r.status]),
            ),
          );
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year, month, daysInMonth]);

  const go = (delta) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const navBtn =
    "glass flex size-10 items-center justify-center rounded-full transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white/10";

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={isCurrentMonth}
          className={navBtn}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="font-semibold">
          {MESES[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          className={navBtn}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-white/60">
        {DIAS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div
        className={`mt-1 grid grid-cols-7 gap-1.5 transition-opacity ${loading ? "opacity-50" : ""}`}
      >
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />;

          const iso = toISO(year, month, day);
          const status = busy[iso];
          const isPast = iso < todayISO;
          const isToday = iso === todayISO;
          const disabled = isPast || Boolean(status);
          const isSelected = selected === iso;

          let style =
            "bg-white/10 text-white hover:scale-105 hover:bg-white/25";
          if (isPast) style = "text-white/25";
          else if (status === "pre_reserva")
            style = "bg-amber-400/20 text-amber-200";
          else if (status) style = "bg-red-500/20 text-red-200 line-through";
          if (isSelected) style = "bg-white font-semibold text-black";

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onSelect?.(iso)}
              title={
                status === "pre_reserva"
                  ? "En espera de confirmación"
                  : status
                    ? "Ocupado"
                    : isPast
                      ? "Fecha pasada"
                      : "Disponible"
              }
              className={`aspect-square rounded-xl text-sm transition ${style} ${isToday && !isSelected ? "ring-1 ring-white/60" : ""} ${disabled ? "cursor-not-allowed" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-full bg-white/70" />
          Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-full bg-amber-300" />
          En espera
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block size-2 rounded-full bg-red-400" />
          Ocupado
        </span>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
