import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Security Posture | CareerForge Documentation',
  description: 'Comprehensive overview of CareerForge security architecture, data protection measures, compliance standards, and security best practices.',
  openGraph: {
    title: 'CareerForge Security Architecture',
    description: 'Security posture and data protection measures',
    type: 'website',
  },
}

export default function SecurityPosturePage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Security Posture
          </h1>
          <p className="text-xl text-muted-foreground">
            Our comprehensive approach to security, privacy, and data protection
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Security Overview</h2>
          <p>
            CareerForge maintains a robust security posture that protects user data, ensures system integrity, 
            and meets industry compliance standards. Our security architecture follows defense-in-depth principles 
            with multiple layers of protection.
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Our Security Commitments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">SOC 2 Type II compliance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">GDPR compliance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">ISO 27001 certified</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">End-to-end encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">Regular security audits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">24/7 security monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          <h2>Security Architecture Layers</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Network Security</h3>
              <ul className="text-sm space-y-2">
                <li><strong>WAF (Web Application Firewall):</strong> Protects against OWASP Top 10 threats</li>
                <li><strong>DDoS Protection:</strong> Multi-layered DDoS mitigation</li>
                <li><strong>Network Segmentation:</strong> Isolated network zones for different services</li>
                <li><strong>VPN Access:</strong> Secure remote access for administrators</li>
                <li><strong>DNS Security:</strong> DNSSEC and DNS filtering</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Application Security</h3>
              <ul className="text-sm space-y-2">
                <li><strong>Input Validation:</strong> Comprehensive input sanitization</li>
                <li><strong>SQL Injection Prevention:</strong> Parameterized queries and ORM usage</li>
                <li><strong>XSS Protection:</strong> Content Security Policy and output encoding</li>
                <li><strong>CSRF Protection:</strong> Anti-CSRF tokens for all forms</li>
                <li><strong>Rate Limiting:</strong> API and login rate limiting</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Data Security</h3>
              <ul className="text-sm space-y-2">
                <li><strong>Encryption at Rest:</strong> AES-256 encryption for stored data</li>
                <li><strong>Encryption in Transit:</strong> TLS 1.3 for all communications</li>
                <li><strong>Key Management:</strong> Hardware Security Modules (HSM)</li>
                <li><strong>Data Classification:</strong> Automatic data sensitivity labeling</li>
                <li><strong>Backup Security:</strong> Encrypted backups with secure storage</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Identity & Access Management</h3>
              <ul className="text-sm space-y-2">
                <li><strong>Multi-Factor Authentication:</strong> TOTP and SMS 2FA</li>
                <li><strong>Role-Based Access Control:</strong> Granular permission system</li>
                <li><strong>Single Sign-On:</strong> SAML 2.0 and OAuth 2.0</li>
                <li><strong>Session Management:</strong> Secure session handling</li>
                <li><strong>Privileged Access:</strong> Just-in-time access for administrators</li>
              </ul>
            </div>
          </div>

          <h2>Data Protection Measures</h2>

          <h3>Personal Data Handling</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Data Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Protection Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Access Control
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Retention
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">User Credentials</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Bcrypt hashing, salt</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Authentication service only</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Until account deletion</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Resume Content</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">AES-256 encryption</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">User + authorized recruiters</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">User controlled</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Personal Information</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">AES-256 encryption</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">User + authorized services</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">User controlled</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Messages</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">AES-256 encryption</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Conversation participants</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">User controlled</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Analytics Data</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Pseudonymization</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Analytics service only</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">2 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>AI Model Security</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Model Protection</h4>
                <ul className="text-sm space-y-2">
                  <li>• Model weights encrypted at rest</li>
                  <li>• Secure model deployment pipeline</li>
                  <li>• Model versioning and rollback</li>
                  <li>• Input/output validation for AI services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Bias and Fairness</h4>
                <ul className="text-sm space-y-2">
                  <li>• Regular bias testing and mitigation</li>
                  <li>• Fairness metrics monitoring</li>
                  <li>• Diverse training datasets</li>
                  <li>• Transparent AI decision-making</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Compliance and Standards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">GDPR Compliance</h3>
              <ul className="text-sm space-y-2">
                <li>• Data subject rights implementation</li>
                <li>• Consent management system</li>
                <li>• Data portability features</li>
                <li>• Right to be forgotten</li>
                <li>• Privacy by design principles</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">SOC 2 Type II</h3>
              <ul className="text-sm space-y-2">
                <li>• Security controls audit</li>
                <li>• Availability monitoring</li>
                <li>• Processing integrity</li>
                <li>• Confidentiality measures</li>
                <li>• Annual third-party audit</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">ISO 27001</h3>
              <ul className="text-sm space-y-2">
                <li>• Information security management</li>
                <li>• Risk assessment framework</li>
                <li>• Security incident response</li>
                <li>• Business continuity planning</li>
                <li>• Regular security reviews</li>
              </ul>
            </div>
          </div>

          <h2>Threat Model</h2>

          <h3>Identified Threats</h3>
          <div className="space-y-4 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-2">Threat Actor: Malicious User</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Attack Vectors</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SQL injection attempts</li>
                    <li>• XSS exploitation</li>
                    <li>• Credential stuffing</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Impact</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data breach</li>
                    <li>• Account compromise</li>
                    <li>• Service disruption</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Mitigation</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Input validation</li>
                    <li>• WAF protection</li>
                    <li>• Rate limiting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-2">Threat Actor: Nation State</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Attack Vectors</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Advanced persistent threats</li>
                    <li>• Supply chain attacks</li>
                    <li>• Zero-day exploits</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Impact</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Large-scale data theft</li>
                    <li>• System compromise</li>
                    <li>• Long-term persistence</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Mitigation</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Network segmentation</li>
                    <li>• Advanced monitoring</li>
                    <li>• Regular patching</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2>Security Monitoring</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Real-time Monitoring</h3>
              <ul className="text-sm space-y-2">
                <li>• Security event correlation</li>
                <li>• Anomaly detection using ML</li>
                <li>• Intrusion detection system (IDS)</li>
                <li>• File integrity monitoring</li>
                <li>• Network traffic analysis</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Alert and Response</h3>
              <ul className="text-sm space-y-2">
                <li>• Automated alert escalation</li>
                <li>• 24/7 security operations center</li>
                <li>• Incident response procedures</li>
                <li>• Forensic investigation capabilities</li>
                <li>• Threat intelligence integration</li>
              </ul>
            </div>
          </div>

          <h2>Security Best Practices</h2>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Development Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Secure Coding</h4>
                <ul className="text-sm space-y-1">
                  <li>• Security code review process</li>
                  <li>• Static application security testing (SAST)</li>
                  <li>• Dynamic application security testing (DAST)</li>
                  <li>• Dependency vulnerability scanning</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">DevSecOps</h4>
                <ul className="text-sm space-y-1">
                  <li>• Security integrated in CI/CD pipeline</li>
                  <li>• Infrastructure as Code (IaC) scanning</li>
                  <li>• Container security scanning</li>
                  <li>• Automated security testing</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Incident Response</h2>

          <div className="space-y-4 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Response Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium">0-15 min</div>
                  <div className="text-sm">Initial detection and assessment</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium">15-30 min</div>
                  <div className="text-sm">Incident team mobilization</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium">30-60 min</div>
                  <div className="text-sm">Containment measures implemented</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium">1-4 hours</div>
                  <div className="text-sm">Eradication and recovery</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium">4-24 hours</div>
                  <div className="text-sm">Post-incident analysis and reporting</div>
                </div>
              </div>
            </div>
          </div>

          <h2>Contact Information</h2>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Security Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">General Security Inquiries</h4>
                <p className="text-sm text-muted-foreground">security@careerforge.ai</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Security Vulnerabilities</h4>
                <p className="text-sm text-muted-foreground">security@careerforge.ai</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Compliance Questions</h4>
                <p className="text-sm text-muted-foreground">compliance@careerforge.ai</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Emergency Response</h4>
                <p className="text-sm text-muted-foreground">+1 (555) 123-SAFE</p>
              </div>
            </div>
          </div>

          <h2>Next Steps</h2>
          <p>
            Learn more about our system architecture by exploring{' '}
            <Link href="/docs/architecture" className="text-primary hover:underline">
              System Architecture
            </Link>{' '}
            or our{' '}
            <Link href="/docs/architecture/service-boundaries" className="text-primary hover:underline">
              Service Boundaries
            </Link>.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
