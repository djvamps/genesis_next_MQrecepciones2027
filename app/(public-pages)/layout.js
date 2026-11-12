import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "MQ - Recepciones y Eventos",
  description:
    "Realizamos eventos ,fiesta de 15 años, Bodas, Promociones, Baby shower, fiestas de Cumpleaños, fiestas infantiles, visítanos y solicita los paquetes de ofertas para que disfrutes y hagas realidad tus momentos inolvidables.",
  appleWebApp: {
    title: "MQ - Recepciones y Eventos",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
