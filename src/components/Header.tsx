"use client";

import React, { useState } from "react";
import { companyData } from "@/data/cristofanettiData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Menu, X, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenQuote: () => void;
}

export function Header({ onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Servizi", href: "#servizi" },
    { label: "GPL & Metano", href: "#confronto" },
    { label: "Collaudo Bombole", href: "#normative" },
    { label: "Simulatore", href: "#simulatore" },
    { label: "Partner BRC", href: "#brc" },
    { label: "Chi Siamo", href: "#storia" },
    { label: "Contatti", href: "#contatti" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top emergency / quick info bar */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              {companyData.brcBadge}
            </span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              Lun-Ven: 08-12 / 14-19
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${companyData.phone}`}
              className="flex items-center gap-1 font-semibold text-white hover:text-red-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              {companyData.phoneDisplay}
            </a>
            <span className="hidden md:inline-block text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5" />
              {companyData.address}, {companyData.city}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Workshop Brand */}
          <a href="#" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                CRISTOFANETTI
              </span>
              <Badge variant="accent" className="text-[10px] uppercase font-bold py-0.5 px-2">
                Dal 1964
              </Badge>
            </div>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Impianti Gas Auto &bull; Forlì
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              onClick={onOpenQuote}
              variant="accent"
              size="default"
              className="font-semibold shadow-sm"
            >
              Richiedi Preventivo
            </Button>
            <a href={`tel:${companyData.phone}`}>
              <Button variant="outline" size="default" className="font-semibold gap-2 border-slate-300">
                <Phone className="w-4 h-4 text-brand-accent" />
                Chiama Ora
              </Button>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              variant="accent"
              className="w-full justify-center"
            >
              Richiedi Preventivo Impianto
            </Button>
            <a href={`tel:${companyData.phone}`} className="w-full">
              <Button variant="outline" className="w-full justify-center gap-2">
                <Phone className="w-4 h-4 text-brand-accent" />
                Chiama {companyData.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
