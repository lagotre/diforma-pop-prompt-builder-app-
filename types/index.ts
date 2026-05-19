export type RenderMode = 'commercial' | 'instore' | 'hybrid'
export type ProjectStatus = 'draft' | 'in_progress' | 'complete'
export type WizardPhase = 1 | 2 | 3 | 4 | 5

export interface ProjectBasic {
  code: string
  name: string
  client: string
  product: string
  designer: string
  executive: string
  renderMode: RenderMode
}

export interface Phase1Data {
  commercialObjectives: string[]
  brandSector: string
  featuredProducts: string
  shopperTarget: string
  channel: string
  season: string
  geographicMarket: string
}

export interface Phase2Data {
  popCategory: string
  popSubtype: string
  materials: string[]
  dimensions: { height: string; width: string; depth: string }
  hasHeader: boolean
  headerType: string
  hasBase: boolean
  hasSidePanels: boolean
  shelvesCount: string
  facingsPerShelf: string
  totalSKUs: string
  brandingRatio: string
  shelfBranding: boolean
  internalLighting: boolean
  lightingType: string
}

export interface Phase3Data {
  cameraAngle: string
  frameDistance: string
  lighting: string
  cameraSpecs: string
  mood: string
  colorGrading: string
  referenceNotes: string
}

export interface Phase4Data {
  aspectRatio: string
  resolution: '1K' | '2K' | '4K'
  model: 'flash' | 'pro'
  displayText: string
  displayTextFont: string
}

export interface GeneratedPrompts {
  main: string
  variantA: string
  variantB: string
  technicalBrief: string
  troubleshooting: string[]
}

export interface Project {
  id: string
  code: string
  name: string
  client: string
  product: string
  designer: string
  executive: string
  renderMode: RenderMode
  currentPhase: WizardPhase
  status: ProjectStatus
  phase1?: Phase1Data
  phase2?: Phase2Data
  phase3?: Phase3Data
  phase4?: Phase4Data
  generatedPrompts?: GeneratedPrompts
  userId: string
  createdAt: string
  updatedAt: string
}
