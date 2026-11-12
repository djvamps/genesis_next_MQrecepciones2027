import SectionTitle from "@/components/section-title";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FaqSection() {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    {
      question:
        "¿Con cuánta anticipación debo reservar la fecha para mi evento?",
      answer:
        "Te recomendamos reservar con un mínimo de 3 a 6 meses de anticipación, especialmente para fechas en temporada alta (fines de semana, meses de verano o fiestas de fin de año), para asegurar disponibilidad en tu salón preferido.",
    },
    {
      question: "¿Qué incluyen los paquetes de recepción?",
      answer:
        "Nuestros paquetes integrales suelen incluir el alquiler del salón por las horas acordadas, mobiliario elegante, vajilla, equipo de sonido e iluminación profesional, protocolo/maestro de ceremonias y servicio de catering o banquete según el tipo de celebración.",
    },
    {
      question:
        "¿Puedo personalizar la decoración y el menú de mi celebración?",
      answer:
        "¡Por supuesto! Nos adaptamos a la temática, paleta de colores y estilo que prefieras para tu boda, quinceañeros o evento corporativo. También ofrecemos opciones de menús personalizados según tus requerimientos.",
    },
    {
      question: "¿Cuál es la capacidad máxima de los salones?",
      answer:
        "ontamos con diferentes espacios y salones diseñados para albergar desde reuniones íntimas hasta grandes eventos corporativos o celebraciones con una capacidad amplia de invitados.",
    },
    {
      question: "¿Ofrecen facilidades de pago o un cronograma de cuotas?",
      answer:
        "Sí. Trabajamos con un monto inicial o seña para reservar la fecha elegida, y el saldo restante se puede fraccionar en cómodas cuotas programadas hasta antes de la fecha del evento.",
    },
    {
      question:
        "¿Puedo agendar una visita guiada para conocer los salones en persona?",
      answer:
        "¡Claro que sí! Puedes contactarnos a través de nuestro botón de WhatsApp o formulario para coordinar una cita y mostrarte nuestros salones, montajes y opciones de decoración en persona.",
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Preguntas Frecuentes"
        description="¿Tienes dudas sobre la organización de tu evento? Encuentra aquí las respuestas que necesitas."
      />
      <div className="mx-auto mt-12 space-y-4 w-full max-w-xl">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col glass rounded-md"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.15}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            <h3
              className="flex cursor-pointer hover:bg-white/10 transition items-start justify-between gap-4 p-4 font-medium"
              onClick={() => setIsOpen(isOpen === index ? null : index)}
            >
              {item.question}
              <ChevronDownIcon
                className={`size-5 transition-all shrink-0 duration-400 ${isOpen === index ? "rotate-180" : ""}`}
              />
            </h3>
            <p
              className={`px-4 text-sm/6 transition-all duration-400 overflow-hidden ${isOpen === index ? "pt-2 pb-4 max-h-80" : "max-h-0"}`}
            >
              {item.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
