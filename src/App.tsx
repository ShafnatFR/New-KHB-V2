import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import GalleryPage from "./components/GalleryPage";
import EventsPage from "./components/EventsPage";
import EventDetail from "./components/EventDetail";
import ExploreEvents from "./components/ExploreEvents";
import RepositoryPage from "./components/RepositoryPage";
import RepositoryDetail from "./components/RepositoryDetail";
import SubmitTemplatePage from "./components/SubmitTemplatePage";
import RequestTemplatePage from "./components/RequestTemplatePage";
import JoinCommunityPage from "./components/JoinCommunityPage";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import React, { useState, useEffect } from "react";
import { cmsService } from "./services/api";
import { Loader2 } from "lucide-react";

export default function App() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const fetchedPages = await cmsService.getPages();
        setPages(fetchedPages);
      } catch (error) {
        console.error("CMS load pages failed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPages();
  }, []);

  // Helper to check if a specific page title exists (Case-Insensitive)
  const hasPage = (title: string) => 
    pages.some((p: any) => p.title?.toLowerCase() === title.toLowerCase());

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-slate-400 font-medium animate-pulse">Memuat Konten...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar pages={pages} />
        <main>
          <Routes>
            {/* Landing Page Route */}
            {hasPage("Landing Page") && <Route path="/" element={<Home />} />}
            
            {/* Dynamic Route Visibility based on CMS Title */}
            {hasPage("Layanan") && <Route path="/layanan" element={<Services />} />}
            {hasPage("Kontak") && <Route path="/kontak" element={<ContactUs />} />}
            {hasPage("Galeri Komunitas") && <Route path="/galeri" element={<GalleryPage />} />}
            
            {/* Routes that are currently always available or managed separately */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/explore-events" element={<ExploreEvents />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/repository/:id" element={<RepositoryDetail />} />
            <Route path="/repository/submit" element={<SubmitTemplatePage />} />
            <Route path="/repository/request" element={<RequestTemplatePage />} />
            <Route path="/join-community" element={<JoinCommunityPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
