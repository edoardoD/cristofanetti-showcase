import React from "react";
import { historyMilestones } from "@/data/cristofanettiData";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, CheckCircle, Clock } from "lucide-react";

export function HistoryTimeline() {
  return (
    <section id="storia" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
            La Nostra Storia
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            60 Anni di Passione e Innovazione a Forlì
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Dal 1964 a oggi: due generazioni di specialisti dedicati all'evoluzione dell'alimentazione a gas per autotrazione, coniugando tradizione artigiana romagnola e rigore tecnologico.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central line */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {historyMilestones.map((m, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={m.year}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Badge in Center */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-slate-50 bg-brand-navy text-white items-center justify-center font-bold text-xs shadow-md z-10">
                    {idx === 2 ? (
                      <Trophy className="w-4 h-4 text-amber-400" />
                    ) : idx === 1 ? (
                      <Award className="w-4 h-4 text-sky-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-300" />
                    )}
                  </div>

                  {/* Content Box */}
                  <div className="w-full sm:w-1/2 px-0 sm:px-8">
                    <div
                      className={`p-6 rounded-3xl bg-white border ${
                        m.highlight ? "border-brand-blue/40 shadow-md ring-2 ring-brand-blue/5" : "border-slate-200"
                      } space-y-3 transition-all duration-200 hover:shadow-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-brand-navy tracking-tight">
                          {m.year}
                        </span>
                        {m.highlight && (
                          <Badge variant="accent" className="text-[10px]">
                            Traguardo Storico
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
