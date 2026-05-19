import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const COMMERCIAL_OBJECTIVES = [
  'Impulso de compra',
  'Lanzamiento de producto nuevo',
  'Visibilidad y notoriedad de marca',
  'Rotación / sell-out de inventario',
  'Experiencia de marca / brand experience',
  'Activación promocional / precio especial',
  'Educación de producto',
  'Cross-merchandising / venta cruzada',
]

export const CHANNELS = [
  'Supermercado / hipermercado',
  'Tienda de conveniencia',
  'Farmacia / droguería',
  'Dollar store',
  'Club store (Costco / Sam\'s)',
  'HORECA',
  'Duty free',
  'Specialty store',
  'E-commerce pickup zone',
  'Pop-up / evento',
]

export const GEOGRAPHIC_MARKETS = [
  'USA',
  'Puerto Rico',
  'Caribe anglófono',
  'Centroamérica',
  'Colombia',
  'LATAM (general)',
  'Otro',
]

export const POP_CATEGORIES = [
  { value: 'floor-display', label: 'Floor Display (Display de Piso)' },
  { value: 'end-cap', label: 'End Cap (Cabecera de Góndola)' },
  { value: 'shelf-display', label: 'Shelf Display (Display de Estante)' },
  { value: 'counter-display', label: 'Counter Display (Display de Mostrador)' },
  { value: 'wall-display', label: 'Wall Display (Display de Pared)' },
  { value: 'signage', label: 'Signage y Elementos Complementarios' },
]

export const POP_SUBTYPES: Record<string, { value: string; label: string }[]> = {
  'floor-display': [
    { value: 'cardboard-floor-stand', label: 'Cardboard Floor Stand (con bandejas)' },
    { value: 'pallet-4way', label: '4-Way / Pallet Display (club store)' },
    { value: 'dump-bin', label: 'Dump Bin (canasta a granel)' },
    { value: 'popup-store', label: 'Pop-up Store / Shop-in-Shop' },
    { value: 'kiosk', label: 'Kiosk Display' },
    { value: 'spinner', label: 'Spinner Rack (giratorio)' },
  ],
  'end-cap': [
    { value: 'flat-panel', label: 'End Cap Flat Panel (panel plano)' },
    { value: 'sculptured-header', label: 'End Cap con Cabezote 3D Termoformado' },
  ],
  'shelf-display': [
    { value: 'stopper', label: 'Stopper / Aisle Violator' },
    { value: 'shelf-blocker', label: 'Shelf Blocker / Divider' },
    { value: 'shelf-strip', label: 'Shelf Strip / Shelf Talker' },
    { value: 'sidekick', label: 'Sidekick / Power Wing' },
    { value: 'sidrack', label: 'Sidrack (rack lateral)' },
    { value: 'clip-strip', label: 'Clip Strip' },
  ],
  'counter-display': [
    { value: 'counter-pdq', label: 'Counter Display / PDQ' },
    { value: 'glorifier', label: 'Glorifier (pedestal premium)' },
  ],
  'wall-display': [
    { value: 'backwall', label: 'Wall Display / Backwall' },
    { value: 'balcony', label: 'Refrigerator Balcony (frente de nevera)' },
  ],
  'signage': [
    { value: 'wobbler', label: 'Wobbler' },
    { value: 'hanging-sign', label: 'Banderola / Hanging Sign' },
    { value: 'totem', label: 'Totem / Tower Display' },
  ],
}

export const MATERIALS = [
  'E-flute corrugated cardboard (cartón E-flute)',
  'B-flute corrugated cardboard (cartón B-flute)',
  'C-flute corrugated cardboard (cartón C-flute)',
  'Double-wall corrugated (BC-flute doble)',
  'High-gloss litho-laminated panels',
  'Matte-laminated panels',
  'Thermoformed PETG plastic (termoformado PETG)',
  'Thermoformed HIPS plastic (termoformado HIPS)',
  'Rigid PVC (PVC rígido)',
  'Clear acrylic / PMMA (acrílico)',
  'Coroplast (corrugado plástico)',
  'MDF with lacquer finish',
  'Natural wood / plywood',
  'Steel wire / Powder-coated steel',
  'Extruded aluminum',
  'LED strip lighting',
  'LED lightbox panel',
  'Spot UV varnish',
  'Foil stamping (gold/silver)',
  'Embossing / relieve',
]

export const CAMERA_ANGLES = [
  { value: 'frontal', label: 'Frontal centrado (hero shot)' },
  { value: 'three-quarter-35', label: '3/4 — 35° (recomendado)' },
  { value: 'three-quarter-45', label: '3/4 — 45°' },
  { value: 'lateral', label: 'Lateral / perfil' },
  { value: 'bird-eye', label: 'Picado / bird\'s eye (desde arriba)' },
  { value: 'low-angle', label: 'Contrapicado / low angle (desde abajo)' },
  { value: 'shopper-pov', label: 'POV del shopper (eye level 165cm)' },
  { value: 'macro', label: 'Detalle macro (un elemento)' },
]

export const LIGHTING_OPTIONS = [
  { value: 'studio-3point', label: 'Studio softbox 3-point (render comercial)' },
  { value: 'retail-cold', label: 'Retail frío 4500K (supermercado real)' },
  { value: 'retail-warm', label: 'Retail cálido 2800K (tienda premium)' },
  { value: 'golden-hour', label: 'Golden hour / luz natural exterior' },
  { value: 'chiaroscuro', label: 'Dramática / chiaroscuro (licores, beauty lujo)' },
  { value: 'cinematic', label: 'Cinemática (con lens flare)' },
]

export const MOODS = [
  'Premium / aspiracional',
  'Familiar / warm',
  'Energético / bold',
  'Festivo / seasonal',
  'Minimalista / clean',
  'Tech / futurista',
  'Orgánico / natural',
  'Nostálgico / retro',
]

export const COLOR_GRADINGS = [
  { value: 'clean-commercial', label: 'Limpio comercial (colores fieles)' },
  { value: 'cinematic-muted', label: 'Cinemático muted' },
  { value: 'vibrant-saturated', label: 'Vibrante saturado (+20% saturación)' },
  { value: 'pastel-soft', label: 'Pastel / soft (tonos suaves)' },
  { value: 'high-contrast', label: 'Contraste alto (negros profundos)' },
  { value: 'warm-tone', label: 'Warm tone (dorados, naranjas)' },
  { value: 'cool-blue', label: 'Cool / blue tone (frescos, cian)' },
]

export const ASPECT_RATIOS = [
  { value: '4:5', label: '4:5 — Instagram feed vertical (recomendado)' },
  { value: '16:9', label: '16:9 — Presentación / YouTube' },
  { value: '1:1', label: '1:1 — Feed cuadrado' },
  { value: '9:16', label: '9:16 — Story / Reel' },
  { value: '3:2', label: '3:2 — Impresión estándar' },
  { value: '21:9', label: '21:9 — Banner LinkedIn' },
]
