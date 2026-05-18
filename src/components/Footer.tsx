import { Phone, Clock, MapPin, Instagram, Facebook, Youtube, Twitter, Globe, Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cmsService } from "../services/api";

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return <Instagram size={20} />;
  if (p.includes("facebook")) return <Facebook size={20} />;
  if (p.includes("youtube")) return <Youtube size={20} />;
  if (p.includes("twitter") || p.includes("x")) return <Twitter size={20} />;
  if (p.includes("linkedin")) return <Linkedin size={20} />;
  if (p.includes("github")) return <Github size={20} />;
  return <Globe size={20} />;
};

const formatWorkingHours = (hours: string) => {
  if (!hours) return "Senin - Jumat: 08:00 - 17:00 WIB";
  return hours.replace("_", ": ") + (hours.toLowerCase().includes("wib") ? "" : " WIB");
};

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Events", href: "/events" },
    // { name: "Repository", href: "/repository" },
    { name: "Gallery", href: "/galeri" },
    { name: "Contact Us", href: "/kontak" },
  ];

  const [cmsContacts, setCmsContacts] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const contactPage = pages.find((p: any) => p.slug === "kontak");
        if (contactPage) {
          const contactsBlock = contactPage.content.find((c: any) => c.type === "contacts");
          setCmsContacts(contactsBlock?.data);
        }
      } catch (error) {
        console.error("Footer CMS fetch error:", error);
      }

      try {
        const settingsData = await cmsService.getSettings();
        if (settingsData) {
          setSettings(settingsData);
        }
      } catch (error) {
        console.error("Footer settings fetch error:", error);
      }
    };
    loadCms();
  }, []);

  const defaultPhones = ["+62 812-3456-7890", "+62 898-7654-3210"];
  const phonesToRender = cmsContacts?.phone_numbers?.length ? cmsContacts.phone_numbers : defaultPhones;

  const activeSocialLinks = (settings?.social_links && settings.social_links.length > 0)
    ? settings.social_links
    : (cmsContacts?.social_links && cmsContacts.social_links.length > 0)
      ? cmsContacts.social_links
      : [];

  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={settings?.logo_url || "/logoKHB2.png"} 
                alt="KHB Bandung" 
                className="h-24 w-auto rounded-full shadow-md" 
                referrerPolicy="no-referrer" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {settings?.tagline || "Komunitas Halal Bandung (KHB) berkomitmen untuk mengakselerasi pertumbuhan UMKM melalui ekosistem ekonomi halal yang terintegrasi dan profesional."}
            </p>
            {activeSocialLinks && activeSocialLinks.length > 0 ? (
              <div className="flex gap-4">
                {activeSocialLinks.map((link: any, index: number) => {
                  const platform = link.platform || link.name || link.label || link.type || "social";
                  const url = link.url || link.href || "#";
                  return (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                      title={platform}
                    >
                      {getSocialIcon(platform)}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Navigasi</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg mb-6">Hubungi Kami</h3>
            <div className="space-y-4">
              {phonesToRender.map((phone: string, idx: number) => {
                const cleanPhone = phone.replace(/[^0-9]/g, "");
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <Phone size={18} className="text-primary mt-1" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">WhatsApp Admin {idx + 1}</p>
                      <a href={`https://wa.me/${cleanPhone}`} className="text-sm text-slate-300 hover:text-white">{phone}</a>
                    </div>
                  </div>
                );
              })}
              {cmsContacts?.emails?.map((email: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-1" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Email</p>
                    <a href={`mailto:${email}`} className="text-sm text-slate-300 hover:text-white">{email}</a>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Jam Layanan</p>
                  <p className="text-sm text-slate-300">
                    {formatWorkingHours(cmsContacts?.working_hours)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Lokasi Kami</h3>
            <div className="rounded-2xl overflow-hidden h-40 bg-slate-800 relative group">
              <iframe
                src={(() => {
                  const url = cmsContacts?.map_location_url;
                  if (!url) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.5731164!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a9440548d56a2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1713212345678!5m2!1sen!2sid";
                  if (url.includes("embed")) return url;
                  let query = "Griya Permata Asri Bandung";
                  if (url.includes("place/")) {
                    const parts = url.split("place/")[1].split("/");
                    query = decodeURIComponent(parts[0].replace(/\+/g, " "));
                  }
                  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
                })()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
              <div className="absolute bottom-2 left-2 right-2 bg-dark/80 backdrop-blur-md p-2 rounded-lg flex items-center gap-2 pointer-events-none">
                <MapPin size={14} className="text-primary" />
                <span className="text-[10px] font-bold">
                  {cmsContacts?.addresses?.[0] || "Bandung, Jawa Barat"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-medium text-slate-500">
            {settings?.copyright_text || "© 2024 Komunitas Halal Bandung (KHB). All Rights Reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}

