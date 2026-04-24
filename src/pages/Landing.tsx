import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Subscription from "../components/Subscription";
import CharityImpact from "../components/CharityImpact";
import DrawSystem from "../components/DrawSystem";
import DashboardPreview from "../components/DashboardPreview";
import SocialProof from "../components/SocialProof";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Landing() {
  useEffect(() => {
    // Smoother scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as any);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as any);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-purple selection:text-white">
      {/* Global Background Grid */}
      <div className="bg-mesh" />
      
      {/* Decorative Top Gradient */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-purple/5 to-transparent pointer-events-none z-0" />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <DrawSystem />
        <CharityImpact />
        <DashboardPreview />
        <SocialProof />
        <Subscription />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
