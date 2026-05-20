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

// ─── Nueva taxonomía POP v2.0 (Shop!/POPAI OMA Standards) ───────────────────

export type Lifespan = 'T' | 'SP' | 'P'

export const LIFESPANS = [
  {
    value: 'T' as Lifespan,
    label: 'Temporary',
    sublabel: '≤ 5 meses',
    desc: 'Campañas, lanzamientos, activaciones estacionales',
    color: 'amber',
  },
  {
    value: 'SP' as Lifespan,
    label: 'Semi-Permanent',
    sublabel: '1 – 12 meses',
    desc: 'Programas trimestrales, brand zones rotacionales',
    color: 'blue',
  },
  {
    value: 'P' as Lifespan,
    label: 'Permanent',
    sublabel: '≥ 6 meses (hasta 10 años)',
    desc: 'Fixturing, vendor shops, equipos de frío, kioscos',
    color: 'green',
  },
]

export interface DisplayType {
  value: string
  label: string
  lifespans: Lifespan[]
  materials: Record<Lifespan, string[]>
}

export interface POPCategory {
  value: string
  label: string
  emoji: string
  types: DisplayType[]
}

export const POP_TAXONOMY: POPCategory[] = [
  {
    value: 'floor-displays',
    label: 'Floor Displays',
    emoji: '🏪',
    types: [
      { value: 'pdq-tray', label: 'PDQ Tray (Pre-Designed Quantity)', lifespans: ['T'], materials: { T: ['Corrugado E-flute litho-laminated', 'Corrugado B-flute standard', 'Cartulina SBS litho-laminated', 'Cartulina plastificada'], SP: [], P: [] } },
      { value: 'shipper-display', label: 'Shipper Display', lifespans: ['T'], materials: { T: ['Corrugado B-flute standard', 'Corrugado BC-flute doble pared', 'Kraft liner natural', 'Corrugado C-flute'], SP: [], P: [] } },
      { value: 'full-pallet-display', label: 'Full Pallet Display (40″×48″)', lifespans: ['T', 'SP'], materials: { T: ['Corrugado BC-flute litho', 'Kraft liner + impresión directa'], SP: ['Corrugado triple pared', 'Pallet madera + skirt corrugado 360°'], P: [] } },
      { value: 'half-pallet-display', label: 'Half Pallet Display (20″×48″)', lifespans: ['T', 'SP'], materials: { T: ['Corrugado BC-flute litho', 'Honeycomb cardboard'], SP: ['Corrugado doble pared', 'Pallet madera + skirt'], P: [] } },
      { value: 'corrugated-floor-stand', label: 'Corrugated Floor Stand / FSDU', lifespans: ['T', 'SP'], materials: { T: ['Corrugado BC-flute litho-laminated', 'Corrugado B-flute + foil stamping', 'Corrugado kraft natural'], SP: ['Honeycomb cardboard', 'Corrugado doble pared reforzado'], P: [] } },
      { value: 'sidekick-power-wing', label: 'Sidekick / Power Wing', lifespans: ['T', 'SP'], materials: { T: ['Corrugado B/E-flute litho'], SP: ['PVC extruido', 'Alambre acero powder-coated', 'HIPS inyectado'], P: [] } },
      { value: 'dump-bin', label: 'Dump Bin', lifespans: ['T', 'SP'], materials: { T: ['Corrugado B-flute 200#'], SP: ['PVC rígido termoformado', 'Alambre acero powder-coated', 'Polipropileno (PP)', 'Metal lámina powder-coated'], P: [] } },
      { value: 'wire-metal-floor', label: 'Wire / Metal Floor Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Alambre acero cromado', 'Alambre acero powder-coated', 'Tubo acero redondo/cuadrado'], P: ['Lámina acero perforada', 'Aluminio extruido'] } },
      { value: 'injection-molded-floor', label: 'Injection-Molded Floor Stand', lifespans: ['SP', 'P'], materials: { T: [], SP: ['ABS inyectado', 'HIPS', 'PP'], P: ['HDPE', 'PC (policarbonato)'] } },
      { value: 'acrylic-premium-floor', label: 'Acrylic / Premium Floor Stand', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico extruido', 'PETG', 'PVC celuka'], P: ['Acrílico cast ≥3mm', 'Vidrio templado + metal'] } },
      { value: 'wooden-floor-display', label: 'Wooden Floor Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['MDF melamínico', 'Chapa natural'], P: ['MDF lacado', 'Madera sólida (pino/roble/bambú)', 'Madera recuperada'] } },
      { value: 'spinner-rack', label: 'Spinner Rack (360°)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Alambre acero powder-coated', 'Tubo acero + acrílico'], P: ['Tubo acero cromado', 'Metal lámina + PVC panels'] } },
      { value: 'hybrid-display', label: 'Hybrid Display (base permanente + gráficos intercambiables)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Metal/MDF base + corrugado litho panels', 'Metal + vinilo adhesivo'], P: ['Aluminio + fabric tension system'] } },
      { value: 'four-way-rack', label: '4-Way Rack / Four-Way Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Tubo acero powder-coated', 'MDF + metal combinado'], P: ['Tubo acero cromado', 'Tubo aluminio'] } },
    ],
  },
  {
    value: 'end-cap-displays',
    label: 'End Cap Displays',
    emoji: '📐',
    types: [
      { value: 'corrugated-end-cap', label: 'Corrugated End Cap (uso único)', lifespans: ['T'], materials: { T: ['Corrugado BC-flute litho-laminated', 'Corrugado doble pared', 'Kraft + flexografía', 'Honeycomb board'], SP: [], P: [] } },
      { value: 'custom-branded-end-cap', label: 'Custom Branded End Cap (full-bay)', lifespans: ['T', 'SP', 'P'], materials: { T: ['Corrugado litho'], SP: ['PVC foam board', 'MDF lacado'], P: ['Lámina metal powder-coated', 'Híbridos custom'] } },
      { value: 'end-cap-with-header', label: 'End Cap with Header / Topper', lifespans: ['T', 'SP'], materials: { T: ['Corrugado litho + cartulina SBS header', 'Foam board + PVC header'], SP: ['MDF + acrílico 3D header'], P: [] } },
      { value: 'multi-tier-end-cap', label: 'Multi-Tier / Waterfall End Cap', lifespans: ['SP', 'P'], materials: { T: [], SP: ['MDF lacado', 'Metal powder-coated', 'Acrílico', 'Wire chrome'], P: ['Vidrio + metal'] } },
      { value: 'power-aisle-end-cap', label: 'Power Aisle End Cap (racetrack + LED)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Metal + acrílico + LED strips', 'MDF lacado + LEDs embutidos'], P: ['Aluminio extruido + fabric panels'] } },
      { value: 'digital-end-cap', label: 'Digital End Cap (pantalla LCD integrada)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Metal housing + LCD panel', 'MDF + pantalla + media player'], P: ['Aluminio + OLED'] } },
      { value: 'checkout-impulse-end-cap', label: 'Checkout / Impulse End Cap', lifespans: ['T', 'SP', 'P'], materials: { T: ['Corrugado E/B-flute'], SP: ['PVC foam board', 'MDF'], P: ['Metal wire'] } },
    ],
  },
  {
    value: 'shelf-displays',
    label: 'Shelf Displays',
    emoji: '📦',
    types: [
      { value: 'shelf-strip', label: 'Shelf Strip / Edge Strip / Cenefa', lifespans: ['T', 'SP'], materials: { T: ['PVC 10 mil', 'Cartulina SBS laminada', 'Papel couché laminado'], SP: ['Poliestireno HIPS', 'Magnetic PVC strip'], P: [] } },
      { value: 'shelf-talker', label: 'Shelf Talker / Hablador', lifespans: ['T', 'SP'], materials: { T: ['Cartulina SBS 14–18pt', 'Papel laminado'], SP: ['PVC 10 mil', 'Poliestireno', 'Sintético Teslin®'], P: [] } },
      { value: 'shelf-wobbler', label: 'Shelf Wobbler / Rompetráfico', lifespans: ['T', 'SP'], materials: { T: ['PVC flexible + cartulina SBS'], SP: ['PETG', 'PP biaxialmente orientado (BOPP)'], P: [] } },
      { value: 'shelf-blade-stopper', label: 'Shelf Blade / Aisle Violator / Stopper', lifespans: ['T', 'SP'], materials: { T: ['Foam board', 'Corrugado E-flute', 'Cartulina SBS laminada'], SP: ['PVC expandido Sintra®/Komatex®', 'Poliestireno', 'Acrílico 2mm'], P: [] } },
      { value: 'shelf-ready-packaging', label: 'Shelf-Ready Packaging (SRP / RRP)', lifespans: ['T'], materials: { T: ['Corrugado E-flute', 'Corrugado B-flute', 'Cartulina SBS litho-laminated', 'Kraft liner blanqueado'], SP: [], P: [] } },
      { value: 'shelf-pusher-divider', label: 'Shelf Pusher / Divider (spring-loaded)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico', 'PVC rígido', 'Polipropileno'], P: ['Policarbonato', 'HDPE'] } },
      { value: 'clip-strip', label: 'Clip Strip / Strip Merchandiser', lifespans: ['T', 'SP'], materials: { T: ['PVC transparente'], SP: ['HDPE', 'Alambre acero', 'Polipropileno natural'], P: [] } },
      { value: 'channel-strip', label: 'Channel Strip / Price Channel Insert', lifespans: ['T', 'SP'], materials: { T: ['PVC 10 mil', 'Adhesivo repositionable'], SP: ['Poliestireno HIPS', 'Magnetic PVC'], P: [] } },
      { value: 'on-shelf-vinyl', label: 'On-Shelf Vinyl Wrap / Branding Strip', lifespans: ['T', 'SP'], materials: { T: ['Vinilo adhesivo repositionable', 'Low-tack vinyl'], SP: ['Vinilo laminado mate/gloss'], P: [] } },
      { value: 'electronic-shelf-label', label: 'Electronic Shelf Label (ESL)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['E-paper B/W/R/Y'], P: ['LED strip P1.8', 'Marco ABS + batería Li-ion'] } },
    ],
  },
  {
    value: 'counter-checkout',
    label: 'Counter / Checkout Displays',
    emoji: '🛒',
    types: [
      { value: 'counter-mat', label: 'Counter Mat / Bar Rail Mat', lifespans: ['T', 'SP', 'P'], materials: { T: ['Foam EVA con vinilo superior'], SP: ['Vinilo Vynex® PVC duro', 'Neopreno'], P: ['Policarbonato Krystex®', 'Caucho vulcanizado'] } },
      { value: 'countertop-display-cdu', label: 'Countertop Display Unit (CDU)', lifespans: ['T', 'SP', 'P'], materials: { T: ['Corrugado litho-laminated', 'Corrugado E-flute'], SP: ['Acrílico', 'Alambre acero powder-coated', 'HIPS inyectado'], P: ['MDF lacado'] } },
      { value: 'pdq-counter-tray', label: 'PDQ Counter Tray', lifespans: ['T'], materials: { T: ['Corrugado E/B-flute litho', 'Cartulina SBS', 'Polipropileno PP'], SP: [], P: [] } },
      { value: 'counter-spinner', label: 'Counter Spinner (giratoria countertop)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Alambre acero powder-coated', 'Tubo acero + panels acrílico'], P: ['Metal + PVC panels'] } },
      { value: 'acrylic-counter-display', label: 'Acrylic Counter Display (vape, suplementos, joyería)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico cast 3–5mm', 'PETG', 'PVC celuka'], P: ['Vidrio templado', 'Acrílico + metal base'] } },
      { value: 'bottle-topper-neck-hanger', label: 'Bottle Topper / Neck Hanger / Collarín', lifespans: ['T'], materials: { T: ['Cartulina SBS 14–18pt', 'PVC die-cut', 'ElastiTag® banda elástica', 'Cartulina kraft', 'PP sintético'], SP: [], P: [] } },
      { value: 'brochure-holder', label: 'Brochure / Literature Holder', lifespans: ['T', 'SP', 'P'], materials: { T: ['Corrugado ship-flat'], SP: ['Acrílico estándar', 'PVC cristal', 'Metal wire'], P: ['Poliestireno cristal'] } },
      { value: 'tester-stand', label: 'Tester Stand / Sample Dispenser', lifespans: ['SP', 'P'], materials: { T: [], SP: ['MDF lacado + acrílico', 'ABS inyectado'], P: ['Acrílico + metal + LED', 'Metal powder-coated + vidrio', 'ABS inyectado + pantalla'] } },
    ],
  },
  {
    value: 'wall-displays',
    label: 'Wall Displays',
    emoji: '🖼️',
    types: [
      { value: 'slatwall-panel', label: 'Slatwall Panel', lifespans: ['SP', 'P'], materials: { T: [], SP: ['MDF melamínico'], P: ['MDF lacado', 'PVC humidity-resistant extruido', 'Metal aluminio extruido', 'Madera canaletada natural'] } },
      { value: 'gridwall-panel', label: 'Gridwall / Wire Grid Panel', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Alambre acero cromado 4mm', 'Alambre powder-coated'], P: ['Acero galvanizado', 'Panel aluminio grid'] } },
      { value: 'pegboard', label: 'Pegboard / Pegwall', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Hardboard perforado 1/4″', 'MDF perforado'], P: ['Metal lámina perforada', 'PVC perforado'] } },
      { value: 'wall-mural', label: 'Wall Mural / Large Format Graphic', lifespans: ['T', 'SP', 'P'], materials: { T: ['Vinilo adhesivo laminado', 'Papel fotográfico laminado'], SP: ['Fabric backlit', 'Mesh impreso perforado'], P: ['Dibond® aluminio'] } },
      { value: 'brand-wall', label: 'Brand Wall / Experiential Wall', lifespans: ['P'], materials: { T: [], SP: [], P: ['MDF lacado + metal + acrílico + LED', 'Aluminio + fabric tensionado + pantallas', 'Combinaciones custom alta gama'] } },
    ],
  },
  {
    value: 'hanging-overhead',
    label: 'Hanging / Overhead Displays',
    emoji: '🎪',
    types: [
      { value: 'ceiling-dangler', label: 'Ceiling Dangler (3–4 caras, hexagonal)', lifespans: ['T'], materials: { T: ['PVC rígido impreso', 'Foam board', 'Corrugado E-flute litho', 'Cartulina SBS laminada', 'Policarbonato transparente'], SP: [], P: [] } },
      { value: 'hanging-banner', label: 'Hanging Banner (vertical o horizontal)', lifespans: ['T', 'SP'], materials: { T: ['Vinilo 13oz scrim', 'Vinilo 10oz banner', 'Paper banner'], SP: ['Tela tensionada polyester', 'Mesh perforado'], P: [] } },
      { value: 'flag-blade-sign', label: 'Flag / Blade Sign (perpendicular a la pared)', lifespans: ['T', 'SP', 'P'], materials: { T: ['Foam board', 'Corrugado E-flute'], SP: ['PVC rígido', 'Foam board'], P: ['Acrílico 3mm', 'Dibond®'] } },
      { value: 'aisle-marker', label: 'Aisle Marker (suspendido, 18–30″H)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico', 'PVC rígido'], P: ['Lightbox aluminio + LED', 'Metal powder-coated + vinilo'] } },
    ],
  },
  {
    value: 'window-displays',
    label: 'Window Displays',
    emoji: '🪟',
    types: [
      { value: 'window-cling', label: 'Window Cling / Static Cling', lifespans: ['T'], materials: { T: ['PVC altamente plastificado 7–8 mil', 'Poliéster static cling', 'Vinilo cling transparente/blanco'], SP: [], P: [] } },
      { value: 'window-decal', label: 'Window Decal / Low-Tack Adhesive', lifespans: ['T', 'SP'], materials: { T: ['PVC 4 mil + low-tack adhesivo', 'Vinilo transparente'], SP: ['Vinilo laminado UV', 'Vinilo perforado one-way vision'], P: [] } },
      { value: 'window-banner-mesh', label: 'Window Banner / Perforated Mesh', lifespans: ['T', 'SP'], materials: { T: ['Mesh 65/35 perforado polyester'], SP: ['Vinilo mesh impreso', 'Tela mesh resistente UV'], P: [] } },
      { value: 'vinyl-window-wrap', label: 'Vinyl Window Wrap (cubre totalidad de vitrina)', lifespans: ['T', 'SP'], materials: { T: ['Vinilo opaco adhesivo'], SP: ['Vinilo perforated one-way vision', 'Vinilo translúcido backlit'], P: [] } },
      { value: 'led-backlit-window', label: 'LED / Backlit Window Graphic', lifespans: ['T', 'SP', 'P'], materials: { T: ['Duratrans/lightjet + backlit frame aluminio'], SP: ['LED film transparente'], P: ['Marco aluminio SEG + fabric dye-sub'] } },
    ],
  },
  {
    value: 'cooler-refrigerator',
    label: 'Cooler / Refrigerator Displays',
    emoji: '🧊',
    types: [
      { value: 'cooler-door-cling', label: 'Cooler Door Cling', lifespans: ['T'], materials: { T: ['Static cling 8 mil PVC', 'Low-tack PVC 4 mil', 'Vinilo cling polyester resistente a condensación'], SP: [], P: [] } },
      { value: 'cooler-topper', label: 'Cooler Topper / Crowner', lifespans: ['T', 'SP'], materials: { T: ['Corrugado litho-laminated', 'Foam board'], SP: ['PVC rígido', 'Acrílico', 'Metal lámina'], P: [] } },
      { value: 'freezer-wrap', label: 'Freezer Wrap / Cold Case Wrap', lifespans: ['T', 'SP'], materials: { T: ['Vinilo 4–7 mil + adhesivo criogénico (-18°C)'], SP: ['Vinilo laminado UV', 'Vinilo opaco blanco + overlaminate'], P: [] } },
      { value: 'bottle-glider', label: 'Bottle Glider / Shelf Pusher for Cooler', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico + resorte', 'PVC rígido + gravity-fed system'], P: ['Policarbonato + resorte acero inox'] } },
      { value: 'branded-cooler', label: 'Branded Cooler / Refrigerador de Marca', lifespans: ['P'], materials: { T: [], SP: [], P: ['Cuerpo acero galvanizado', 'Aislamiento poliuretano inyectado', 'Compresor hermético', 'LED interior', 'Puerta vidrio templado'] } },
    ],
  },
  {
    value: 'signage-wayfinding',
    label: 'Signage & Wayfinding',
    emoji: '🪧',
    types: [
      { value: 'shelf-aisle-sign', label: 'Shelf / Aisle Sign', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico', 'PVC rígido'], P: ['Metal powder-coated', 'Aluminio extruido', 'Dibond®'] } },
      { value: 'a-frame-sandwich', label: 'A-Frame / Sandwich Board', lifespans: ['T', 'SP', 'P'], materials: { T: ['Corrugado doble pared'], SP: ['PVC + gráfica UV', 'Aluminio + insert reemplazable'], P: ['MDF lacado', 'Madera'] } },
      { value: 'floor-decal', label: 'Floor Decal / Floor Graphic', lifespans: ['T', 'SP'], materials: { T: ['Vinilo 3.5 mil + laminación anti-slip'], SP: ['Vinilo 5 mil ultra-resistente', 'Alfombra impresa con grip'], P: [] } },
      { value: 'price-burst-sign', label: 'Price / Burst Sign', lifespans: ['T'], materials: { T: ['Cartulina litho', 'PVC 10 mil', 'Foam board', 'Papel offset laminado'], SP: [], P: [] } },
      { value: 'menu-board', label: 'Menu Board (static o digital)', lifespans: ['T', 'SP', 'P'], materials: { T: ['PVC inyectado'], SP: ['Metal + vinilo'], P: ['LCD/LED digital 24/7', 'Aluminio + insert reemplazable'] } },
    ],
  },
  {
    value: 'headers-toppers',
    label: 'Headers / Toppers',
    emoji: '🎯',
    types: [
      { value: 'header-card-topper', label: 'Header Card / Topper / Crowner (estándar)', lifespans: ['T'], materials: { T: ['Corrugado litho-laminated', 'Cartulina SBS', 'Foam board', 'PVC foam board', 'Corrugado E-flute'], SP: [], P: [] } },
      { value: 'die-cut-shaped-header', label: 'Die-Cut / Shaped Header (esculpido)', lifespans: ['T', 'SP'], materials: { T: ['Corrugado litho die-cut', 'Foam board die-cut', 'Cartulina SBS litho'], SP: ['PVC die-cut', 'Gatorfoam'], P: [] } },
      { value: '3d-thermoformed-topper', label: '3D / Thermoformed Topper', lifespans: ['SP', 'P'], materials: { T: [], SP: ['HIPS termoformado', 'PVC termoformado', 'PETG termoformado'], P: ['ABS', 'Espuma alta densidad pintada'] } },
      { value: 'pallet-crowner', label: 'Pallet Crowner (sobre pallet display)', lifespans: ['T', 'SP'], materials: { T: ['Corrugado BC-flute litho', 'Foam board'], SP: ['PVC impreso', 'Corrugado doble pared'], P: [] } },
      { value: 'tear-pad', label: 'Tear Pad / Take-One Pad', lifespans: ['T'], materials: { T: ['Cartulina SBS 80–100 lb text', 'Base PVC 30 mil', 'Base corrugado E-flute'], SP: [], P: [] } },
      { value: 'lightbox-header', label: 'Light Box Header / Marquee', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Marco aluminio + fabric dye-sub + LED edge-lit'], P: ['Acrílico + LED', 'PVC + LED strip'] } },
    ],
  },
  {
    value: 'specialty-premium',
    label: 'Specialty & Premium Displays',
    emoji: '✨',
    types: [
      { value: 'glorifier', label: 'Glorifier (hero SKU elevado con LED halo)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Acrílico glossy cast + LED', 'MDF lacado piano finish + LED'], P: ['Aluminio anodizado + acrílico', 'Vidrio templado + metal', 'PETG + LEDs RGB'] } },
      { value: 'pedestal-plinth', label: 'Pedestal / Plinth Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['MDF lacado', 'Acrílico', 'PVC expandido'], P: ['Microcement sobre MDF', 'Metal powder-coated', 'Madera maciza'] } },
      { value: 'lightbox-seg-frame', label: 'Light Box / SEG Frame', lifespans: ['T', 'SP', 'P'], materials: { T: ['Perfil aluminio + fabric dye-sub + LED edge-lit'], SP: ['Aluminio snap frame + Duratrans + LED backlit'], P: [] } },
      { value: 'inflatable-display', label: 'Inflatable Display (activaciones outdoor)', lifespans: ['T'], materials: { T: ['PVC vinyl 18oz welded seams', 'Nylon ripstop 420D', 'Oxford polyester', 'Vinilo 14oz con válvula'], SP: [], P: [] } },
      { value: 'holographic-led', label: 'Holographic / POV LED Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Disco LED rotating + housing aluminio'], P: ['LED fan blade 3D', 'Motor brushless + LEDs SMD'] } },
    ],
  },
  {
    value: 'digital-interactive',
    label: 'Digital & Interactive Displays',
    emoji: '📱',
    types: [
      { value: 'digital-signage-screen', label: 'Digital Signage Screen (standalone LCD/LED)', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Gabinete metal/ABS + panel LCD commercial grade 24/7'], P: ['LED indoor P2–P3 + structure aluminio'] } },
      { value: 'digital-kiosk', label: 'Digital Kiosk (táctil self-service)', lifespans: ['P'], materials: { T: [], SP: [], P: ['Gabinete acero SPCC powder-coated + touchscreen PCAP', 'Aluminio + vidrio templado + PCAP'] } },
      { value: 'ar-display', label: 'AR Display / AR Mirror', lifespans: ['SP', 'P'], materials: { T: [], SP: ['Pantalla OLED/LCD + cámaras RGB-D'], P: ['PC edge computing', 'Semi-transparente display + sensores'] } },
      { value: 'motion-activated', label: 'Talking / Motion-Activated Display', lifespans: ['SP', 'P'], materials: { T: [], SP: ['PIR sensor + speaker + media player + housing ABS'], P: ['Computer vision + LED + housing metal'] } },
      { value: 'qr-nfc-point', label: 'QR Code / NFC Point', lifespans: ['T', 'SP', 'P'], materials: { T: ['Vinilo impreso adhesivo'], SP: ['PVC rígido impreso'], P: ['NFC tag embebido en PVC o metal'] } },
    ],
  },
]

// Helpers para filtrar por vida útil
export function getCategoriesForLifespan(lifespan: Lifespan): POPCategory[] {
  return POP_TAXONOMY.map(cat => ({
    ...cat,
    types: cat.types.filter(t => t.lifespans.includes(lifespan)),
  })).filter(cat => cat.types.length > 0)
}

export function getTypesForCategoryAndLifespan(categoryValue: string, lifespan: Lifespan): DisplayType[] {
  const cat = POP_TAXONOMY.find(c => c.value === categoryValue)
  if (!cat) return []
  return cat.types.filter(t => t.lifespans.includes(lifespan))
}

export function getMaterialsForTypeAndLifespan(categoryValue: string, typeValue: string, lifespan: Lifespan): string[] {
  const cat = POP_TAXONOMY.find(c => c.value === categoryValue)
  if (!cat) return []
  const type = cat.types.find(t => t.value === typeValue)
  if (!type) return []
  return type.materials[lifespan] ?? []
}

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
