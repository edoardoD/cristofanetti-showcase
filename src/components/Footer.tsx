import React from "react";
import { companyData } from "@/data/cristofanettiData";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Phone, MapPin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Dal 1964 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight">
                CRISTOFANETTI
              </span>
              <Badge variant="accent" className="text-[10px] py-0.5 px-2">
                Dal 1964
              </Badge>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Officina specializzata in installazione, collaudo e manutenzione impianti a gas GPL e Metano per autoveicoli. Centro Autorizzato BRC Gas Service.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>{companyData.brcBadge}</span>
            </div>
          </div>

          {/* Col 2: Servizi Rapidi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Servizi Autofficina
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  Installazione Impianti GPL
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  Installazione & Manutenzione Metano
                </a>
              </li>
              <li>
                <a href="#normative" className="hover:text-white transition-colors font-medium text-slate-300">
                  Sostituzione Serbatoi GPL Decennale
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  Revisione Bombole Metano CNG-4
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  Tagliandi e Manutenzione Auto Gas
                </a>
              </li>
              <li>
                <a href="#servizi" className="hover:text-white transition-colors">
                  Ganci Traino e Collaudi
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Link Istituzionali */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Azienda & Garanzie
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#storia" className="hover:text-white transition-colors">
                  Chi Siamo &bull; Storia dal 1964
                </a>
              </li>
              <li>
                <a href="#brc" className="hover:text-white transition-colors">
                  Rete Ufficiale BRC Gas Service
                </a>
              </li>
              <li>
                <a href="#confronto" className="hover:text-white transition-colors">
                  Guida GPL vs Metano
                </a>
              </li>
              <li>
                <a href="#normative" className="hover:text-white transition-colors">
                  Normative ECE/ONU e Sanzioni
                </a>
              </li>
              <li>
                <a href="#simulatore" className="hover:text-white transition-colors font-medium text-sky-400">
                  Simulatore Ammortamento Revisione
                </a>
              </li>
              <li>
                <a href="#contatti" className="hover:text-white transition-colors">
                  Orari Officina & Come Raggiungerci
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Dati Fiscali e Recapiti */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Dati Societari & Sede
            </h4>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="text-slate-300 font-semibold">{companyData.legalName}</div>
              <div>{companyData.address}</div>
              <div>{companyData.cap} {companyData.city} ({companyData.province})</div>
              <div>P.IVA / C.F.: <span className="font-mono text-slate-300">{companyData.vatNumber}</span></div>
              <div className="pt-2 text-slate-300">
                Tel: <a href={`tel:${companyData.phone}`} className="hover:text-white font-bold">{companyData.phoneDisplay}</a>
              </div>
              <div>
                Email: <a href={`mailto:${companyData.email}`} className="hover:text-white">{companyData.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {currentYear} {companyData.legalName}. Tutti i diritti riservati.
          </div>
          <div className="flex items-center gap-4">
            <span>Sito Vetrina Ufficiale Istituzionale</span>
            <span>&bull;</span>
            <span>Forlì (FC) - Italia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
