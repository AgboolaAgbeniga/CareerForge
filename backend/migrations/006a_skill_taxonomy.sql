-- Skill Taxonomy Tables for CareerForge
-- Run this in Supabase SQL Editor BEFORE migration 007

-- Skills table (main skill catalog)
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID,
  domain_id UUID,
  marketplace_demand INT CHECK (marketplace_demand >= 0 AND marketplace_demand <= 100),
  growth_trend VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill Categories
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill Domains
CREATE TABLE IF NOT EXISTS skill_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill Endorsements (user skills)
CREATE TABLE IF NOT EXISTS skill_endorsements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level INT CHECK (proficiency_level >= 0 AND proficiency_level <= 5),
  years_experience DECIMAL(5,2),
  endorsed_count INT DEFAULT 0,
  last_endorsed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Role Skill Requirements
CREATE TABLE IF NOT EXISTS role_skill_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name VARCHAR(255) NOT NULL,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_required INT CHECK (proficiency_required >= 1 AND proficiency_required <= 5),
  importance INT CHECK (importance >= 1 AND importance <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skill Prerequisites
CREATE TABLE IF NOT EXISTS skill_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  prerequisite_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  min_proficiency INT CHECK (min_proficiency >= 1 AND min_proficiency <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(skill_id, prerequisite_skill_id)
);

-- Skill Relations (related skills, like Vue <-> React)
CREATE TABLE IF NOT EXISTS skill_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  related_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  relation_type VARCHAR(50) DEFAULT 'related',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(skill_id, related_skill_id)
);

-- Skill Synonyms (JS -> JavaScript)
CREATE TABLE IF NOT EXISTS skill_synonyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  synonym VARCHAR(255) UNIQUE NOT NULL,
  canonical_skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create foreign key relationships for skills table
ALTER TABLE skills
ADD CONSTRAINT skills_category_fk FOREIGN KEY (category_id) REFERENCES skill_categories(id) ON DELETE SET NULL,
ADD CONSTRAINT skills_domain_fk FOREIGN KEY (domain_id) REFERENCES skill_domains(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_domain_id ON skills(domain_id);
CREATE INDEX IF NOT EXISTS idx_skill_endorsements_user_id ON skill_endorsements(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_endorsements_skill_id ON skill_endorsements(skill_id);
CREATE INDEX IF NOT EXISTS idx_role_skill_requirements_role_name ON role_skill_requirements(role_name);
CREATE INDEX IF NOT EXISTS idx_role_skill_requirements_skill_id ON role_skill_requirements(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_prerequisites_skill_id ON skill_prerequisites(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_relations_skill_id ON skill_relations(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_synonyms_synonym ON skill_synonyms(synonym);

-- Seed some basic skills (optional)
INSERT INTO skill_domains (name, description) VALUES
  ('Technology & Programming', 'Software development and technical skills'),
  ('Business & Management', 'Business and management skills'),
  ('Design & Creative', 'Design and creative skills'),
  ('Data & Analytics', 'Data science and analytics skills')
ON CONFLICT DO NOTHING;

INSERT INTO skill_categories (name, description) VALUES
  ('Frontend Development', 'Frontend web development technologies'),
  ('Backend Development', 'Backend and server-side technologies'),
  ('Full Stack', 'Full stack web development'),
  ('Mobile Development', 'Mobile app development'),
  ('Database', 'Database and data management'),
  ('DevOps', 'DevOps and infrastructure'),
  ('AI & ML', 'Artificial Intelligence and Machine Learning'),
  ('Leadership', 'Leadership and management skills'),
  ('Communication', 'Communication and soft skills')
ON CONFLICT DO NOTHING;

INSERT INTO skills (name, description, marketplace_demand, growth_trend) VALUES
  ('React', 'JavaScript library for building UIs', 95, 'stable'),
  ('JavaScript', 'Programming language for web development', 98, 'stable'),
  ('Python', 'General purpose programming language', 96, 'growing'),
  ('TypeScript', 'Typed superset of JavaScript', 85, 'growing'),
  ('PostgreSQL', 'Open source relational database', 88, 'stable'),
  ('Node.js', 'JavaScript runtime for server-side development', 92, 'stable'),
  ('Docker', 'Containerization platform', 87, 'growing'),
  ('AWS', 'Amazon Web Services cloud platform', 91, 'growing'),
  ('Git', 'Version control system', 99, 'stable'),
  ('HTML', 'Markup language for web pages', 95, 'stable'),
  ('CSS', 'Styling language for web pages', 95, 'stable'),
  ('Vue.js', 'Progressive JavaScript framework', 75, 'growing'),
  ('Angular', 'TypeScript-based web framework', 70, 'stable'),
  ('FastAPI', 'Modern Python web framework', 65, 'growing'),
  ('Django', 'Python web framework', 80, 'stable'),
  ('SQL', 'Query language for databases', 97, 'stable'),
  ('REST API', 'API architectural style', 96, 'stable'),
  ('GraphQL', 'Query language for APIs', 78, 'growing'),
  ('Kubernetes', 'Container orchestration platform', 82, 'growing'),
  ('MongoDB', 'NoSQL document database', 83, 'stable')
ON CONFLICT (name) DO NOTHING;

-- Add skill synonyms
INSERT INTO skill_synonyms (synonym, canonical_skill_id)
SELECT 'JS', id FROM skills WHERE name = 'JavaScript' UNION ALL
SELECT 'TS', id FROM skills WHERE name = 'TypeScript' UNION ALL
SELECT 'Postgres', id FROM skills WHERE name = 'PostgreSQL' UNION ALL
SELECT 'Kubernetes', id FROM skills WHERE name = 'Kubernetes'
ON CONFLICT DO NOTHING;
