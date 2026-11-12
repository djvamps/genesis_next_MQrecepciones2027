import SectionTitle from "@/components/section-title";
import { CheckIcon, CrownIcon, RocketIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function PricingPlans() {
  const ref = useRef([]);
  const data = [
    {
      icon: RocketIcon,
      title: "Esencial",
      description:
        "Perfecto para celebraciones familiares, bautizos o cumples acogedores",
      price: "$199",
      buttonText: "Cotizar Esencial",
      features: [
        "Uso del salón por horas acordadas",
        "Mobiliario básico elegante (sillas y mesas vestidas)",
        "Vajilla y cristalería completa",
        "Equipo de sonido básico e iluminación ambiental",
        "Personal de coordinación y protocolo",
        "Community resources",
      ],
    },
    {
      icon: ZapIcon,
      title: "Más Popular",
      description:
        "La solución completa con banquete, decoración temática y animación.",
      price: "$350",
      mostPopular: true,
      buttonText: "Elegir Paquete Integral",
      features: [
        "Todo lo incluido en el Paquete Esencial",
        "Decoración temática personalizada y arreglo floral",
        "Servicio de catering (Cena o buffet y estación de bebidas)",
        "Maestro de ceremonias / Animación profesional",
        "DJ, luces robóticas y efectos especiales (humo/chisperos)",
        "Cobertura de protocolo completa de principio a fin",
      ],
    },
    {
      icon: CrownIcon,
      title: "Experiencia Total",
      description:
        "Máxima exclusividad, detalles de lujo y atención personalizada dedicada.",
      price: "$550",
      buttonText: "Contactar Asesor VIP",
      features: [
        "Todo lo incluido en el Paquete Integral",
        "Decoración de lujo con arreglos florales premium",
        "Barra libre de cocteles y atención de mozos preferencial",
        "Pastel de celebración personalizado de varios pisos",
        "Producción audiovisual completa (fotografía y video profesional)",
        "Coordinador exclusivo asignado solo para tu evento",
      ],
    },
  ];

  return (
    <section className="mt-32">
      <SectionTitle
        title="Nuestros Paquetes"
        description="Elige el plan ideal para tu celebración. Todo lo que necesitas en un solo lugar, diseñado para hacer de tu evento un momento inolvidable."
      />

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="group w-full max-w-80 glass p-6 rounded-xl hover:-translate-y-0.5"
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
            ref={(el) => (ref.current[index] = el)}
            onAnimationComplete={() => {
              const card = ref.current[index];
              if (card) {
                card.classList.add("transition", "duration-300");
              }
            }}
          >
            <div className="flex items-center w-max ml-auto text-xs gap-2 glass rounded-full px-3 py-1">
              <item.icon className="size-3.5" />
              <span>{item.title}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold">
              {item.price} <span className="text-sm font-normal">/month</span>
            </h3>
            <p className="text-gray-200 mt-3">{item.description}</p>
            <button
              className={`mt-7 rounded-md w-full btn ${item.mostPopular ? "bg-white text-gray-800" : "glass"}`}
            >
              {item.buttonText}
            </button>
            <div className="mt-6 flex flex-col">
              {item.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 py-2">
                  <div className="rounded-full glass border-0 p-1">
                    <CheckIcon className="size-3 text-white" strokeWidth={3} />
                  </div>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
