"use client";

import React from "react";
import { companyData } from "@/data/cristofanettiData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Navigation, ExternalLink, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  onOpenQuote: () => void;
}

export function ContactSection({ onOpenQuote }: ContactSectionProps) {
  return (
    <section id="contatti" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
            Vieni a Trovarci a Forlì
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contatti, Orari e Posizione dell'Officina
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Siamo a Forlì in Via degli Scavi 5, facilmente raggiungibili dalla tangenziale e dal centro. Contattaci telefonicamente o richiedi un preventivo dettagliato.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-100 text-brand-accent">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telefono Officina</div>
                  <a
                    href={`tel:${companyData.phone}`}
                    className="text-2xl font-black text-slate-900 hover:text-brand-blue transition-colors"
                  >
                    {companyData.phoneDisplay}
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Chiamaci direttamente per prenotare la sostituzione del serbatoio GPL decennale o per un check-up dell'impianto a gas.
              </p>
            </div>

            {/* Address & Navigation Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-100 text-sky-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Indirizzo Sede</div>
                  <div className="text-lg font-bold text-slate-900">
                    {companyData.address}
                  </div>
                  <div className="text-sm text-slate-600">
                    {companyData.cap} {companyData.city} ({companyData.province})
                  </div>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  companyData.address + " " + companyData.city
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:underline pt-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                Apri su Google Maps per navigare
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Orari di Apertura</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {companyData.hours.weekdays}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {companyData.hours.saturday} &bull; {companyData.hours.sunday}
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Legal */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Email ordinaria: </span>
                <a href={`mailto:${companyData.email}`} className="text-brand-blue hover:underline font-semibold">
                  {companyData.email}
                </a>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Posta Elettronica Certificata: </span>
                <span className="font-mono text-slate-700">{companyData.pec}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-200">
                Partita IVA / Codice Fiscale: {companyData.vatNumber} &bull; REA Forlì
              </div>
            </div>

          </div>

          {/* Right Map & Action Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-lg bg-slate-100">
              {/* Map embed */}
              <iframe
                title="Mappa Officina Cristofanetti Forlì"
                src="https://maps.google.com/maps?q=Via%20degli%20Scavi%205,%2047122%20Forl%C3%AC&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                className="border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Action Card below map */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold">Vuoi un preventivo esatto per la tua auto?</h4>
                <p className="text-xs text-slate-300">
                  Indica marca, modello, cilindrata e anno: formuliamo la proposta più vantaggiosa.
                </p>
              </div>
              <Button
                onClick={onOpenQuote}
                variant="accent"
                className="whitespace-nowrap px-6 py-3 font-bold"
              >
                Invia Dati Vettura
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
