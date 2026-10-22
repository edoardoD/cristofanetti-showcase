import React from "react";
import { brcPartnershipInfo } from "@/data/cristofanettiData";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Check, Award, Cpu, Wrench } from "lucide-react";

export function BrcPartnership() {
  return (
    <section id="brc" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: BRC Network Status & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent" className="text-xs uppercase font-bold py-1 px-3">
                Rete Ufficiale BRC
              </Badge>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Centro Assistenza Autorizzato
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {brcPartnershipInfo.title}
            </h2>

            <p className="text-lg font-medium text-brand-navy">
              {brcPartnershipInfo.subtitle}
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              {brcPartnershipInfo.description}
            </p>

            {/* Guarantees List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {brcPartnershipInfo.guarantees.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Handled Brands */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Marchi di impianti assistiti e con diagnosi ufficiale:
              </span>
              <div className="flex flex-wrap gap-2">
                {brcPartnershipInfo.brandsHandled.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Trust Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-slate-800 text-white p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-600 text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Qualità Certificata BRC</h4>
                  <p className="text-xs text-slate-300">Standard ISO & Certificazione Ministeriale</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Tutte le nostre installazioni utilizzano cablaggi specifici automotive a tenuta stagna IP67, raccordi in ottone ad alta pressione e sensori di pressione e temperatura ad alta frequenza di campionamento.
                </p>
                <p>
                  Grazie alla telediagnosi e ai protocolli BRC, possiamo calibrare la mappatura su strada per qualsiasi regime di rotazione, garantendo la totale assenza di buchi di potenza e commutazioni fluide e impercettibili.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xl font-black text-sky-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Ricambi Originali</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xl font-black text-red-500">24 Mesi</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Garanzia di Rete</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
