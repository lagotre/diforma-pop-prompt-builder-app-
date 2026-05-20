import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import type { Project } from '@/types'

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  header: { marginBottom: 20, paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: '#E8672A', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerLeft: { flex: 1 },
  logoImg: { width: 110, height: 44, objectFit: 'contain' },
  title: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0D1B2A' },
  subtitle: { fontSize: 10, color: '#64748B', marginTop: 2 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16, backgroundColor: '#F5F7FA', padding: 10, borderRadius: 6 },
  metaItem: { fontSize: 8, color: '#64748B' },
  metaLabel: { fontFamily: 'Helvetica-Bold', color: '#1A1A2E' },
  section: { marginBottom: 16 },
  sectionLabel: { fontSize: 7, letterSpacing: 2, color: '#E8672A', fontFamily: 'Helvetica-Bold', marginBottom: 4, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#0D1B2A', marginBottom: 6 },
  promptBox: { backgroundColor: '#F5F7FA', padding: 12, borderRadius: 6, borderLeftWidth: 3, borderLeftColor: '#E8672A' },
  promptText: { fontSize: 9, color: '#1A1A2E', lineHeight: 1.6 },
  variantBox: { backgroundColor: '#F5F7FA', padding: 12, borderRadius: 6, borderLeftWidth: 3, borderLeftColor: '#1A3A5C' },
  darkBox: { backgroundColor: '#0D1B2A', padding: 12, borderRadius: 6 },
  darkText: { fontSize: 8, color: '#CBD5E1', lineHeight: 1.5, fontFamily: 'Helvetica' },
  tipRow: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  bullet: { fontSize: 9, color: '#E8672A', fontFamily: 'Helvetica-Bold' },
  tipText: { fontSize: 9, color: '#64748B', flex: 1, lineHeight: 1.4 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: '#94A3B8' },
})

export function DiformaPDFDocument({ project }: { project: Project }) {
  const gp = project.generatedPrompts!
  const date = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.subtitle}>{project.code} · {date} · POP Prompt Builder</Text>
          </View>
          <Image style={styles.logoImg} src="/logo-diforma4.jpg" />
        </View>

        {/* Meta */}
        <View style={styles.metaRow}>
          {[
            ['Cliente', project.client],
            ['Producto', project.product],
            ['Diseñador', project.designer],
            ['Ejecutivo', project.executive],
            ['Modo', project.renderMode],
            ['Modelo', project.phase4?.model === 'pro' ? 'Nano Banana 2 Pro' : 'Nano Banana Flash'],
            ['Ratio', project.phase4?.aspectRatio ?? '—'],
            ['Resolución', project.phase4?.resolution ?? '—'],
          ].map(([label, value]) => (
            <Text key={label} style={styles.metaItem}>
              <Text style={styles.metaLabel}>{label}: </Text>{value}
            </Text>
          ))}
        </View>

        {/* Main Prompt */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Prompt Principal</Text>
          <Text style={styles.sectionTitle}>Versión recomendada — copiar y pegar en Nano Banana</Text>
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{gp.main}</Text>
          </View>
        </View>

        {/* Variant A */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Variante A — Ángulo alternativo</Text>
          <View style={styles.variantBox}>
            <Text style={styles.promptText}>{gp.variantA}</Text>
          </View>
        </View>

        {/* Variant B */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Variante B — Contexto alternativo</Text>
          <View style={styles.variantBox}>
            <Text style={styles.promptText}>{gp.variantB}</Text>
          </View>
        </View>

        {/* Technical Brief */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mini-Brief Técnico para Producción</Text>
          <View style={styles.darkBox}>
            <Text style={styles.darkText}>{gp.technicalBrief}</Text>
          </View>
        </View>

        {/* Troubleshooting */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Troubleshooting</Text>
          {gp.troubleshooting.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Diforma Group · Where your brand comes to life</Text>
          <Text style={styles.footerText}>{project.code}</Text>
        </View>
      </Page>
    </Document>
  )
}
