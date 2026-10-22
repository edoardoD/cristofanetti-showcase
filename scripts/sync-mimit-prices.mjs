import fs from 'fs';
import path from 'path';

/**
 * Script di sincronizzazione LIVE tramite Open Data API (mappacarburanti.it / MIMIT)
 * Endpoint JSON gratuiti CC0 senza autenticazione:
 * - https://mappacarburanti.it/api/prezzi/citta/{slug}.json
 * - https://mappacarburanti.it/api/prezzi/national.json
 */

const projectRoot = process.cwd();
const dataDir = path.join(projectRoot, 'public', 'data');
const outputFile = path.join(dataDir, 'fuel-prices.json');

const TARGET_LOCATIONS = [
  { key: "forli", label: "Forlì-Cesena — Emilia-Romagna (Sede Officina)", slug: "forli", isHomeRegion: true },
  { key: "bologna", label: "Bologna — Emilia-Romagna", slug: "bologna" },
  { key: "ravenna", label: "Ravenna — Emilia-Romagna", slug: "ravenna" },
  { key: "rimini", label: "Rimini — Emilia-Romagna", slug: "rimini" },
  { key: "modena", label: "Modena — Emilia-Romagna", slug: "modena" },
  { key: "milano", label: "Milano — Lombardia", slug: "milano" },
  { key: "venezia", label: "Venezia — Veneto", slug: "venezia" },
  { key: "torino", label: "Torino — Piemonte", slug: "torino" },
  { key: "firenze", label: "Firenze — Toscana", slug: "firenze" },
  { key: "ancona", label: "Ancona — Marche", slug: "ancona" },
  { key: "roma", label: "Roma — Lazio", slug: "roma" },
];

async function fetchCityData(loc) {
  const url = `https://mappacarburanti.it/api/prezzi/citta/${loc.slug}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();

  const benzinaAvg = parseFloat((data.fuels?.benzina?.stats?.avg || 2.009).toFixed(3));
  const gasolioAvg = parseFloat((data.fuels?.gasolio?.stats?.avg || 2.223).toFixed(3));
  const gplLitroAvg = parseFloat((data.fuels?.gpl?.stats?.avg || 0.755).toFixed(3));
  const metanoKgAvg = parseFloat((data.fuels?.metano?.stats?.avg || 1.958).toFixed(3));

  const validMetanoStations = (data.fuels?.metano?.top_10_cheapest || []).filter((s) => s.price >= 0.8);
  const validGplStations = (data.fuels?.gpl?.top_10_cheapest || []).filter((s) => s.price >= 0.4);
  const cheapestMetano = validMetanoStations[0] || null;
  const cheapestGpl = validGplStations[0] || null;

  return {
    region: loc.label,
    slug: loc.slug,
    apiEndpoint: url,
    isHomeRegion: Boolean(loc.isHomeRegion),
    extractedDate: data.date || new Date().toISOString().slice(0, 10),
    metanoKg: metanoKgAvg,
    metanoMin: data.fuels?.metano?.stats?.min || metanoKgAvg,
    metanoMax: data.fuels?.metano?.stats?.max || metanoKgAvg,
    metanoStationsCount: data.fuels?.metano?.stats?.count || 0,
    cheapestMetanoStation: cheapestMetano
      ? `${cheapestMetano.brand} - ${cheapestMetano.address} (${cheapestMetano.price.toFixed(3)} €/kg)`
      : null,
    gplLitro: gplLitroAvg,
    gplKg: parseFloat((gplLitroAvg / 0.54).toFixed(3)),
    gplMin: data.fuels?.gpl?.stats?.min || gplLitroAvg,
    gplStationsCount: data.fuels?.gpl?.stats?.count || 0,
    cheapestGplStation: cheapestGpl
      ? `${cheapestGpl.brand} - ${cheapestGpl.address} (${cheapestGpl.price.toFixed(3)} €/L)`
      : null,
    benzinaLitro: benzinaAvg,
    benzinaKg: parseFloat((benzinaAvg / 0.74).toFixed(3)),
    benzinaMin: data.fuels?.benzina?.stats?.min || benzinaAvg,
    benzinaStationsCount: data.fuels?.benzina?.stats?.count || 0,
    gasolioLitro: gasolioAvg,
  };
}

async function fetchNationalData() {
  const url = 'https://mappacarburanti.it/api/prezzi/national.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();

  const benzinaAvg = parseFloat((data.fuels?.benzina?.avg || 2.032).toFixed(3));
  const gasolioAvg = parseFloat((data.fuels?.gasolio?.avg || 2.258).toFixed(3));
  const gplLitroAvg = parseFloat((data.fuels?.gpl?.avg || 0.783).toFixed(3));
  const metanoKgAvg = parseFloat((data.fuels?.metano?.avg || 1.946).toFixed(3));

  return {
    date: data.date,
    generatedAt: data.generated_at,
    totalStations: data.total_stations,
    entry: {
      region: `Media Nazionale Italia (${data.total_stations} distributori)`,
      slug: "national",
      apiEndpoint: url,
      extractedDate: data.date,
      metanoKg: metanoKgAvg,
      metanoMin: data.fuels?.metano?.min || metanoKgAvg,
      metanoMax: data.fuels?.metano?.max || metanoKgAvg,
      metanoStationsCount: data.fuels?.metano?.count || 0,
      gplLitro: gplLitroAvg,
      gplKg: parseFloat((gplLitroAvg / 0.54).toFixed(3)),
      gplMin: data.fuels?.gpl?.min || gplLitroAvg,
      gplStationsCount: data.fuels?.gpl?.count || 0,
      benzinaLitro: benzinaAvg,
      benzinaKg: parseFloat((benzinaAvg / 0.74).toFixed(3)),
      benzinaMin: data.fuels?.benzina?.min || benzinaAvg,
      benzinaStationsCount: data.fuels?.benzina?.count || 0,
      gasolioLitro: gasolioAvg,
    }
  };
}

async function syncPrices() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log('[Open Data Fuel API] Scaricamento prezzi reali da https://mappacarburanti.it/api/prezzi/ ...');
  const regions = {};

  for (const loc of TARGET_LOCATIONS) {
    try {
      const cityResult = await fetchCityData(loc);
      regions[loc.key] = cityResult;
      console.log(`  ✓ ${loc.label}: Benzina ${cityResult.benzinaLitro} €/L | Metano ${cityResult.metanoKg} €/kg | GPL ${cityResult.gplLitro} €/L (${cityResult.gplKg} €/kg)`);
    } catch (err) {
      console.warn(`  ! Impossibile scaricare ${loc.slug}:`, err.message);
    }
  }

  let nationalMeta = null;
  try {
    nationalMeta = await fetchNationalData();
    regions["italia-media"] = nationalMeta.entry;
    console.log(`  ✓ Media Nazionale: Benzina ${nationalMeta.entry.benzinaLitro} €/L | Metano ${nationalMeta.entry.metanoKg} €/kg | GPL ${nationalMeta.entry.gplLitro} €/L`);
  } catch (err) {
    console.warn('  ! Impossibile scaricare national.json:', err.message);
  }

  const now = new Date();
  const payload = {
    source: "Mappa Carburanti Italia (mappacarburanti.it) — Dati ufficiali MIMIT Osservaprezzi (CC0)",
    apiBaseUrl: "https://mappacarburanti.it/api/prezzi/",
    legalReference: "Decreto Legge 14 gennaio 2023, n. 5 — Open Data MIMIT",
    mimitExtractionDate: nationalMeta?.date || now.toISOString().slice(0, 10),
    lastUpdate: now.toISOString(),
    lastUpdateDisplay: `API MIMIT Live (${nationalMeta?.date || 'Oggi'})`,
    regions
  };

  fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`\n[Open Data Fuel API] Sincronizzazione completata in ${outputFile}`);
}

syncPrices().catch((err) => {
  console.error('[Open Data Fuel API] Errore fatale:', err);
  process.exit(1);
});
