"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand, Sparkles } from "lucide-react";

const CATEGORIES = ["Todos", "Bodas", "15 Años", "Corporativos", "Salones"];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Ceremonia & Gala Nocturna",
    category: "Bodas",
    span: "md:col-span-2 md:row-span-2",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mesa Principal & Arreglos Florales",
    category: "Bodas",
    span: "md:col-span-1 md:row-span-1",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Iluminación LED & Pista Central",
    category: "15 Años",
    span: "md:col-span-1 md:row-span-1",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Salón Imperial — Capacidad 300 Invitados",
    category: "Salones",
    span: "md:col-span-2 md:row-span-1",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Cena Ejecutiva & Conferencias",
    category: "Corporativos",
    span: "md:col-span-1 md:row-span-1",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Recepción de Bienvenida & Cocktail",
    category: "15 Años",
    span: "md:col-span-1 md:row-span-1",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "Todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="galeria"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-orange-500/15 via-purple-600/15 to-transparent blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-orange-300 border border-white/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Momentos Inolvidables
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Nuestra Galería de Eventos
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/90">
            Explora nuestras ambientaciones, iluminación profesional y montajes
            diseñados a medida para cada celebración.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="galleryActiveFilter"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/80 to-pink-600/80 border border-white/20 -z-10"
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer ${
                  activeCategory === "Todos"
                    ? item.span
                    : "md:col-span-1 md:row-span-1"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Expand className="w-4 h-4" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-orange-300 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/15 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar vista previa"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[75vh] object-contain bg-black"
              />

              <div className="p-5 flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="text-xs font-medium text-orange-400">
                    {selectedImage.category}
                  </span>
                  <h4 className="text-lg font-semibold text-white">
                    {selectedImage.title}
                  </h4>
                </div>
                <a
                  href="#docs"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
                >
                  Cotizar este estilo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
