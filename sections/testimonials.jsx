import SectionTitle from "@/components/section-title";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const ref = useRef([]);
  const data = [
    {
      review:
        "Nuestra boda superó todas las expectativas. La decoración, la iluminación y la atención del personal fueron impecables. No tuvimos que preocuparnos por nada el gran día.",
      name: "Valeria & Carlos",
      about: "Boda de Ensueño",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      review:
        "Organizar los 15 años de mi hija parecía complicado, pero el equipo de MQ Recepciones hizo todo muy fácil. La ambientación quedó hermosa y la música fue genial.",
      name: "Patricia M.",
      about: "Fiesta de 15 Años",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      review:
        "Excelente servicio para nuestro evento de fin de año. La puntualidad en el catering y la distribución de las instalaciones fueron perfectas para nuestro equipo.",
      name: "Roberto Gómez",
      about: "Evento Corporativo",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Celebrar nuestras Bodas de Plata aquí fue la mejor decisión. La cena estuvo deliciosa y el protocolo del evento se cumplió tal como lo coordinamos.",
      name: "Fernando & Elena",
      about: "Aniversario de Bodas",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Buscábamos un espacio acogedor y elegante para nuestra recepción íntima. La relación calidad-precio y la asesoría constante fueron excelentes.",
      name: "Lucía R.",
      about: "Boda Civil",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      review:
        "Un ambiente espectacular para nuestra fiesta de promoción. El sonido, las luces y la atención de la mozería estuvieron a la altura de la ocasión.",
      name: "Promoción 2025",
      about: "Graduación",
      rating: 5,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];
  return (
    <section className="mt-32 flex flex-col items-center">
      <SectionTitle
        title="Lo que dicen quienes ya celebraron con nosotros"
        description="Descubre las experiencias de familias y parejas que confiaron en MQ Recepciones para sus momentos más importantes."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="w-full max-w-88 space-y-5 rounded-lg glass p-5 hover:-translate-y-1"
            initial={{ y: 150, opacity: 0 }}
            ref={(el) => (ref.current[index] = el)}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: `${index * 0.15}`,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
            onAnimationComplete={() => {
              const card = ref.current[index];
              if (card) {
                card.classList.add("transition", "duration-300");
              }
            }}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{item.about}</p>
              <img
                className="size-10 rounded-full"
                src={item.image}
                alt={item.name}
              />
            </div>
            <p className="line-clamp-3">“{item.review}”</p>
            <p className="text-gray-300">- {item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
