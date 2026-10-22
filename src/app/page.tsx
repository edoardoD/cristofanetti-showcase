"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { GasDeepDive } from "@/components/GasDeepDive";
import { TankRegulations } from "@/components/TankRegulations";
import { AmortizationSimulator } from "@/components/AmortizationSimulator";
import { BrcPartnership } from "@/components/BrcPartnership";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { QuoteDialog } from "@/components/QuoteDialog";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Header onOpenQuote={() => setQuoteOpen(true)} />

      {/* Main Hero & Value Proposition */}
      <Hero onOpenQuote={() => setQuoteOpen(true)} />

      {/* Core Services Showcase */}
      <ServicesSection onOpenQuote={() => setQuoteOpen(true)} />

      {/* Technical Comparison: GPL vs Metano */}
      <GasDeepDive />

      {/* 10-Year Tank Expiry & Italian Regulations Accordion */}
      <TankRegulations />

      {/* Interactive Payback & Amortization Simulator (Replaces financing) */}
      <AmortizationSimulator onOpenQuote={() => setQuoteOpen(true)} />

      {/* BRC Gas Service Official Partner Credentials */}
      <BrcPartnership />

      {/* History & 60-Year Timeline "Dal 1964" */}
      <HistoryTimeline />

      {/* Location, Hours & Contact Details with Map */}
      <ContactSection onOpenQuote={() => setQuoteOpen(true)} />

      {/* Institutional Legal Footer */}
      <Footer />

      {/* Interactive Quote / Consultation Dialog */}
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </main>
  );
}
