-- Ejecutar en: Supabase > SQL Editor
-- Diforma POP Prompt Builder — Schema

CREATE TABLE IF NOT EXISTS projects (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code          TEXT NOT NULL,
  name          TEXT NOT NULL,
  client        TEXT NOT NULL,
  product       TEXT NOT NULL,
  designer      TEXT NOT NULL,
  executive     TEXT NOT NULL,
  render_mode   TEXT NOT NULL DEFAULT 'commercial',
  current_phase INTEGER NOT NULL DEFAULT 1,
  status        TEXT NOT NULL DEFAULT 'draft',
  phase1_data   JSONB,
  phase2_data   JSONB,
  phase3_data   JSONB,
  phase4_data   JSONB,
  generated_prompts JSONB,
  user_id       TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para consultas por usuario
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON projects(user_id);
CREATE INDEX IF NOT EXISTS projects_updated_at_idx ON projects(updated_at DESC);

-- Row Level Security (RLS) — cada usuario solo ve sus proyectos
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own projects"
  ON projects
  FOR ALL
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
