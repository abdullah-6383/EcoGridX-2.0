"use client";

import { useEffect } from 'react';
import BackgroundEffects from '@/components/landing/BackgroundEffects';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Metrics from '@/components/landing/Metrics';
import Technology from '@/components/landing/Technology';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  useEffect(() => {
    // Ensure page starts at top on load/reload
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <Features />
      <Metrics />
      <Technology />
      <CTA />
      <Footer />
    </main>
  );
}