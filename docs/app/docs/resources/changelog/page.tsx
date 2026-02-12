import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Calendar,
  Tag,
  Plus,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Bug,
  Zap,
  Shield,
  Users,
  FileText,
  Github
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Changelog | CareerForge Documentation',
  description: 'Track CareerForge version history, new features, bug fixes, and improvements.',
  openGraph: {
    title: 'CareerForge Changelog',
    description: 'Version history and release notes for CareerForge',
    type: 'website',
  },
}

const changelogData = [
  {
    version: 'v2.1.0',
    date: '2025-12-26',
    type: 'major',
    status: 'released',
    highlights: [
      'New AI-powered candidate matching algorithm with 95% accuracy improvement',
      'Enhanced analytics dashboard with real-time metrics',
      'Advanced filtering and search capabilities',
      'Mobile-responsive design improvements'
    ],
    features: [
      {
        icon: <Zap className="h-4 w-4" />,
        title: 'Smart Matching Algorithm',
        description: 'AI-driven candidate-job matching with contextual understanding',
        breaking: false
      },
      {
        icon: <FileText className="h-4 w-4" />,
        title: 'Advanced Resume Parsing',
        description: 'Improved resume extraction with support for 15+ file formats',
        breaking: false
      },
      {
        icon: <Users className="h-4 w-4" />,
        title: 'Team Collaboration',
        description: 'Multi-user workflows and shared candidate pools',
        breaking: false
      },
      {
        icon: <Shield className="h-4 w-4" />,
        title: 'Enhanced Security',
        description: 'SOC 2 Type II compliance and advanced encryption',
        breaking: false
      }
    ],
    fixes: [
      'Fixed issue with bulk upload failing for large CSV files',
      'Resolved timezone handling in interview scheduling',
      'Corrected salary range calculations in multiple currencies',
      'Improved error messaging for invalid API requests'
    ],
    breakingChanges: [],
    migrationNotes: [
      'Update API client to v2.1.0 for new features',
      'Review team permission settings after upgrade',
      'Re-index existing candidates for improved matching'
    ]
  },
  {
    version: 'v2.0.5',
    date: '2025-12-15',
    type: 'patch',
    status: 'released',
    highlights: [
      'Critical security patch for authentication system',
      'Performance improvements for large datasets',
      'Bug fixes for email notifications'
    ],
    features: [
      {
        icon: <Shield className="h-4 w-4" />,
        title: 'Security Update',
        description: 'Patched potential authentication vulnerability',
        breaking: false
      }
    ],
    fixes: [
      'Fixed authentication token expiration handling',
      'Resolved memory leak in candidate processing',
      'Corrected email template rendering issues',
      'Fixed race condition in bulk operations'
    ],
    breakingChanges: [],
    migrationNotes: [
      'This update is automatically applied to all users',
      'No action required for continued operation'
    ]
  },
  {
    version: 'v2.0.0',
    date: '2025-11-30',
    type: 'major',
    status: 'released',
    highlights: [
      'Complete platform redesign with modern UI',
      'New RESTful API v2 with improved performance',
      'Advanced analytics and reporting features',
      'Enterprise-grade security and compliance'
    ],
    features: [
      {
        icon: <Zap className="h-4 w-4" />,
        title: 'API v2 Launch',
        description: 'New RESTful API with GraphQL support and improved documentation',
        breaking: true
      },
      {
        icon: <Users className="h-4 w-4" />,
        title: 'Enterprise Features',
        description: 'SSO integration, advanced role management, audit logging',
        breaking: false
      },
      {
        icon: <FileText className="h-4 w-4" />,
        title: 'Advanced Analytics',
        description: 'Real-time dashboards, custom reports, data export',
        breaking: false
      },
      {
        icon: <Shield className="h-4 w-4" />,
        title: 'Compliance Ready',
        description: 'GDPR, CCPA, and SOC 2 compliance features',
        breaking: false
      }
    ],
    fixes: [
      'Complete UI overhaul with improved accessibility',
      'Performance optimizations across all modules',
      'Enhanced error handling and user feedback'
    ],
    breakingChanges: [
      {
        change: 'API v1 endpoints deprecated',
        action: 'Migrate to API v2 endpoints before March 2026',
        guide: '/docs/migration/api-v1-to-v2'
      },
      {
        change: 'Authentication method changed',
        action: 'Update authentication implementation to use OAuth 2.0',
        guide: '/docs/authentication/oauth-setup'
      }
    ],
    migrationNotes: [
      'API v1 will be supported until March 2026',
      'Complete migration guide available in documentation',
      'Free migration assistance available for enterprise customers'
    ]
  },
  {
    version: 'v1.9.2',
    date: '2025-11-15',
    type: 'patch',
    status: 'released',
    highlights: [
      'Bug fixes and performance improvements',
      'Enhanced search functionality',
      'Improved mobile experience'
    ],
    features: [],
    fixes: [
      'Fixed search indexing issues for special characters',
      'Resolved mobile layout issues on tablet devices',
      'Corrected candidate status update notifications',
      'Improved bulk operation progress tracking'
    ],
    breakingChanges: [],
    migrationNotes: [
      'Automatic update - no action required'
    ]
  },
  {
    version: 'v1.9.0',
    date: '2025-11-01',
    type: 'minor',
    status: 'released',
    highlights: [
      'New integration marketplace',
      'Improved candidate scoring',
      'Enhanced reporting capabilities'
    ],
    features: [
      {
        icon: <Plus className="h-4 w-4" />,
        title: 'Integration Marketplace',
        description: 'Browse and install third-party integrations',
        breaking: false
      },
      {
        icon: <Zap className="h-4 w-4" />,
        title: 'Enhanced Scoring',
        description: 'Improved candidate ranking algorithms',
        breaking: false
      }
    ],
    fixes: [
      'Fixed data export formatting issues',
      'Resolved calendar synchronization problems',
      'Improved email notification delivery rates'
    ],
    breakingChanges: [],
    migrationNotes: [
      'Review new integration options in settings',
      'Consider updating scoring criteria for better results'
    ]
  }
];

export default function ChangelogPage() {
  const getVersionTypeIcon = (type: string) => {
    switch (type) {
      case 'major': return <ArrowUp className="h-4 w-4 text-red-600" />;
      case 'minor': return <ArrowUp className="h-4 w-4 text-yellow-600" />;
      case 'patch': return <ArrowUp className="h-4 w-4 text-green-600" />;
      default: return <Tag className="h-4 w-4 text-gray-600" />;
    }
  };

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800 border-red-200';
      case 'minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'patch': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'released': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'beta': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'planned': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Tag className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Changelog
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest CareerForge releases, features, and improvements
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Release Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <ArrowUp className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Major Releases</span>
                <span className="text-xs text-muted-foreground">(Quarterly)</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUp className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Minor Releases</span>
                <span className="text-xs text-muted-foreground">(Monthly)</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Patch Releases</span>
                <span className="text-xs text-muted-foreground">(As needed)</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {changelogData.map((release, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getVersionTypeIcon(release.type)}
                      <div>
                        <h2 className="text-2xl font-bold">{release.version}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(release.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          {getStatusIcon(release.status)}
                          <span className="text-xs text-muted-foreground capitalize">
                            {release.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getVersionTypeColor(release.type)}`}>
                      {release.type.toUpperCase()}
                    </span>
                  </div>
                  
                  {release.highlights.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {release.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {release.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Plus className="h-4 w-4 mr-2 text-blue-600" />
                        New Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {release.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex space-x-3">
                            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                              {feature.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{feature.title}</h4>
                                {feature.breaking && (
                                  <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                                    Breaking
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {release.fixes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Bug className="h-4 w-4 mr-2 text-green-600" />
                        Bug Fixes
                      </h3>
                      <ul className="space-y-2">
                        {release.fixes.map((fix, fixIndex) => (
                          <li key={fixIndex} className="flex items-start space-x-2">
                            <Bug className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.breakingChanges.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                        Breaking Changes
                      </h3>
                      <div className="space-y-3">
                        {release.breakingChanges.map((change, cIndex) => (
                          <div key={cIndex} className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-medium text-red-900 mb-2">{change.change}</h4>
                            <p className="text-sm text-red-800 mb-2">{change.action}</p>
                            {change.guide && (
                              <Link href={change.guide} className="text-sm text-red-700 hover:underline">
                                View Migration Guide →
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {release.migrationNotes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-purple-600" />
                        Migration Notes
                      </h3>
                      <ul className="space-y-2">
                        {release.migrationNotes.map((note, nIndex) => (
                          <li key={nIndex} className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Want to be notified about new releases and important updates?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/careerforge/careerforge/releases"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Github className="h-4 w-4 mr-2" />
                Follow on GitHub
              </a>
              <a
                href="mailto:updates@careerforge.ai"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                Subscribe to Updates
                <ArrowUp className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>

          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Looking for older versions or specific changes?
            </p>
            <Link
              href="/docs/resources/support"
              className="text-primary hover:underline font-medium"
            >
              Contact Support for Historical Records
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  )
}