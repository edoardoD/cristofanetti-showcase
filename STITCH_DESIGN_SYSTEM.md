# Google Stitch MCP & shadcn/ui Design System Specification

## 1. Project Overview & Identity
- **Entity**: Cristofanetti G.M. S.n.c. (Autofficina Impianti Gas dal 1964)
- **Domain**: Automotive Gas Systems (LPG / CNG / BRC Gas Service Partner)
- **Tone**: Established, highly authoritative, technological, customer-reassuring, compliant with Italian MCTC standards.

---

## 2. Color Palette & Visual Tokens (Design System)

| Token Name | Hex Code | Purpose / Usage |
|---|---|---|
| `brand-navy` | `#0A2540` | Primary brand tone, header background, dark cards, institutional strength |
| `brand-blue` | `#0284C7` | Gas flow electric blue, interactive highlights, icons, active tab states |
| `brand-accent` | `#DC2626` | BRC Gas Service Racing Red, high-priority CTAs, emergency 10-year deadline alerts |
| `brand-eco` | `#059669` | Eco CNG Green, Metano badges, environmental emission savings |
| `slate-dark` | `#071726` | Deep hero gradient and footer background |
| `slate-light` | `#F8FAFC` | Clean background for service cards and contrasting sections |

---

## 3. shadcn/ui Component Primitives Matrix

1. **Button**:
   - `variant="accent"`: Bold Red (`#DC2626`) with hover scaling for primary conversions ("Richiedi Preventivo", "Chiama Ora").
   - `variant="outline"`: High-contrast border with subtle backdrop-blur for secondary actions.
2. **Badge**:
   - `variant="accent"`: "Dal 1964", "Obbligo di Legge", "Centro Autorizzato BRC".
   - `variant="eco"`: "Risparmio fino al 60%", "Emissioni Zero PM10".
   - `variant="secondary"`: Categorical labels.
3. **Card**:
   - Elevated container with subtle slate border (`border-slate-200/90`), 24px border radius (`rounded-3xl`), and responsive padding.
   - Distinctive border highlight on the critical "Sostituzione Serbatoi Decennale" card.
4. **Accordion (Radix UI)**:
   - Interactive FAQ resolving driver concerns regarding ECE/ONU 67-01, fines, and in-house Motorizzazione Civile testing.
5. **Tabs (Radix UI)**:
   - Smooth switching between LPG (GPL) and CNG (Metano) technical specifications.
6. **Amortization Simulator Component**:
   - Interactive payback calculation engine designed with shadcn/ui Cards, Badges, and form inputs.
   - Live amortization formula factoring annual km, official MIMIT regional average fuel price per kg (Prezzo Medio Regionale al kg per Emilia-Romagna, Lombardia, Veneto, Toscana, Marche), and intervention cost (with real benchmark for VW Polo AW1: 2 bombole = 200 €, 3 bombole = 260 €).
   - Dynamic metrics: Payback period in months/days, break-even km, annual fuel savings, and net gain across the statutory 4-year (Metano) or 10-year (GPL) re-test cycle.
7. **Dialog & Sheet (Radix UI)**:
   - Floating vehicle consultation modal capturing customer car model and fuel requirements without page reloads.

---

## 4. Responsive Viewport Strategy
- **Mobile (<640px)**: Compact emergency bar, sticky hamburger menu with touch-friendly tap targets, single-column service cards, full-width click-to-call buttons.
- **Tablet (640px - 1024px)**: 2-column service grid, side-by-side technical comparison tabs, optimized typography.
- **Desktop (>1024px)**: 3-column service grid, expanded hero with live statistics cards, dual-pane contact & interactive Google Map layout.
