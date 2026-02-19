"use client";

import { useState } from "react";
import { ParticleField } from "@/components/landing/particle-field";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { AIDemoSection } from "@/components/landing/ai-demo-section";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  const [logoLanded, setLogoLanded] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <ParticleField />
      <Navbar logoLanded={logoLanded} />
      <HeroSection onLogoLanded={() => setLogoLanded(true)} />
      <FeaturesSection />
      <HowItWorksSection />
      <AIDemoSection />
      <CTASection />
    </main>
  );
}
