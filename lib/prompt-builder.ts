import type { Phase1Data, Phase2Data, Phase3Data, Phase4Data, RenderMode, GeneratedPrompts } from '@/types'

const CAMERA_SPECS: Record<string, string> = {
  'frontal': 'shot on Canon EOS R5 with 85mm prime lens at f/8, three-point softbox studio lighting',
  'three-quarter-35': 'shot on Canon EOS R5 with 85mm prime lens at f/8',
  'three-quarter-45': 'shot on Canon EOS R5 with 50mm prime lens at f/8',
  'lateral': 'shot on Canon EOS R5 with 85mm prime lens at f/8',
  'bird-eye': 'shot on Sony A7 IV with 24mm wide-angle lens at f/11',
  'low-angle': 'shot on Leica SL2 with 35mm lens at f/4, looking up at the display',
  'shopper-pov': 'shot on Sony A7 IV with 35mm lens at f/4, handheld at eye level 165cm',
  'macro': 'shot on Canon EOS R5 with 100mm macro lens at f/4',
}

const ANGLE_TERMS: Record<string, string> = {
  'frontal': 'straight-on front view, perfectly centered, eye level',
  'three-quarter-35': 'three-quarter angle at 35 degrees, showing front and right side panel',
  'three-quarter-45': 'three-quarter angle at 45 degrees, showing front and side panel equally',
  'lateral': 'side profile view, 90-degree lateral angle',
  'bird-eye': 'high angle bird\'s-eye view from above, looking down at the display',
  'low-angle': 'dramatic low-angle worm\'s-eye view looking upward at 20 degrees from floor level',
  'shopper-pov': 'shopper\'s point-of-view at 165cm eye level, approaching the display',
  'macro': 'close-up macro detail shot',
}

const LIGHTING_TERMS: Record<string, string> = {
  'studio-3point': 'three-point softbox studio lighting with key light, fill light, and rim light, white seamless background',
  'retail-cold': 'fluorescent overhead retail lighting at 4500K, typical supermarket cold white LED ceiling lights',
  'retail-warm': 'warm halogen-style retail spotlights at 2800K, premium retail warm LED downlighting',
  'golden-hour': 'natural golden hour sunlight at 15 degrees, soft warm outdoor lighting',
  'chiaroscuro': 'dramatic chiaroscuro lighting with strong directional key light from upper-left and deep shadows',
  'cinematic': 'cinematic lighting setup with anamorphic lens flare, motivated by a window source at 45 degrees',
}

const BACKGROUND_TERMS: Record<string, string> = {
  'commercial': 'clean white seamless background, studio product photography',
  'instore': 'in-store retail environment context',
  'hybrid': 'stylized product scene with minimal props, editorial retail render',
}

const GRADING_TERMS: Record<string, string> = {
  'clean-commercial': 'clean color grade, accurate white balance, no stylization',
  'cinematic-muted': 'cinematic color grade, lifted shadows, muted highlights, film-inspired',
  'vibrant-saturated': 'highly saturated color grade, vivid brand colors, punchy contrast',
  'pastel-soft': 'pastel color palette, soft tones, airy and light color grade',
  'high-contrast': 'high contrast color grade, deep blacks, bright highlights',
  'warm-tone': 'warm color temperature shift, golden tones, cozy ambiance',
  'cool-blue': 'cool color temperature, blue-tinted shadows, crisp and fresh tone',
}

function buildDisplayDescription(p2: Phase2Data): string {
  const dims = `${p2.dimensions.height}cm tall × ${p2.dimensions.width}cm wide × ${p2.dimensions.depth}cm deep`
  const materials = p2.materials.slice(0, 3).join(', ')
  const shelves = p2.shelvesCount ? `with ${p2.shelvesCount} horizontal shelves` : ''
  const facings = p2.facingsPerShelf ? `holding ${p2.facingsPerShelf} facings per shelf` : ''
  const header = p2.hasHeader ? `, featuring a ${p2.headerType || 'flat rectangular'} header topper` : ''
  const lighting = p2.internalLighting ? `, with integrated ${p2.lightingType || 'LED strip'} internal lighting` : ''

  return `${dims}, constructed from ${materials} ${shelves} ${facings}${header}${lighting}`.trim().replace(/\s+/g, ' ')
}

function buildMainPrompt(
  renderMode: RenderMode,
  p1: Phase1Data,
  p2: Phase2Data,
  p3: Phase3Data,
  p4: Phase4Data,
): string {
  const display = buildDisplayDescription(p2)
  const angle = ANGLE_TERMS[p3.cameraAngle] || 'three-quarter angle at 35 degrees'
  const lighting = LIGHTING_TERMS[p3.lighting] || LIGHTING_TERMS['studio-3point']
  const background = BACKGROUND_TERMS[renderMode]
  const grading = GRADING_TERMS[p3.colorGrading] || GRADING_TERMS['clean-commercial']
  const cameraSpecs = p3.cameraSpecs || CAMERA_SPECS[p3.cameraAngle] || CAMERA_SPECS['three-quarter-35']
  const mood = p3.mood ? `${p3.mood} aesthetic,` : ''
  const displayText = p4.displayText
    ? `Render the text "${p4.displayText}" in ${p4.displayTextFont || 'bold white sans-serif'} font on the header panel, clearly legible.`
    : ''
  const skuInfo = p2.facingsPerShelf
    ? `Each shelf holds exactly ${p2.facingsPerShelf} facings of [PRODUCT SKU — attach reference image], product label facing forward, gravity-compliant, neatly stocked.`
    : 'The display is fully stocked with product on every shelf, neatly arranged, product labels facing forward.'
  const brandColor = '[BRAND PRIMARY COLOR — confirm with client]'

  return `Generate a photorealistic ${renderMode === 'instore' ? 'in-store photograph' : 'studio product render'} of a ${p2.popSubtype || p2.popCategory} display for [${p1.featuredProducts || 'BRAND NAME'}].

The display is ${display}. Primary brand color: ${brandColor}. The header features the brand logo centered in bold white typography${p2.hasBase ? '. The base kickplate carries the brand identity' : ''}.

${skuInfo}

${displayText}

Camera: ${angle}, ${cameraSpecs}. Lighting: ${lighting}. Background: ${background}. Style: ${mood} ${grading}, sharp focus across the entire display from header to base.`.trim()
}

function buildVariantA(
  renderMode: RenderMode,
  p1: Phase1Data,
  p2: Phase2Data,
  p3: Phase3Data,
  p4: Phase4Data,
): string {
  const altAngle = p3.cameraAngle === 'frontal'
    ? 'three-quarter angle at 35 degrees, showing front and right side panel'
    : 'straight-on front view, perfectly centered, symmetrical composition'
  const altCameraSpecs = 'shot on Canon EOS R5 with 85mm prime lens at f/8'
  const display = buildDisplayDescription(p2)
  const lighting = LIGHTING_TERMS[p3.lighting] || LIGHTING_TERMS['studio-3point']
  const background = BACKGROUND_TERMS[renderMode]
  const grading = GRADING_TERMS[p3.colorGrading] || GRADING_TERMS['clean-commercial']

  return `Generate a photorealistic ${renderMode === 'instore' ? 'in-store photograph' : 'studio product render'} of a ${p2.popSubtype || p2.popCategory} display for [${p1.featuredProducts || 'BRAND NAME'}].

The display is ${display}. Primary brand color: [BRAND PRIMARY COLOR]. The fully stocked display shows all shelves with product labels facing forward.

Camera: ${altAngle}, ${altCameraSpecs}. Lighting: ${lighting}. Background: ${background}. Style: ${grading}, emphasis on header branding and product facing clarity.`.trim()
}

function buildVariantB(
  renderMode: RenderMode,
  p1: Phase1Data,
  p2: Phase2Data,
  p3: Phase3Data,
  p4: Phase4Data,
): string {
  const altMode = renderMode === 'commercial' ? 'instore' : 'commercial'
  const altBackground = altMode === 'instore'
    ? `${p1.channel || 'supermarket'} retail environment, fluorescent overhead lighting at 4500K, store aisle context visible in background at shallow depth of field`
    : 'clean light grey gradient seamless background, professional studio render'
  const display = buildDisplayDescription(p2)
  const altLighting = altMode === 'instore' ? LIGHTING_TERMS['retail-cold'] : LIGHTING_TERMS['studio-3point']

  return `Generate a photorealistic ${altMode === 'instore' ? 'in-store photograph' : 'studio product render'} of a ${p2.popSubtype || p2.popCategory} display for [${p1.featuredProducts || 'BRAND NAME'}].

The display is ${display}. Primary brand color: [BRAND PRIMARY COLOR]. ${altMode === 'instore' ? 'The display is positioned in a retail aisle. Empty aisle, no shoppers visible, display as the sole subject.' : 'The display is isolated against a clean studio background.'}

Camera: shopper\'s point-of-view at 165cm eye level, shot on Sony A7 IV with 35mm lens at f/5.6. Lighting: ${altLighting}. Background: ${altBackground}. Style: realistic ${altMode === 'instore' ? 'retail environment' : 'studio'} render, ${GRADING_TERMS[p3.colorGrading] || 'accurate color grade'}.`.trim()
}

function buildTechnicalBrief(
  renderMode: RenderMode,
  p1: Phase1Data,
  p2: Phase2Data,
  p3: Phase3Data,
  p4: Phase4Data,
): string {
  return `DISPLAY: ${p2.popSubtype || p2.popCategory} | CLIENTE: ${p1.featuredProducts || '—'} | CANAL: ${p1.channel || '—'} | MERCADO: ${p1.geographicMarket || '—'}
DIMENSIONES: ${p2.dimensions.height}×${p2.dimensions.width}×${p2.dimensions.depth} cm | MATERIALES: ${p2.materials.join(', ')}
ESTRUCTURA: ${p2.shelvesCount} bandejas, ${p2.facingsPerShelf} facings/bandeja | CABEZOTE: ${p2.hasHeader ? p2.headerType || 'Sí' : 'No'} | ILUM: ${p2.internalLighting ? p2.lightingType || 'Sí' : 'No'}
MODO: ${renderMode} | ÁNGULO: ${p3.cameraAngle} | ILUMINACIÓN: ${p3.lighting} | MOOD: ${p3.mood || '—'}
NANO BANANA: ${p4.model === 'pro' ? 'Nano Banana 2 Pro' : 'Nano Banana (Flash)'} | ${p4.aspectRatio} | ${p4.resolution}
OBJETIVO: ${p1.commercialObjectives?.join(', ') || '—'}`
}

function buildTroubleshooting(p2: Phase2Data, p4: Phase4Data): string[] {
  return [
    'Si el display se ve torcido → agregar: "rigid self-supporting structure, all panels perpendicular to floor"',
    'Si el logo no es legible → adjuntar logo como imagen de referencia y mencionarlo en el prompt',
    `Si el número de bandejas es incorrecto → especificar "exactly ${p2.shelvesCount || 'N'} shelves" con orden explícito`,
    'Si los colores no coinciden → especificar HEX/Pantone o adjuntar logo de referencia con los colores correctos',
    'Si el texto no es legible → usar Nano Banana 2 Pro; simplificar el copy a máximo 5 palabras clave',
    'Si el fondo no queda blanco puro → agregar "pure white seamless background (#FFFFFF), no shadows"',
    'Si el producto no se ve bien → adjuntar packshot del producto como referencia e indicar "exactly as in reference [N]"',
    p4.resolution === '4K' ? 'Para 4K → usar Nano Banana 2 Pro exclusivamente (Flash no soporta 4K)' : 'Para mejor calidad de texto → cambiar a Nano Banana 2 Pro',
  ]
}

export function buildPrompts(
  renderMode: RenderMode,
  p1: Phase1Data,
  p2: Phase2Data,
  p3: Phase3Data,
  p4: Phase4Data,
): GeneratedPrompts {
  return {
    main: buildMainPrompt(renderMode, p1, p2, p3, p4),
    variantA: buildVariantA(renderMode, p1, p2, p3, p4),
    variantB: buildVariantB(renderMode, p1, p2, p3, p4),
    technicalBrief: buildTechnicalBrief(renderMode, p1, p2, p3, p4),
    troubleshooting: buildTroubleshooting(p2, p4),
  }
}
