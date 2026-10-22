import React from "react";
import { coreServices } from "@/data/cristofanettiData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Leaf, ShieldAlert, Gauge, Wrench, Car, Check } from "lucide-react";

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const iconMap: Record<string, React.ElementType> = {
    Fuel,
    Leaf,
    ShieldAlert,
    Gauge,
    Wrench,
    Car,
  };

  return (
    <section id="servizi" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
            I Nostri Servizi Specializzati
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tecnologia all'avanguardia per la tua mobilità a gas
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Dalla prima installazione alle scadenze di legge per serbatoi e bombole: assistenza certificata, attrezzature elettroniche e garanzia ufficiale BRC.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => {
            const Icon = iconMap[service.icon] || Fuel;
            const isHighlighted = service.id === "sostituzione-serbatoi-gpl";

            return (
              <Card
                key={service.id}
                className={`relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isHighlighted
                    ? "border-2 border-red-500/80 shadow-md ring-4 ring-red-500/10"
                    : "border-slate-200/90"
                }`}
              >
                {isHighlighted && (
                  <div className="bg-red-600 text-white text-[11px] font-bold py-1 px-4 text-center uppercase tracking-wider">
                    Servizio Fondamentale di Legge
                  </div>
                )}

                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-brand-navy/5 text-brand-navy">
                      <Icon className="w-6 h-6 text-brand-navy" />
                    </div>
                    <Badge variant={isHighlighted ? "accent" : "secondary"} className="text-xs">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 pt-1">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Vantaggi Principali:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    {service.keyPoints.map((pt, i) => (
                      <div key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenQuote}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200 hover:border-brand-navy hover:bg-brand-navy hover:text-white text-slate-800"
                  >
                    Richiedi Informazioni &bull; Preventivo
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
