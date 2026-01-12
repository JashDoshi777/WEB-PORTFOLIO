import Navigation from "@/components/Navigation";
import PortfolioScroll from "@/components/PortfolioScroll";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TimelineSection from "@/components/TimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import RevealFooter from "@/components/RevealFooter";
import SplashCursor from "@/components/SplashCursor.jsx";

export default function Home() {
  return (
    <>
      {/* Main content that scrolls over the footer */}
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
      </main>

      {/* Reveal Footer - Uses clip-path for reveal animation */}
      <div id="contact">
        <RevealFooter />
      </div>
    </>
  );
}


