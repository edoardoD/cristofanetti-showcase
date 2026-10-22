"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Leaf, Shield, Cpu, Zap, CheckCircle2 } from "lucide-react";

export function GasDeepDive() {
  return (
    <section id="confronto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
            Guida alla Scelta
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            GPL o Metano: Quale tecnologia fa per te?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Entrambe le soluzioni abbattono drasticamente i costi chilometrici ed esentano dai blocchi del traffico. Scopri le differenze tecniche e pratiche.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="gpl" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-full max-w-md h-12 p-1.5 bg-slate-100 rounded-2xl">
                <TabsTrigger value="gpl" className="rounded-xl text-sm font-bold flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-sky-600" />
                  Impianto GPL
                </TabsTrigger>
                <TabsTrigger value="metano" className="rounded-xl text-sm font-bold flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  Impianto Metano (CNG)
                </TabsTrigger>
              </TabsList>
            </div>

            {/* GPL Tab Content */}
            <TabsContent value="gpl" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 w-fit mb-2">
                      <Zap className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Risparmio & Autonomia</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Risparmio fino al <strong>50%</strong> rispetto alla benzina. Il serbatoio toroidale viene alloggiato nel vano della ruota di scorta, lasciando il bagagliaio completamente libero.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Rete distributori capillare in tutta Italia e all'estero.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-brand-navy w-fit mb-2">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Iniezione Diretta & Ibrida</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Installiamo sistemi <strong>BRC Sequent Direct Injection</strong> per motori di ultima generazione (TSI, TFSI, EcoBoost, PureTech, T-GDI) e vetture ibride benzina-elettriche.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Preserva la potenza e la fluidità originale del propulsore.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 w-fit mb-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Sicurezza ECE/ONU 67-01</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Dotato di multivalvola con blocco automatico all'80%, fusibile termico, valvola di sovrappressione e valvola di non ritorno. Accesso consentito ai parcheggi sotterranei al 1° piano.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Sostituzione obbligatoria del serbatoio ogni 10 anni.
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Technical Components Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-3">Componenti Principali dell'Impianto GPL:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <strong className="block text-slate-900 font-semibold mb-1">Riduttore/Vaporizzatore</strong>
                    Trasforma il GPL dallo stato liquido a gassoso mantenendo costante la pressione.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <strong className="block text-slate-900 font-semibold mb-1">Rail Elettroiniettori</strong>
                    Inietta il gas con precisione millimetrica direttamente nei condotti di aspirazione.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <strong className="block text-slate-900 font-semibold mb-1">Centralina Elettronica ECU</strong>
                    Interfacciata con la centralina motore originale via diagnosi OBD per la carburazione ideale.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                    <strong className="block text-slate-900 font-semibold mb-1">Commutatore & Indicatore</strong>
                    Pulsante in plancia con led di livello per passare istantaneamente da benzina a gas.
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Metano Tab Content */}
            <TabsContent value="metano" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-2">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Massimo Risparmio & Ecologia</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Risparmio fino al <strong>60%</strong> sui costi chilometrici. Il metano è il combustibile fossile più pulito: assenza di polveri sottili (PM10) e minime emissioni di CO2.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Spesso esente o soggetto a forte sgravio del bollo auto.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 w-fit mb-2">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Bombole Composito CNG-4</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Assistiamo veicoli con bombole leggere in fibra di carbonio (CNG-4) per vetture native come Audi g-tron, VW Golf/Polo TGI, Seat e Skoda, riducendo drasticamente il peso.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Revisione e controllo tenuta ad altissima pressione (200 bar).
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit mb-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">Revisione 4 o 5 Anni</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <p>
                      Le bombole europee (ECE R110) si revisionano ogni <strong>4 anni</strong>; le bombole nazionali DGM ogni <strong>5 anni</strong>. Servizio di sostituzione e rotazione in officina.
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      Gestione completa delle pratiche e rilascio cartellino GFBM.
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Summary comparison */}
              <div className="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-emerald-950">Non sai quale scegliere per la tua vettura?</h4>
                    <p className="text-xs sm:text-sm text-emerald-800">
                      I tecnici Cristofanetti analizzano chilometraggio annuo, modello del motore e bagagliaio per consigliarti la soluzione più vantaggiosa.
                    </p>
                  </div>
                  <a href="#contatti">
                    <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors">
                      Consulenza Tecnica
                    </button>
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </section>
  );
}
