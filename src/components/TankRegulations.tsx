"use client";

import React from "react";
import { tankRegulationsData } from "@/data/cristofanettiData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";

export function TankRegulations() {
  return (
    <section id="normative" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="accent" className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Normative & Sicurezza
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Collaudo Bombole GPL e Metano: Cosa dice la Legge
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Circolare con bombole o serbatoi scaduti comporta pesanti sanzioni e il sequestro della carta di circolazione. Presso la nostra officina a Forlì il collaudo avviene direttamente in sede.
          </p>
        </div>

        {/* Regulations Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {tankRegulationsData.map((reg) => {
            const isGpl = reg.type === "gpl";

            return (
              <div
                key={reg.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant={isGpl ? "accent" : "eco"} className="text-xs font-bold py-1 px-3">
                      {reg.frequency}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-400">
                      Rif. {reg.legalNorm}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                    {reg.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {reg.description}
                  </p>

                  {/* Warning Box */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 leading-relaxed">
                      <strong className="block font-bold mb-0.5">Sanzioni Previste dal Codice della Strada:</strong>
                      {reg.sanctions}
                    </div>
                  </div>

                  {/* In-House Testing Advantage */}
                  {reg.inHouseTesting && (
                    <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <div className="text-xs text-brand-navy leading-relaxed">
                        <strong className="block font-bold mb-0.5">Vantaggio Officina Cristofanetti:</strong>
                        Collaudi periodici svolti direttamente nei nostri locali con l'ingegnere della <strong>Motorizzazione Civile di Forlì-Cesena</strong>, riducendo a poche ore il fermo del veicolo.
                      </div>
                    </div>
                  )}
                </div>

                {/* FAQ Accordion */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Domande Frequenti sul Collaudo:
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    {reg.faq.map((item, idx) => (
                      <AccordionItem key={idx} value={`faq-${reg.id}-${idx}`}>
                        <AccordionTrigger className="text-sm font-semibold text-slate-800 hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below regulations */}
        <div className="bg-brand-navy rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tight">
              Hai dubbi sulla data di scadenza della tua bombola?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Passa in officina in Via degli Scavi 5 a Forlì oppure chiamaci al <span className="text-white font-semibold">0543 720254</span>: verifichiamo gratuitamente la conformità del libretto.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href="tel:+390543720254" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold tracking-wide transition-colors shadow-lg">
                Chiama 0543 720254
              </button>
            </a>
            <a href="#contatti" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold tracking-wide transition-colors border border-white/20">
                Dove Siamo a Forlì
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
