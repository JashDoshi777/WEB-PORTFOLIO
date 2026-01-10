import Navigation from "@/components/Navigation";
import PortfolioScroll from "@/components/PortfolioScroll";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/SplashCursor.jsx";

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      {/* Splash Cursor Effect */}
      <SplashCursor />

      {/* Navigation */}
      <Navigation />

      {/* Hero - Scroll Animation */}
      <PortfolioScroll />

      {/* About Section */}
      <AboutSection />

      {/* Education & Experience Timeline */}
      <TimelineSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
