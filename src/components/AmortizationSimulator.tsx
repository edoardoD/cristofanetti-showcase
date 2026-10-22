"use client";

import React, { useState, useEffect, useId } from "react";
import { regionalFuelPrices, amortizationPresets } from "@/data/cristofanettiData";
import { BreakEvenChart } from "@/components/BreakEvenChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Fuel,
  RefreshCw,
  MapPin,
  CheckCircle2,
  Car,
  ArrowRight,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";

interface AmortizationSimulatorProps {
  onOpenQuote: () => void;
}

export function AmortizationSimulator({ onOpenQuote }: AmortizationSimulatorProps) {
  // Input states - default to Forlì-Cesena (Emilia-Romagna)
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>("forli");
  const [fuelType, setFuelType] = useState<"metano" | "gpl">("metano");
  const [annualKm, setAnnualKm] = useState<number>(15000);
  const [interventionCost, setInterventionCost] = useState<number>(200);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("polo-aw1-2bombole");

  // Regional prices state (strictly al kg for gas, and €/L for benzina)
  const defaultRegion = regionalFuelPrices[selectedRegionKey] || regionalFuelPrices["forli"];
  const [currentMetanoKg, setCurrentMetanoKg] = useState<number>(defaultRegion.metanoKg);
  const [currentGplKg, setCurrentGplKg] = useState<number>(defaultRegion.gplKg);
  const [currentBenzinaLitro, setCurrentBenzinaLitro] = useState<number>(defaultRegion.benzinaLitro);
  const [cheapestMetanoStation, setCheapestMetanoStation] = useState<string | null>(
    defaultRegion.cheapestMetanoStation || null
  );
  const [cheapestGplStation, setCheapestGplStation] = useState<string | null>(
    defaultRegion.cheapestGplStation || null
  );
  const [stationsCountInfo, setStationsCountInfo] = useState<string>(
    `${defaultRegion.metanoStationsCount || 7} imp. Metano / ${defaultRegion.benzinaStationsCount || 44} Benzina`
  );

  // Live API states
  const [isUpdatingApi, setIsUpdatingApi] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("API Live MIMIT / MappaCarburanti");
  const [showApiModal, setShowApiModal] = useState<boolean>(false);

  // Accessible unique IDs for form controls
  const regionSelectId = useId();
  const kmRangeId = useId();
  const interventionCostId = useId();
  const metanoPriceId = useId();
  const gplPriceId = useId();
  const benzinaPriceId = useId();

  // Fetch directly from live CORS-open API (mappacarburanti.it -> MIMIT Open Data) with local JSON fallback
  const fetchLivePricesForKey = async (regionKey: string) => {
    setIsUpdatingApi(true);
    const regConfig = regionalFuelPrices[regionKey] || regionalFuelPrices["forli"];

    try {
      // 1. Try direct live CORS-enabled Open Data API endpoint
      const liveRes = await fetch(regConfig.apiEndpoint);
      if (liveRes.ok) {
        const liveData = await liveRes.json();
        if (regConfig.slug === "national" && liveData.fuels) {
          const bAvg = parseFloat((liveData.fuels.benzina?.avg || regConfig.benzinaLitro).toFixed(3));
          const gLitro = parseFloat((liveData.fuels.gpl?.avg || regConfig.gplLitro).toFixed(3));
          const mKg = parseFloat((liveData.fuels.metano?.avg || regConfig.metanoKg).toFixed(3));
          setCurrentBenzinaLitro(bAvg);
          setCurrentGplKg(parseFloat((gLitro / 0.54).toFixed(3)));
          setCurrentMetanoKg(mKg);
          setCheapestMetanoStation(null);
          setCheapestGplStation(null);
          setStationsCountInfo(`${liveData.total_stations || 21517} distributori nazionali`);
          setLastSyncTime(`API Live (${liveData.date || "Oggi"})`);
          setIsUpdatingApi(false);
          return;
        } else if (liveData.fuels) {
          const bAvg = parseFloat((liveData.fuels.benzina?.stats?.avg || regConfig.benzinaLitro).toFixed(3));
          const gLitro = parseFloat((liveData.fuels.gpl?.stats?.avg || regConfig.gplLitro).toFixed(3));
          const mKg = parseFloat((liveData.fuels.metano?.stats?.avg || regConfig.metanoKg).toFixed(3));

          const validM = (liveData.fuels.metano?.top_10_cheapest || []).filter((s: { price: number }) => s.price >= 0.8);
          const validG = (liveData.fuels.gpl?.top_10_cheapest || []).filter((s: { price: number }) => s.price >= 0.4);

          setCurrentBenzinaLitro(bAvg);
          setCurrentGplKg(parseFloat((gLitro / 0.54).toFixed(3)));
          setCurrentMetanoKg(mKg);
          setCheapestMetanoStation(
            validM[0] ? `${validM[0].brand} — ${validM[0].address} (${validM[0].price.toFixed(3)} €/kg)` : regConfig.cheapestMetanoStation || null
          );
          setCheapestGplStation(
            validG[0] ? `${validG[0].brand} — ${validG[0].address} (${validG[0].price.toFixed(3)} €/L)` : regConfig.cheapestGplStation || null
          );
          setStationsCountInfo(
            `${liveData.fuels.metano?.stats?.count || 7} imp. Metano • ${liveData.fuels.gpl?.stats?.count || 12} GPL • ${liveData.fuels.benzina?.stats?.count || 44} Benzina`
          );
          setLastSyncTime(`API Live MIMIT (${liveData.date || "Oggi"})`);
          setIsUpdatingApi(false);
          return;
        }
      }
    } catch {
      // Fallback to local static JSON synced by GitHub Action
    }

    try {
      const localRes = await fetch(`/data/fuel-prices.json?t=${Date.now()}`);
      if (localRes.ok) {
        const localData = await localRes.json();
        const r = localData.regions?.[regionKey];
        if (r) {
          setCurrentMetanoKg(r.metanoKg);
          setCurrentGplKg(r.gplKg);
          setCurrentBenzinaLitro(r.benzinaLitro);
          setCheapestMetanoStation(r.cheapestMetanoStation || null);
          setCheapestGplStation(r.cheapestGplStation || null);
          setStationsCountInfo(
            `${r.metanoStationsCount || 7} imp. Metano • ${r.gplStationsCount || 12} GPL • ${r.benzinaStationsCount || 44} Benzina`
          );
          setLastSyncTime(localData.lastUpdateDisplay || "Sincronizzato MIMIT");
          setIsUpdatingApi(false);
          return;
        }
      }
    } catch {
      // Fallback to built-in verified dataset
    }

    setCurrentMetanoKg(regConfig.metanoKg);
    setCurrentGplKg(regConfig.gplKg);
    setCurrentBenzinaLitro(regConfig.benzinaLitro);
    setCheapestMetanoStation(regConfig.cheapestMetanoStation || null);
    setCheapestGplStation(regConfig.cheapestGplStation || null);
    setIsUpdatingApi(false);
  };

  // Initial load & region switch
  useEffect(() => {
    fetchLivePricesForKey(selectedRegionKey);
  }, [selectedRegionKey]);

  // Handle region change
  const handleRegionChange = (regionKey: string) => {
    setSelectedRegionKey(regionKey);
    const reg = regionalFuelPrices[regionKey];
    if (reg) {
      setCurrentMetanoKg(reg.metanoKg);
      setCurrentGplKg(reg.gplKg);
      setCurrentBenzinaLitro(reg.benzinaLitro);
      setCheapestMetanoStation(reg.cheapestMetanoStation || null);
      setCheapestGplStation(reg.cheapestGplStation || null);
    }
  };

  // Preset selector
  const handlePresetSelect = (preset: (typeof amortizationPresets)[0]) => {
    setSelectedPresetId(preset.id);
    setInterventionCost(preset.cost);
    setFuelType(preset.fuelType);
  };

  // Rigorous consumption models strictly per KG
  // 1. Metano: ~26.5 km con 1 kg di metano (consumo medio VW Polo TGI / ecofuel ~3.77 kg / 100km)
  const kmPerKgMetano = 26.5;

  // 2. GPL: 1 kg di GPL liquido = ~1.85 litri (densità media miscela GPL propano/butano: ~0.54 kg/L).
  // A un consumo medio di 7.4 L / 100km (resa 13.5 km/L), la resa chilometrica per kg di GPL è:
  // 13.5 km/L * 1.85 L/kg = 25.0 km con 1 kg di GPL!
  const kmPerKgGpl = 25.0;

  // 3. Benzina equivalente: ~16.0 km al litro (6.25 L / 100km)
  const kmPerLitroBenzina = 16.0;

  // Yearly fuel expenses
  const yearlyBenzinaCost = (annualKm / kmPerLitroBenzina) * currentBenzinaLitro;

  const yearlyGasCost =
    fuelType === "metano"
      ? (annualKm / kmPerKgMetano) * currentMetanoKg
      : (annualKm / kmPerKgGpl) * currentGplKg;

  // Fuel savings
  const yearlySavings = Math.max(1, yearlyBenzinaCost - yearlyGasCost);
  const monthlySavings = yearlySavings / 12;

  // Amortization & Break-Even Point
  const monthsToAmortize = (interventionCost / yearlySavings) * 12;
  const daysToAmortize = Math.round(monthsToAmortize * 30.4);
  const kmToAmortize = Math.round((annualKm / 12) * monthsToAmortize);

  // Cycle Net Gain: 4 years for Metano (ECE R110), 10 years for GPL (ECE/ONU 67-01)
  const cycleYears = fuelType === "metano" ? 4 : 10;
  const totalCycleNetSavings = yearlySavings * cycleYears - interventionCost;

  return (
    <section id="simulatore" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Prezzo Medio Regionale al kg (MIMIT) &bull; Break-Even Point
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Simulatore di Ammortamento al kg
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Collegato alle API Open Data ufficiali <strong>MIMIT / MappaCarburanti</strong>: i calcoli utilizzano i prezzi reali aggiornati di Benzina, Metano al kg e GPL al kg nella tua provincia.
          </p>

          {/* Real-Time Regional MIMIT Status Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Rilevazione Prezzi: <strong>{lastSyncTime}</strong> ({stationsCountInfo})
              </span>
            </div>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => fetchLivePricesForKey(selectedRegionKey)}
              disabled={isUpdatingApi}
              className="inline-flex items-center gap-1.5 font-semibold text-sky-400 hover:text-sky-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingApi ? "animate-spin" : ""}`} />
              Sincronizza API Ora
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setShowApiModal(true)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white underline text-[11px]"
            >
              <Info className="w-3.5 h-3.5" />
              Dettagli API JSON
            </button>
          </div>
        </div>

        {/* Quick Presets Row */}
        <div className="mb-10 bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky-400" />
                Interventi Tipici Preimpostati:
              </span>
              <p className="text-xs text-slate-400">
                Seleziona la tua configurazione per simulare il piano di ammortamento:
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {amortizationPresets.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      isSelected
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30 ring-2 ring-white/20"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>{preset.label}</span>
                    <span className="text-sky-200 font-mono">({preset.cost} €)</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Grid: Controls + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-4 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Parametri al kg</h3>
              <Badge variant="eco" className="text-[10px]">
                API Live MIMIT
              </Badge>
            </div>

            {/* 1. Fuel Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Tipo di Carburante a Gas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFuelType("metano")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    fuelType === "metano"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Fuel className="w-3.5 h-3.5" />
                  Metano (al kg)
                </button>
                <button
                  type="button"
                  onClick={() => setFuelType("gpl")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    fuelType === "gpl"
                      ? "bg-sky-600 text-white shadow-md shadow-sky-900/40"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <Fuel className="w-3.5 h-3.5" />
                  GPL (al kg)
                </button>
              </div>
            </div>

            {/* 2. City / Region Selector */}
            <div className="space-y-2">
              <label htmlFor={regionSelectId} className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                2. Provincia / Regione Rilevazione MIMIT
              </label>
              <select
                id={regionSelectId}
                value={selectedRegionKey}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium"
              >
                {Object.entries(regionalFuelPrices).map(([key, data]) => (
                  <option key={key} value={key}>
                    {data.region}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Real-Time Regional Average Price Box AL KG */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-semibold text-white">Prezzo Medio al kg Rilevato:</span>
                <span className="text-[10px] text-emerald-400 font-mono">Open Data API</span>
              </div>

              {fuelType === "metano" ? (
                <div className="space-y-1.5">
                  <label htmlFor={metanoPriceId} className="text-slate-400 block text-[11px]">
                    Metano Auto — Prezzo Medio al kg (€ / kg)
                  </label>
                  <div className="relative">
                    <input
                      id={metanoPriceId}
                      type="number"
                      step="0.001"
                      value={currentMetanoKg}
                      onChange={(e) => setCurrentMetanoKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-base font-black text-emerald-400 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      € / kg
                    </span>
                  </div>
                  {cheapestMetanoStation && (
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-300 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Più economico in zona:</strong> {cheapestMetanoStation}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label htmlFor={gplPriceId} className="text-slate-400 block text-[11px]">
                    GPL Auto — Prezzo Medio al kg (€ / kg)
                  </label>
                  <div className="relative">
                    <input
                      id={gplPriceId}
                      type="number"
                      step="0.001"
                      value={currentGplKg}
                      onChange={(e) => setCurrentGplKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-base font-black text-sky-400 pr-14 focus:outline-none focus:ring-2 focus:ring-sky-400 font-mono"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      € / kg
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                    <span>Prezzo alla pompa: ~{(currentGplKg * 0.54).toFixed(3)} €/L</span>
                    <span>1 kg GPL = ~1.85 L</span>
                  </div>
                  {cheapestGplStation && (
                    <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-500/20 text-[10px] text-sky-300 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Più economico in zona:</strong> {cheapestGplStation}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Benzina benchmark input */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <label htmlFor={benzinaPriceId} className="text-slate-400 block text-[11px]">
                  Benzina Self Rilevata — Prezzo Medio (€ / Litro)
                </label>
                <div className="relative">
                  <input
                    id={benzinaPriceId}
                    type="number"
                    step="0.001"
                    value={currentBenzinaLitro}
                    onChange={(e) => setCurrentBenzinaLitro(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-sm font-bold text-red-400 pr-14 focus:outline-none font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    € / L
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Annual Km Slider */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label htmlFor={kmRangeId} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  4. Km Annui Stimati
                </label>
                <span className="text-sm font-black text-sky-400 font-mono">
                  {annualKm.toLocaleString("it-IT")} km
                </span>
              </div>
              <input
                id={kmRangeId}
                type="range"
                min={5000}
                max={40000}
                step={1000}
                value={annualKm}
                onChange={(e) => setAnnualKm(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5k</span>
                <span>15k (Media)</span>
                <span>40k</span>
              </div>
            </div>

            {/* 5. Cost of Intervention */}
            <div className="space-y-1.5 pt-1">
              <label htmlFor={interventionCostId} className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                5. Costo Intervento di Revisione (€)
              </label>
              <div className="relative">
                <input
                  id={interventionCostId}
                  type="number"
                  min={50}
                  max={4000}
                  step={10}
                  value={interventionCost}
                  onChange={(e) => {
                    setSelectedPresetId("custom");
                    setInterventionCost(Math.max(1, parseFloat(e.target.value) || 0));
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-black text-white pr-8 focus:outline-none focus:ring-2 focus:ring-sky-400 font-mono"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">€</span>
              </div>
            </div>

            {/* Summary savings pill */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1">
              <div className="text-slate-300">Risparmio carburante annuo calcolato:</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                + {yearlySavings.toFixed(0)} € / anno
              </div>
              <div className="text-[11px] text-slate-400">
                (circa + {monthlySavings.toFixed(0)} € risparmiati ogni mese alla pompa)
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Break-Even Chart */}
          <div className="lg:col-span-8 space-y-6">
            {/* Break-Even Highlight Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Punto di Pareggio (Mesi)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
                  <span>{monthsToAmortize.toFixed(1)}</span>
                  <span className="text-xs font-semibold text-slate-400">Mesi (~{daysToAmortize} gg)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pareggio in Chilometri
                </span>
                <div className="text-2xl sm:text-3xl font-black text-sky-400 flex items-baseline gap-1.5 font-mono">
                  <span>{kmToAmortize.toLocaleString("it-IT")}</span>
                  <span className="text-xs font-semibold text-slate-400">km</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Guadagno Netto a Fine Ciclo ({cycleYears}a)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-baseline gap-1.5 font-mono">
                  <span>+{totalCycleNetSavings.toFixed(0)}</span>
                  <span className="text-xs font-semibold text-slate-400">€</span>
                </div>
              </div>
            </div>

            {/* Interactive Responsive Break-Even Graph */}
            <BreakEvenChart
              interventionCost={interventionCost}
              monthlySavings={monthlySavings}
              annualKm={annualKm}
              fuelType={fuelType}
            />

            {/* Action Card under graph */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 space-y-0.5 text-center sm:text-left">
                <div className="font-bold text-white text-sm">
                  Vuoi confermare il preventivo esatto per le bombole della tua auto?
                </div>
                <div className="text-slate-400">
                  Officina Cristofanetti verifica il numero di bombole a libretto e programma la sessione con la Motorizzazione in sede.
                </div>
              </div>
              <Button
                onClick={onOpenQuote}
                variant="accent"
                className="whitespace-nowrap font-bold text-xs uppercase tracking-wider gap-2 shadow-lg"
              >
                Richiedi Verifica Gratuita
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info API Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-sky-400" />
                Endpoint API Live (MIMIT / MappaCarburanti JSON)
              </h4>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                Il simulatore interroga in tempo reale le API JSON Open Data derivate dal flusso giornaliero <strong>MIMIT Osservaprezzi Carburanti</strong> (licenza CC0, CORS aperto):
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px] text-sky-300 break-all">
                <div>• https://mappacarburanti.it/api/prezzi/citta/forli.json</div>
                <div>• https://mappacarburanti.it/api/prezzi/national.json</div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong>Forlì (44 stazioni benzina, 7 metano, 12 GPL)</strong>: Benzina media <strong>2,009 €/L</strong>, Metano <strong>1,958 €/kg</strong>, GPL <strong>0,755 €/L (1,398 €/kg)</strong>.</li>
                <li><strong>Media Nazionale (21.517 distributori)</strong>: Benzina <strong>2,032 €/L</strong>, Metano <strong>1,946 €/kg</strong>, GPL <strong>0,783 €/L (1,450 €/kg)</strong>.</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={() => setShowApiModal(false)} variant="secondary" size="sm">
                Chiudi
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
