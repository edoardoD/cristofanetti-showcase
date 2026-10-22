"use client";

import React, { useState } from "react";
import { companyData } from "@/data/cristofanettiData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle2, Send, Car, ShieldCheck } from "lucide-react";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteDialog({ open, onOpenChange }: QuoteDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    veicolo: "",
    servizio: "sostituzione-gpl-10",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="text-[10px] uppercase font-bold py-0.5 px-2">
              Preventivo Rapido
            </Badge>
            <span className="text-xs font-semibold text-slate-500">
              Officina Cristofanetti Forlì
            </span>
          </div>
          <DialogTitle className="text-xl font-black text-slate-900">
            Richiedi Informazioni o Preventivo
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-600">
            Compila i dati della vettura: un nostro tecnico valuterà la compatibilità e ti contatterà con il miglior preventivo.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Richiesta Ricevuta!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Grazie <strong>{formData.nome || "Gentile Cliente"}</strong>. Abbiamo registrato la tua richiesta per <strong>{formData.veicolo || "la tua vettura"}</strong>. Ti ricontatteremo a breve al numero fornito.
            </p>
            <div className="pt-4 border-t border-slate-100">
              <Button onClick={handleReset} variant="outline" className="w-full">
                Chiudi
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nome e Cognome *</label>
              <input
                required
                type="text"
                placeholder="Es. Mario Rossi"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Numero di Telefono *</label>
              <input
                required
                type="tel"
                placeholder="Es. 333 1234567"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Vettura (Marca, Modello, Anno, Cilindrata/kW) *</label>
              <input
                required
                type="text"
                placeholder="Es. Fiat Panda 1.2 2014 oppure VW Golf TSI"
                value={formData.veicolo}
                onChange={(e) => setFormData({ ...formData, veicolo: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tipo di Intervento Richiesto</label>
              <select
                value={formData.servizio}
                onChange={(e) => setFormData({ ...formData, servizio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="sostituzione-gpl-10">Sostituzione Serbatoio GPL Decennale (Obbligo 10 anni)</option>
                <option value="nuovo-gpl">Installazione Nuovo Impianto GPL</option>
                <option value="nuovo-metano">Installazione Nuovo Impianto Metano</option>
                <option value="revisione-metano">Revisione / Collaudo Bombole Metano</option>
                <option value="tagliando-gas">Tagliando & Manutenzione Impianto Gas</option>
                <option value="gancio-traino">Installazione Gancio Traino</option>
                <option value="altro">Altra Richiesta / Consulenza</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Note Aggiuntive (Opzionale)</label>
              <textarea
                rows={2}
                placeholder="Dettagli aggiuntivi, scadenze revisione, ecc."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="accent" className="w-full py-3 font-bold gap-2">
                <Send className="w-4 h-4" />
                Invia Richiesta Preventivo
              </Button>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400">
              Oppure chiama direttamente:{" "}
              <a href={`tel:${companyData.phone}`} className="font-bold text-slate-800 hover:text-brand-blue">
                {companyData.phoneDisplay}
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
