"use client";

import { motion } from "framer-motion";

// Código de país + número, sin "+", espacios ni guiones. Ej: 51987654321
const WHATSAPP_NUMBER = "51992870423";
const MESSAGE = "Hola, quisiera cotizar un evento en MQ Recepciones.";

export default function WhatsappButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110 sm:right-6 sm:bottom-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/whatsapp.svg" alt="" className="size-8" />
    </motion.a>
  );
}
