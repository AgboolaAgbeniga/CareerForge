// Core content type definitions for documentation system
export interface ContentSection {
  id: string
  title: string
  content: string
  calloutBoxes?: CalloutBox[]
  lists?: List[]
  codeExamples?: CodeExample[]
  tables?: Table[]
  relatedLinks?: Link[]
}

export interface CalloutBox {
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  content: string
}

export interface List {
  type: 'unordered' | 'ordered'
  title?: string
  items: string[]
}

export interface CodeExample {
  id: string
  title: string
  description?: string
  language: string
  code: string
  fileName?: string
  showLineNumbers?: boolean
  output?: string
}

export interface Table {
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface ContentMetadata {
  title: string
  description: string
  version: string
  lastUpdated: string
  authors: string[]
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedTime: number
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

export interface Introduction {
  id: string
  title: string
  content: string
}

export interface NextSteps {
  title: string
  links: Link[]
}

export interface Link {
  text: string
  href: string
  description: string
}

export interface RelatedResource {
  text: string
  href: string
  description: string
}

export interface PageContent {
  metadata: ContentMetadata
  tableOfContents: TableOfContentsItem[]
  introduction: Introduction
  sections: ContentSection[]
  examples?: CodeExample[]
  nextSteps: NextSteps
  relatedResources: RelatedResource[]
}

export interface ContentDocument {
  metadata: ContentMetadata
  sections: ContentSection[]
  codeExamples?: CodeExample[]
}

// Specific content interfaces
export interface NavigationItem {
  label: string
  path: string
  icon?: string
  submenu?: NavigationItem[]
  requiresAuth?: boolean
  external?: boolean
}

export interface ComponentDoc {
  name: string
  description: string
  props?: PropDoc[]
  examples?: CodeExample[]
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  description: string
  defaultValue?: string
}

export interface APIDoc {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  description: string
  parameters?: ParameterDoc[]
  response?: ResponseDoc
  examples?: CodeExample[]
}

export interface ParameterDoc {
  name: string
  type: string
  required: boolean
  description: string
  location: 'path' | 'query' | 'body' | 'header'
}

export interface ResponseDoc {
  statusCode: number
  description: string
  schema?: string
}

// Navigation and routing types
export interface DocRoute {
  id: string
  title: string
  path: string
  component: string
  description?: string
  category: string
  subsections?: DocRoute[]
}

// Search and filtering types
export interface SearchResult {
  id: string
  title: string
  content: string
  category: string
  path: string
  type: 'page' | 'section' | 'code-example'
  relevanceScore?: number
}

export interface SearchFilters {
  categories?: string[]
  types?: string[]
  tags?: string[]
  dateRange?: {
    start: string
    end: string
  }
}

// Configuration types
export interface DocConfig {
  site: {
    title: string
    description: string
    version: string
  }
  navigation: NavigationItem[]
  theme: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  features: {
    search: boolean
    darkMode: boolean
    analytics: boolean
    comments: boolean
  }
}