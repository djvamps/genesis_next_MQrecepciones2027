import { motion } from "framer-motion";
import SectionTitle from "@/components/section-title";
import { ExternalLinkIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Cuéntanos tu visión",
    description:
      "Comparte con nosotros la fecha estimada, el tipo de celebración (boda, quince años, evento corporativo) y cuántos invitados deseas recibir.",
    link: "https://prebuiltui.com/tailwind-templates",
    image: "/assets/workflow1.png",
  },
  {
    id: 2,
    title: "Personaliza cada detalle",
    description:
      "Elige el estilo de decoración, los menús de catering, la iluminación y los servicios adicionales que harán que tu evento sea único.",
    link: "https://prebuiltui.com/tailwind-templates",
    image: "/assets/workflow2.png",
  },
  {
    id: 3,
    title: "Celebra sin preocupaciones",
    description:
      "Relájate y disfruta de tu gran día mientras nuestro equipo coordina cada protocolo, tiempo y detalle en tiempo real.",
    link: "https://prebuiltui.com/tailwind-templates",
    image: "/assets/workflow3.png",
  },
];

export default function WorkflowSteps() {
  return (
    <section className="mt-32 relative">
      <SectionTitle
        title="De la idea a la fiesta de tus sueños en pocos pasos."
        description="Cuéntanos qué tipo de evento tienes en mente y nuestro equipo de asesores se encargará de darle forma con presupuestos transparentes."
      />

      <motion.div
        className="relative space-y-20 md:space-y-30 mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-col items-center hidden md:flex absolute left-1/2 -translate-x-1/2">
          <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
            01
          </p>
          <div className="h-72 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent" />
          <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
            02
          </p>
          <div className="h-72 w-0.5 bg-gradient-to-b from-transparent via-white to-transparent" />
          <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
            03
          </p>
        </div>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-center gap-6 md:gap-20 ${index % 2 !== 0 ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"}`}
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
            <img
              src={step.image}
              alt="step"
              className="flex-1 h-auto w-full max-w-sm rounded-2xl"
            />
            <div
              key={index}
              className="flex-1 flex flex-col gap-6 md:px-6 max-w-md"
            >
              <h3 className="text-2xl font-medium text-white">{step.title}</h3>
              <p className="text-gray-100 text-sm/6 line-clamp-3 pb-2">
                {step.description}
              </p>
              <a href={step.link} className="flex items-center gap-2">
                Reservar Fecha
                <ExternalLinkIcon className="size-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
