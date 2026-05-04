import React from "react";
import { MapPin } from "lucide-react";

interface ContactMapProps {
  cmsData: any;
}

export const ContactMap: React.FC<ContactMapProps> = ({ cmsData }) => {
  const getEmbedUrl = () => {
    const url = cmsData?.contacts?.map_location_url;
    if (!url) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.839833230495!2d107.6094!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e630d00f339b%3A0x401576d14fed120!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";
    if (url.includes("embed")) return url;
    let query = "Griya Permata Asri Bandung";
    if (url.includes("place/")) {
      const parts = url.split("place/")[1].split("/");
      query = decodeURIComponent(parts[0].replace(/\+/g, " "));
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group relative">
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
          <iframe
            src={getEmbedUrl()}
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <a 
            href={cmsData?.contacts?.map_location_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl text-dark font-bold text-sm flex items-center gap-2 hover:bg-primary hover:text-white transition-all z-20"
          >
            <MapPin size={18} />
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};
