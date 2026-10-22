"use client";

import React, { useState } from "react";

interface BreakEvenChartProps {
  interventionCost: number;
  monthlySavings: number;
  annualKm: number;
  fuelType: "metano" | "gpl";
}

export function BreakEvenChart({
  interventionCost,
  monthlySavings,
  annualKm,
  fuelType,
}: BreakEvenChartProps) {
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);

  // Time horizon: 36 months (or 48 months for Metano 4-year cycle)
  const maxMonths = fuelType === "metano" ? 48 : 36;
  
  // Calculate break-even point
  const breakEvenMonth = monthlySavings > 0 ? interventionCost / monthlySavings : 0;
  const breakEvenKm = monthlySavings > 0 ? Math.round((annualKm / 12) * breakEvenMonth) : 0;

  // Chart dimensions & margins
  const width = 800;
  const height = 340;
  const padding = { top: 35, right: 40, bottom: 45, left: 65 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Value boundaries
  const minY = -interventionCost * 1.15; // slightly below start
  const maxY = Math.max(interventionCost * 2, -interventionCost + monthlySavings * maxMonths);
  const rangeY = maxY - minY;

  // Coordinate mappers
  const getX = (month: number) => padding.left + (month / maxMonths) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minY) / rangeY) * chartHeight;

  const zeroY = getY(0);

  // Generate data points
  const points: { month: number; netValue: number; km: number }[] = [];
  for (let m = 0; m <= maxMonths; m++) {
    const net = -interventionCost + monthlySavings * m;
    const km = Math.round((annualKm / 12) * m);
    points.push({ month: m, netValue: net, km });
  }

  // Generate SVG path for line
  const linePath = points.reduce((acc, p, i) => {
    const cmd = i === 0 ? "M" : "L";
    return `${acc} ${cmd} ${getX(p.month)} ${getY(p.netValue)}`;
  }, "");

  // Area paths: negative area (below zero line) and positive area (above zero line)
  const breakEvenX = Math.min(width - padding.right, Math.max(padding.left, getX(breakEvenMonth)));

  // SVG Positive Area (from break-even to end)
  const positivePoints = points.filter((p) => p.month >= breakEvenMonth);
  const positivePath = `
    M ${breakEvenX} ${zeroY}
    ${positivePoints.map((p) => `L ${getX(p.month)} ${getY(p.netValue)}`).join(" ")}
    L ${getX(maxMonths)} ${zeroY}
    Z
  `;

  // SVG Negative Area (from start to break-even)
  const negativePoints = points.filter((p) => p.month <= breakEvenMonth);
  const negativePath = `
    M ${getX(0)} ${zeroY}
    L ${getX(0)} ${getY(-interventionCost)}
    ${negativePoints.map((p) => `L ${getX(p.month)} ${getY(p.netValue)}`).join(" ")}
    L ${breakEvenX} ${zeroY}
    Z
  `;

  // Current inspected month
  const activeMonth = hoverMonth !== null ? hoverMonth : Math.min(maxMonths, Math.round(breakEvenMonth + 6));
  const activePoint = points[activeMonth] || points[0];

  return (
    <div className="w-full bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
      {/* Chart Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-base font-bold text-white tracking-wide">
              Curva di Rientro Economico nel Tempo (Break-Even)
            </h4>
          </div>
          <p className="text-xs text-slate-400">
            Trascina o passa il cursore sul grafico per analizzare mese per mese
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold">
            <span className="w-3 h-3 rounded-sm bg-red-500/30 border border-red-500" />
            <span>Fase di Recupero</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-500" />
            <span>Guadagno Netto</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const svgX = (relX / rect.width) * width;
            const boundedX = Math.max(padding.left, Math.min(width - padding.right, svgX));
            const m = Math.round(((boundedX - padding.left) / chartWidth) * maxMonths);
            setHoverMonth(Math.max(0, Math.min(maxMonths, m)));
          }}
          onMouseLeave={() => setHoverMonth(null)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = touch.clientX - rect.left;
            const svgX = (relX / rect.width) * width;
            const boundedX = Math.max(padding.left, Math.min(width - padding.right, svgX));
            const m = Math.round(((boundedX - padding.left) / chartWidth) * maxMonths);
            setHoverMonth(Math.max(0, Math.min(maxMonths, m)));
          }}
        >
          <defs>
            {/* Gradients for areas */}
            <linearGradient id="positiveAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="negativeAreaGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[-interventionCost, 0, maxY * 0.33, maxY * 0.66, maxY].map((val, idx) => (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={getY(val)}
                x2={width - padding.right}
                y2={getY(val)}
                stroke={val === 0 ? "#64748B" : "#1E293B"}
                strokeWidth={val === 0 ? 1.5 : 1}
                strokeDasharray={val === 0 ? "5,5" : "3,3"}
              />
              <text
                x={padding.left - 10}
                y={getY(val) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {val > 0 ? `+${Math.round(val)}€` : `${Math.round(val)}€`}
              </text>
            </g>
          ))}

          {/* Grid lines (vertical months) */}
          {[0, 6, 12, 18, 24, 30, 36, maxMonths].filter((m, i, arr) => arr.indexOf(m) === i).map((m) => (
            <g key={m}>
              <line
                x1={getX(m)}
                y1={padding.top}
                x2={getX(m)}
                y2={height - padding.bottom}
                stroke="#1E293B"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
              <text
                x={getX(m)}
                y={height - padding.bottom + 18}
                textAnchor="middle"
                className="text-[11px] fill-slate-400 font-medium"
              >
                {m === 0 ? "Partenza" : `${m}m`}
              </text>
            </g>
          ))}

          {/* Zero Break-even threshold line */}
          <line
            x1={padding.left}
            y1={zeroY}
            x2={width - padding.right}
            y2={zeroY}
            stroke="#94A3B8"
            strokeWidth={1.5}
            strokeDasharray="4,4"
          />

          {/* Areas */}
          <path d={negativePath} fill="url(#negativeAreaGrad)" />
          <path d={positivePath} fill="url(#positiveAreaGrad)" />

          {/* Main Net Balance Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#38BDF8"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Break-Even Pulsing Point */}
          {breakEvenMonth <= maxMonths && (
            <g>
              <circle
                cx={breakEvenX}
                y={zeroY}
                r={12}
                fill="#10B981"
                fillOpacity={0.2}
                className="animate-ping"
              />
              <circle
                cx={breakEvenX}
                y={zeroY}
                r={6}
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth={2}
              />
              {/* Break Even Marker Flag */}
              <g transform={`translate(${Math.min(width - 150, breakEvenX - 45)}, ${zeroY - 32})`}>
                <rect
                  width={90}
                  height={22}
                  rx={6}
                  fill="#10B981"
                  className="shadow-md"
                />
                <text
                  x={45}
                  y={15}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="text-[10px] font-black uppercase tracking-wider"
                >
                  Break-Even!
                </text>
              </g>
            </g>
          )}

          {/* Active Hover / Scrub Vertical Marker */}
          <line
            x1={getX(activePoint.month)}
            y1={padding.top}
            x2={getX(activePoint.month)}
            y2={height - padding.bottom}
            stroke="#F8FAFC"
            strokeWidth={1.5}
            strokeDasharray="3,3"
          />
          <circle
            cx={getX(activePoint.month)}
            cy={getY(activePoint.netValue)}
            r={5}
            fill={activePoint.netValue >= 0 ? "#10B981" : "#EF4444"}
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        </svg>
      </div>

      {/* Interactive Tooltip Card under the graph */}
      <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl font-black text-sm ${
            activePoint.netValue >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
          }`}>
            Mese {activePoint.month}
          </div>
          <div className="space-y-0.5">
            <div className="text-xs text-slate-400">
              Percorsi circa <strong className="text-white">{activePoint.km.toLocaleString("it-IT")} km</strong>
            </div>
            <div className="text-xs">
              Stato investimento:{" "}
              <strong className={activePoint.netValue >= 0 ? "text-emerald-400" : "text-amber-400"}>
                {activePoint.netValue >= 0 ? "Guadagno Netto Attivo" : "Fase di Ammortamento"}
              </strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-right">
          <div>
            <div className="text-[11px] text-slate-400">Bilancio Cumulato:</div>
            <div className={`text-xl font-black ${
              activePoint.netValue >= 0 ? "text-emerald-400" : "text-red-400"
            }`}>
              {activePoint.netValue >= 0 ? `+ ${activePoint.netValue.toFixed(0)} €` : `${activePoint.netValue.toFixed(0)} €`}
            </div>
          </div>

          <div className="border-l border-slate-700 pl-4 text-left">
            <div className="text-[11px] text-slate-400">Punto di Pareggio:</div>
            <div className="text-sm font-bold text-white">
              {breakEvenMonth.toFixed(1)} Mesi ({breakEvenKm.toLocaleString("it-IT")} km)
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
