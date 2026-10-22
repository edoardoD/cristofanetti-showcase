export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  founders: string;
  foundedYear: number;
  vatNumber: string;
  address: string;
  city: string;
  cap: string;
  province: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  pec: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  brcBadge: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  benefits: string[];
  keyPoints: string[];
}

export interface RegulationItem {
  id: string;
  title: string;
  type: 'gpl' | 'metano';
  frequency: string;
  legalNorm: string;
  description: string;
  sanctions: string;
  inHouseTesting: boolean;
  faq: { question: string; answer: string }[];
}

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const companyData: CompanyInfo = {
  name: "Cristofanetti G.M.",
  legalName: "Cristofanetti G.M. S.n.c. di Cristofanetti Giovanni e Maurizio",
  tagline: "Impianti a Gas per Autoveicoli & Centro Assistenza BRC dal 1964",
  founders: "Giovanni e Maurizio Cristofanetti",
  foundedYear: 1964,
  vatNumber: "01639050408",
  address: "Via degli Scavi, 5",
  city: "Forlì",
  cap: "47122",
  province: "FC",
  phone: "+390543720254",
  phoneDisplay: "0543 720254",
  email: "info@cristofanetti.it",
  pec: "cristofanettisnc@pec.it",
  hours: {
    weekdays: "Lunedì - Venerdì: 08:00 - 12:00 | 14:00 - 19:00",
    saturday: "Sabato: Chiuso",
    sunday: "Domenica: Chiuso"
  },
  brcBadge: "Centro Autorizzato BRC Gas Service"
};

export const coreServices: ServiceItem[] = [
  {
    id: "gpl",
    title: "Installazione Impianti GPL",
    badge: "Risparmio fino al 50%",
    shortDescription: "Progettazione e montaggio impianti GPL sequenziali per auto a iniezione indiretta, diretta (GDI/TSI/PureTech) e ibride.",
    fullDescription: "Installiamo impianti GPL di ultima generazione con tecnologia avanzata BRC Gas Equipment. Ogni impianto viene tarato su misura per preservare potenza, erogazione elastica e affidabilità del motore nel tempo.",
    icon: "Fuel",
    benefits: [
      "Risparmio economico immediato fino al 50% rispetto alla benzina",
      "Circolazione libera anche durante le limitazioni del traffico e blocchi ecologici",
      "Serbatoio toroidale nel vano ruota di scorta: zero ingombro nel bagagliaio",
      "Doppia alimentazione per raddoppiare l'autonomia complessiva di viaggio"
    ],
    keyPoints: [
      "Partner ufficiale BRC Gas Service con garanzia estesa",
      "Compatibilità con motori turbo e iniezione diretta",
      "Elettronica integrata con la centralina originale OBD"
    ]
  },
  {
    id: "metano",
    title: "Impianti a Metano (CNG)",
    badge: "Massima Economicità & Ecologia",
    shortDescription: "Conversione a metano e manutenzione impianti per il massimo abbattimento delle emissioni e dei costi chilometrici.",
    fullDescription: "La tecnologia del gas naturale compresso (Metano - CNG a 200 bar) rappresenta la scelta più economica ed ecologica. Gestiamo installazioni aftermarket con bombole tradizionali in acciaio e composito di ultima generazione.",
    icon: "Leaf",
    benefits: [
      "Risparmio record: fino al 60% rispetto ai carburanti tradizionali",
      "Minime emissioni di CO2 e assenza totale di particolato (PM10)",
      "Esenzione o forti riduzioni sulla tassa automobilistica (bollo auto)",
      "Accesso garantito alle zone a traffico limitato (ZTL secondo ordinanze locali)"
    ],
    keyPoints: [
      "Impianti dedicati multipoint fasati",
      "Bombole certificate alleggerite per preservare il carico utile",
      "Collaudo e registrazione sulla carta di circolazione in sede"
    ]
  },
  {
    id: "sostituzione-serbatoi-gpl",
    title: "Sostituzione Serbatoi GPL Decennale",
    badge: "Obbligo di Legge - In Sede",
    shortDescription: "Sostituzione serbatoio GPL scaduto (dopo 10 anni) con nuova bombola, raccordi omologati e collaudo con la Motorizzazione in sede.",
    fullDescription: "Per legge (Regolamento ECE/ONU 67-01 e Codice della Strada) il serbatoio GPL deve essere sostituito tassativamente dopo 10 anni dalla prima immatricolazione o installazione. Eseguiamo la sostituzione completa con serbatoi toroidali o cilindrici nuovi e collaudo in sede.",
    icon: "ShieldAlert",
    benefits: [
      "Collaudi eseguiti direttamente presso la nostra officina con funzionari MCTC",
      "Sostituzione rapida della bombola con multivalvola di sicurezza nuova",
      "Rilascio immediato dell'aggiornamento della Carta di Circolazione",
      "Sicurezza totale certificata secondo i più severi standard europei"
    ],
    keyPoints: [
      "Evita pesanti sanzioni e fermo amministrativo del veicolo",
      "Piani di prenotazione dedicati per azzerare i tempi di fermo auto",
      "Ricambi e serbatoi omologati dei migliori produttori europei"
    ]
  },
  {
    id: "revisione-bombole-metano",
    title: "Collaudo & Revisione Bombole Metano",
    badge: "Certificazione CNG-4 & DGM",
    shortDescription: "Revisione periodica bombole metano (4 o 5 anni a seconda dell'omologazione europea ECE R110 o nazionale DGM).",
    fullDescription: "Specializzati nella verifica periodica e sostituzione bombole metano per auto native a metano (Audi g-tron, Gruppo VW, Fiat Natural Power, Mercedes) e veicoli trasformati. Gestiamo bombole in acciaio (DGM) e composito (CNG-4).",
    icon: "Gauge",
    benefits: [
      "Verifica integrità, valvole di sovrappressione ed elettrovalvole",
      "Sostituzione bombole per rotazione per non fermare il cliente a lungo",
      "Taratura sensori di pressione e controllo tenuta ad alta pressione (200 bar)",
      "Conformità piena per la revisione biennale ministeriale"
    ],
    keyPoints: [
      "Bombole ECE R110: scadenza quadriennale (4 anni)",
      "Bombole DGM nazionali: scadenza quinquennale (5 anni)",
      "Attrezzature elettroniche di rilevamento fughe gas ad altissima precisione"
    ]
  },
  {
    id: "tagliandi-meccanica",
    title: "Manutenzione & Tagliandi Auto Gas",
    badge: "Officina Specializzata",
    shortDescription: "Tagliandi completi con sostituzione filtri gas, verifica mappature, candele speciali per gas e pulizia iniettori.",
    fullDescription: "I motori alimentati a GPL e metano richiedono una cura specifica: filtri gas per fase liquida e gassosa, candele a grado termico ottimizzato, controllo gioco valvole e diagnosi computerizzata dei parametri di carburazione.",
    icon: "Wrench",
    benefits: [
      "Preservazione della durata delle valvole e delle sedi valvola",
      "Consumi sempre costanti e risposta dell'acceleratore ottimale",
      "Diagnosi elettronica computerizzata multimarca",
      "Ricambi originali BRC e oli ad alte prestazioni specifici per gas"
    ],
    keyPoints: [
      "Lavaggio e revisione rail iniettori gas",
      "Controllo pressione riduttore ed emissioni gas di scarico",
      "Mantenimento della garanzia costruttore del veicolo"
    ]
  },
  {
    id: "ganci-traino",
    title: "Installazione Ganci Traino & Accessori",
    badge: "Omologazione Inclusa",
    shortDescription: "Montaggio ganci traino fissi, estraibili o a scomparsa per carrelli, roulotte e portabici con disbrigo pratiche MCTC.",
    fullDescription: "Fornitura e installazione di ganci traino dei marchi leader (Umbra Rimorchi, Westfalia, Brink) con cablaggi dedicati compatibili CAN-bus e gestione completa della documentazione di omologazione.",
    icon: "Car",
    benefits: [
      "Modelli a scomparsa verticale invisibili a gancio smontato",
      "Centraline elettroniche dedicate per non alterare i sensori di parcheggio e ABS",
      "Disbrigo completo pratiche amministrative e collaudo",
      "Adatti per portabici elettriche, rimorchi leggeri e caravan"
    ],
    keyPoints: [
      "Preventivi chiari chiavi in mano comprensivi di montaggio e pratiche",
      "Garanzia sui componenti e sull'installazione elettromeccanica",
      "Consulenza sulla massa rimorchiabile del veicolo"
    ]
  }
];

export const tankRegulationsData: RegulationItem[] = [
  {
    id: "reg-gpl-10-anni",
    title: "Sostituzione Bombola GPL Decennale (ECE/ONU 67-01)",
    type: "gpl",
    frequency: "Ogni 10 Anni",
    legalNorm: "Regolamento ECE/ONU 67-01 & Art. 78 del Codice della Strada",
    description: "Il serbatoio GPL ha una validità massima improrogabile di 10 anni a partire dalla data di collaudo o di prima immatricolazione del veicolo a gas. Alla scadenza, il serbatoio non può essere revisionato ma deve essere obbligatoriamente sostituito con un'unità nuova munita di multivalvola di sicurezza aggiornata.",
    sanctions: "Sanzione amministrativa pecuniaria da € 430 a oltre € 1.700, ritiro immediato della Carta di Circolazione e divieto assoluto di rifornimento GPL presso tutte le stazioni di servizio.",
    inHouseTesting: true,
    faq: [
      {
        question: "Come posso verificare la data di scadenza esatta del mio serbatoio GPL?",
        answer: "La data è riportata sul libretto di circolazione nel riquadro delle omologazioni o direttamente sulla targhetta punzonata sul serbatoio stesso. Portando il veicolo in officina verifichiamo la scadenza in pochi secondi."
      },
      {
        question: "Cosa accade se la revisione ministeriale cade nello stesso periodo?",
        answer: "Se il serbatoio GPL è scaduto, la revisione periodica biennale non può essere superata con esito positivo. È fondamentale sostituire il serbatoio e ottenere l'aggiornamento della carta di circolazione prima di presentare l'auto alla revisione."
      },
      {
        question: "Quanto tempo occorre per la sostituzione e il collaudo?",
        answer: "Presso Cristofanetti organizziamo sessioni di collaudo direttamente in sede con i funzionari della Motorizzazione Civile di Forlì, riducendo al minimo il fermo vettura (in genere mezza giornata o giornata singola concordata)."
      }
    ]
  },
  {
    id: "reg-metano-periodica",
    title: "Revisione e Collaudo Bombole Metano (CNG)",
    type: "metano",
    frequency: "Ogni 4 o 5 Anni (in base all'omologazione)",
    legalNorm: "Regolamento Europeo ECE R110 (4 anni) / Normativa Nazionale DGM (5 anni)",
    description: "Le bombole per metano per autotrazione operano a 200 bar e necessitano di collaudo idraulico periodico per certificare l'integrità strutturale. Le bombole con omologazione europea (ECE R110, presenti su gran parte dei veicoli moderni e bombole composite CNG-4) scadono ogni 4 anni; quelle con omologazione italiana DGM ogni 5 anni.",
    sanctions: "Mancato superamento della revisione periodica, divieto di rifornimento presso i distributori di metano e contravvenzione per circolazione con dispositivi non conformi.",
    inHouseTesting: true,
    faq: [
      {
        question: "Qual è la differenza tra bombole in acciaio e bombole composite (CNG-4)?",
        answer: "Le bombole CNG-4 (montate ad esempio su Audi g-tron, VW Golf/Polo TGI) sono realizzate in fibra di carbonio per ridurre drasticamente il peso. Richiedono procedure di smontaggio, ispezione e collaudo specifiche che eseguiamo con strumentazione certificata."
      },
      {
        question: "Come funziona il servizio a rotazione per le bombole metano?",
        answer: "Per accelerare i tempi e non costringere il cliente ad attendere i giorni tecnici del collaudo in fonderia/GFBM, possiamo installare bombole già collaudate e certificate dello stesso tipo, completando l'operazione in tempi record."
      }
    ]
  }
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: "1964",
    title: "La Fondazione a Forlì",
    description: "Giovanni Cristofanetti avvia l'attività artigianale a Forlì, intuendo fin dai primi anni il potenziale ecologico ed economico dell'alimentazione a gas per autotrazione.",
    highlight: true
  },
  {
    year: "1984",
    title: "Premio 'Forlì che Lavora'",
    description: "La Camera di Commercio di Forlì conferisce all'Autofficina Cristofanetti il prestigioso riconoscimento 'Forlì che Lavora' per vent'anni di fedeltà al lavoro e progresso economico.",
    highlight: false
  },
  {
    year: "1986",
    title: "Vittoria alla 1ª Mille Miglia a Metano di Imola",
    description: "A conferma dell'eccellenza e della raffinatezza tecnica delle proprie elaborazioni a gas, l'officina trionfa nella 1ª edizione della Mille Miglia a Metano disputata presso il circuito di Imola.",
    highlight: true
  },
  {
    year: "1998",
    title: "L'Evoluzione con Maurizio Cristofanetti",
    description: "Il figlio Maurizio entra alla guida operativa dell'officina portando l'iniezione elettronica sequenziale fasata e posizionando l'azienda all'avanguardia nei sistemi a controllo elettronico.",
    highlight: false
  },
  {
    year: "Oggi",
    title: "Oltre 60 Anni di Passione e Tecnologia",
    description: "Con oltre sei decenni di esperienza ininterrotta e migliaia di impianti installati e collaudati, Cristofanetti è il punto di riferimento autorizzato BRC Gas Service in Romagna.",
    highlight: true
  }
];

export const brcPartnershipInfo = {
  title: "Centro Ufficiale BRC Gas Service",
  subtitle: "La massima garanzia nel settore dei sistemi a gas per auto",
  description: "Cristofanetti G.M. s.n.c. è partner e officina autorizzata della rete internazionale BRC Gas Service. BRC Gas Equipment è leader mondiale nella produzione e commercializzazione di componenti e impianti a GPL e Metano.",
  guarantees: [
    "Garanzia estesa su tutti i componenti dell'impianto",
    "Ricambi originali BRC sempre disponibili e certificati",
    "Software di diagnosi ufficiale e tarature telematiche costantemente aggiornate",
    "Assistenza su strada garantita su tutto il territorio nazionale tramite la rete BRC Gas Service"
  ],
  brandsHandled: [
    "BRC Gas Equipment",
    "Zavoli",
    "Landi Renzo",
    "Prins Autogassystemen",
    "Tartarini Auto",
    "OMVL"
  ]
};

export interface RegionalPriceData {
  region: string;
  isHomeRegion?: boolean;
  metanoKg: number;      // Prezzo medio regionale Metano al kg (€/kg)
  gplKg: number;         // Prezzo medio regionale GPL al kg (€/kg)
  gplLitro: number;      // Equivalente medio GPL al litro (€/L, densità ~0.54)
  benzinaLitro: number;  // Prezzo medio regionale Benzina al litro (€/L)
  benzinaKg: number;     // Equivalente Benzina al kg (€/kg, densità ~0.74)
}

export const regionalFuelPrices: Record<string, RegionalPriceData> = {
  "emilia-romagna": {
    region: "Emilia-Romagna (Sede Forlì)",
    isHomeRegion: true,
    metanoKg: 1.930,
    gplKg: 1.425,
    gplLitro: 0.770,
    benzinaLitro: 1.849,
    benzinaKg: 2.498
  },
  "lombardia": {
    region: "Lombardia",
    metanoKg: 1.935,
    gplKg: 1.435,
    gplLitro: 0.775,
    benzinaLitro: 1.855,
    benzinaKg: 2.507
  },
  "veneto": {
    region: "Veneto",
    metanoKg: 1.925,
    gplKg: 1.418,
    gplLitro: 0.766,
    benzinaLitro: 1.842,
    benzinaKg: 2.489
  },
  "toscana": {
    region: "Toscana",
    metanoKg: 1.945,
    gplKg: 1.442,
    gplLitro: 0.779,
    benzinaLitro: 1.862,
    benzinaKg: 2.516
  },
  "marche": {
    region: "Marche",
    metanoKg: 1.932,
    gplKg: 1.429,
    gplLitro: 0.772,
    benzinaLitro: 1.848,
    benzinaKg: 2.497
  },
  "italia-media": {
    region: "Media Nazionale Italia",
    metanoKg: 1.938,
    gplKg: 1.431,
    gplLitro: 0.773,
    benzinaLitro: 1.850,
    benzinaKg: 2.500
  }
};

// Aliased backward compatibility if needed
export const cityFuelPrices = regionalFuelPrices;

export interface AmortizationPreset {
  id: string;
  label: string;
  fuelType: 'metano' | 'gpl';
  cost: number;
  description: string;
  isRealQuote?: boolean;
}

export const amortizationPresets: AmortizationPreset[] = [
  {
    id: "polo-aw1-2bombole",
    label: "VW Polo AW1 (2 Bombole)",
    fuelType: "metano",
    cost: 200,
    description: "Sostituzione e collaudo bombole per Polo AW1 versione 2 bombole"
  },
  {
    id: "polo-aw1-3bombole",
    label: "VW Polo AW1 (3 Bombole)",
    fuelType: "metano",
    cost: 260,
    description: "Sostituzione e collaudo bombole per Polo AW1 versione 3 bombole"
  },
  {
    id: "metano-std-4anni",
    label: "Revisione Metano Standard",
    fuelType: "metano",
    cost: 220,
    description: "Collaudo quadriennale bombole con sostituzione a rotazione"
  },
  {
    id: "gpl-decennale-toroidale",
    label: "Sostituzione Serbatoio GPL 10 Anni",
    fuelType: "gpl",
    cost: 500,
    description: "Nuovo serbatoio toroidale e collaudo Motorizzazione Civile in sede"
  }
];

export const fuelApiConfig = {
  sourceName: "MIMIT — Osservaprezzi Carburanti",
  sourceUrl: "https://carburanti.mise.gov.it/ospz/api/",
  refreshInterval: "Giornaliero",
  note: "I prezzi medi provinciali vengono sincronizzati con l'Osservatorio Ministeriale delle Imprese e del Made in Italy."
};
