import { useState } from "react";
import GlobalStyles from "./components/GlobalStyles";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import AIDemoSection from "./components/AIDemoSection";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GlobalStyles />

      {/* Loading screen — shows on first visit, fades out when done */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{
        position: "relative", minHeight: "100vh", background: "var(--dark)",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease 0.1s",
      }}>
        <Background />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AIDemoSection />
        </div>
      </div>
    </>
  );
}