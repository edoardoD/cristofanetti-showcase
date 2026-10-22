import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cristofanetti G.M. | Impianti Gas Auto GPL e Metano Forlì dal 1964",
  description:
    "Officina specializzata in installazione impianti GPL e Metano, sostituzione serbatoi GPL decennale con collaudo Motorizzazione in sede, assistenza autorizzata BRC Gas Service a Forlì dal 1964.",
  keywords: [
    "impianti gpl forli",
    "impianti metano forli",
    "sostituzione serbatoi gpl forli",
    "collaudo bombole gpl decennale",
    "revisione bombole metano cng4",
    "brc gas service forli",
    "cristofanetti forli",
    "officina cristofanetti",
  ],
  authors: [{ name: "Cristofanetti G.M. S.n.c." }],
  openGraph: {
    title: "Cristofanetti G.M. | Impianti Gas Auto GPL e Metano Forlì dal 1964",
    description:
      "Specialisti in impianti GPL e Metano e sostituzione bombole decennale a Forlì. Partner ufficiale BRC Gas Service.",
    url: "https://www.cristofanetti.it",
    siteName: "Cristofanetti Impianti Gas Auto Forlì",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
