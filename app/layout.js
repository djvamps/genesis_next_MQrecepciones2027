import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis-scroll";
import { Analytics } from "@/components/analytics";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://mq-recepciones2027.netlify.app/  "), // Reemplaza con tu dominio real
  title: {
    default: "MQ - Recepciones y Eventos | Locales y Paquetes para Fiestas",
    template: "%s | MQ - Recepciones y Eventos",
  },
  description:
    "Realizamos eventos: fiesta de 15 años, bodas, promociones, baby shower, cumpleaños y fiestas infantiles. Visítanos y solicita nuestros paquetes de ofertas para hacer realidad tus momentos inolvidables.",
  icons: {
    icon: "/mq-icono.svg", // Cambia a .png si tu archivo es PNG
    shortcut: "/mq-icono.svg",
    apple: "/mq-icono.svg",
  },
  keywords: [
    "recepciones y eventos",
    "local para fiesta de 15 años",
    "local para bodas",
    "organización de eventos",
    "paquetes para fiestas",
    "baby shower",
    "promociones escolares",
  ],
  authors: [{ name: "MQ Recepciones y Eventos" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://mq-recepciones2027.netlify.app/",
    siteName: "MQ - Recepciones y Eventos",
    title:
      "MQ - Recepciones y Eventos | Haz realidad tus momentos inolvidables",
    description:
      "Especialistas en 15 años, bodas, promociones, baby shower y cumpleaños. Solicita nuestros paquetes todo incluido.",
    images: [
      {
        url: "/mq_face.png", // Coloca una imagen de 1200x630px en /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "MQ - Recepciones y Eventos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MQ - Recepciones y Eventos",
    description:
      "Realizamos eventos: 15 años, bodas, promociones, baby shower y cumpleaños.",
    images: ["/mq_face.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: "MQ - Recepciones y Eventos",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={poppins.variable}>
      <LenisScroll />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
