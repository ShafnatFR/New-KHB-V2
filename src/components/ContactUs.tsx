import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { cmsService } from "../services/api";
import { ContactSkeleton } from "./shared/ContactSkeletons";
import { ContactHero } from "./contact/ContactHero";
import { ContactForm } from "./contact/ContactForm";
import { ContactInfo } from "./contact/ContactInfo";
import { ContactMap } from "./contact/ContactMap";
import { ContactModals } from "./contact/ContactModals";

export default function ContactUs() {
  const [cmsData, setCmsData] = useState<{ hero: any; contacts: any; slider: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<null | "selection" | "form-result">(null);
  const [selectedChannel, setSelectedChannel] = useState<"wa" | "email">("wa");

  const [formState, setFormState] = useState({
    name: "",
    subject: "",
    message: "",
    method: "wa" as "wa" | "email"
  });

  useEffect(() => {
    if (cmsData?.slider && cmsData.slider.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cmsData.slider.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [cmsData?.slider]);

  useEffect(() => {
    const loadCms = async () => {
      try {
        const pages = await cmsService.getPages();
        const contactPage = pages.find((p: any) => p.slug === "kontak");
        if (contactPage) {
          const heroBlock = contactPage.content.find((c: any) => c.type === "hero");
          const sliderBlock = contactPage.content.find((c: any) => c.type === "activity-slider");
          const contactsBlock = contactPage.content.find((c: any) => c.type === "contacts");

          setCmsData({
            hero: heroBlock?.data,
            slider: sliderBlock?.data?.activities || [],
            contacts: contactsBlock?.data
          });
        }
      } catch (error) {
        console.error("Contact CMS fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCms();
  }, []);

  if (loading) return <ContactSkeleton />;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedChannel(formState.method);
    setActiveModal("form-result");
  };

  const getWaLink = (phone: string, isFromForm = false) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let message = "";
    if (isFromForm) {
      message = encodeURIComponent(
        `📌 *PESAN BARU DARI WEBSITE KHB*\n\n*Nama:* ${formState.name}\n*Subjek:* ${formState.subject}\n\n*Pesan:*\n${formState.message}\n\n---`
      );
    } else {
      message = encodeURIComponent("Halo KHB, saya ingin berkonsultasi mengenai sertifikasi halal.");
    }
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const getEmailLink = (email: string, isFromForm = false) => {
    if (isFromForm) {
      const body = encodeURIComponent(
        `Halo Tim KHB,\n\nSaya ${formState.name} ingin menyampaikan pesan berikut:\n\n${formState.message}\n\nTerima kasih.`
      );
      return `mailto:${email}?subject=${encodeURIComponent("[Web Inquiry] " + formState.subject)}&body=${body}`;
    }
    return `mailto:${email}`;
  };

  const contactInfoData = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Telepon / WhatsApp",
      details: cmsData?.contacts?.phone_numbers?.length ? cmsData.contacts.phone_numbers : ["+62 812-3456-7890", "+62 812-9876-5432"],
      action: "Hubungi Sekarang",
      onClick: () => {
        setSelectedChannel("wa");
        setActiveModal("selection");
      }
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email Resmi",
      details: cmsData?.contacts?.emails?.length ? cmsData.contacts.emails : ["info@khb-bandung.com", "support@khb-bandung.com"],
      action: "Kirim Email",
      onClick: () => {
        setSelectedChannel("email");
        setActiveModal("selection");
      }
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Lokasi Kantor",
      details: cmsData?.contacts?.addresses?.length > 0 
        ? cmsData.contacts.addresses 
        : (cmsData?.contacts?.map_location_url 
            ? [
                (() => {
                  const url = cmsData.contacts.map_location_url;
                  const match = url.match(/place\/([^\/]+)/);
                  if (match && match[1]) {
                    return decodeURIComponent(match[1].replace(/\+/g, " "));
                  }
                  return "Lokasi Komunitas";
                })(),
                "Bandung, Jawa Barat"
              ]
            : ["Bandung, Jawa Barat"]),
      action: "Lihat di Maps",
      link: cmsData?.contacts?.map_location_url || "#"
    }
  ];

  const workingHours = cmsData?.contacts?.working_hours?.split("_") || ["Senin - Jumat", "08:00 - 17:00"];

  return (
    <div className="pt-20">
      <ContactHero 
        cmsData={cmsData} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex}
        setSelectedChannel={setSelectedChannel}
        setActiveModal={setActiveModal}
      />

      <section id="contact-form" className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <ContactForm 
              formState={formState} 
              setFormState={setFormState} 
              onSubmit={handleFormSubmit} 
            />
            <ContactInfo 
              contactInfo={contactInfoData} 
              workingHours={workingHours}
              setSelectedChannel={setSelectedChannel}
              setActiveModal={setActiveModal}
            />
          </div>
        </div>
      </section>

      <ContactMap cmsData={cmsData} />

      <ContactModals 
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        cmsData={cmsData}
        getWaLink={getWaLink}
        getEmailLink={getEmailLink}
        workingHours={workingHours}
      />
    </div>
  );
}
