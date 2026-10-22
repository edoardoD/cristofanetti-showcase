import React from "react";
import { companyData } from "@/data/cristofanettiData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Award, Fuel, CheckCircle2, ArrowRight, Calendar } from "lucide-react";

interface HeroProps {
  onOpenQuote: () => void;
}

export function Hero({ onOpenQuote }: HeroProps) {
  const stats = [
    { label: "Anni di Esperienza", value: "60+", icon: Award },
    { label: "Serbatoi Collaudati", value: "10.000+", icon: ShieldCheck },
    { label: "Risparmio Carburante", value: "Fino al 60%", icon: Fuel },
    { label: "Sessioni Motorizzazione", value: "In Sede", icon: Calendar },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-brand-navy text-white pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background ambient decorative shapes */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Badge variant="accent" className="text-xs">UFFICIALE</Badge>
              <span className="text-xs sm:text-sm font-medium text-slate-200">
                Partner BRC Gas Service &bull; Specialisti a Forlì dal 1964
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Guida risparmiando. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-white">
                Impianti GPL e Metano
              </span> di massima precisione.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Dalla conversione ecologica dell'auto alla <strong className="text-white font-semibold">sostituzione del serbatoio GPL decennale</strong> con collaudo della Motorizzazione direttamente nella nostra officina a Forlì. 60 anni di comprovata esperienza.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                onClick={onOpenQuote}
                variant="accent"
                size="lg"
                className="w-full sm:w-auto text-base font-bold gap-2 shadow-lg hover:shadow-red-900/50"
              >
                Preventivo Gratuito
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a href="#normative" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  Scadenza Bombole 10 Anni
                </Button>
              </a>
            </div>

            {/* Value checklist bullets */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Collaudo con funzionari MCTC in sede</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Compatibile con iniezione diretta & ibride</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garanzia ufficiale BRC e ricambi certificati</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Possibilità di rateizzazione su misura</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    Avviso Regolamentare
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Il tuo serbatoio GPL ha 10 anni?
                  </h3>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <ShieldCheck className="w-6 h-6 text-red-400" />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Il Regolamento ECE/ONU 67-01 impone la sostituzione decennale del serbatoio GPL. Presso la nostra sede di Forlì gestiamo l'intera procedura: montaggio nuova bombola toroidale e collaudo Motorizzazione Civile in sede.
              </p>

              <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Sanzione per bombola scaduta:</span>
                  <span className="font-semibold text-red-400">fino a € 1.700 + fermo auto</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tempi di collaudo:</span>
                  <span className="font-semibold text-emerald-400">Sessioni regolari in sede</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Carta di Circolazione:</span>
                  <span className="font-semibold text-sky-400">Aggiornamento immediato</span>
                </div>
              </div>

              <div className="pt-2">
                <a href="#contatti" className="block">
                  <Button variant="default" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold">
                    Prenota Sostituzione Bombola
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom stats row */}
        <div className="mt-16 pt-10 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
