import { PageContent } from '@/lib/content-types'

export const securityMeasuresContent: PageContent = {
  metadata: {
    title: "Security Measures and Protocols",
    description: "Comprehensive overview of CareerForge's security architecture, including authentication, encryption, access controls, and threat protection mechanisms",
    version: "1.2.0",
    lastUpdated: "2025-12-27",
    authors: ["Security Team"],
    tags: ["security", "authentication", "encryption", "access control", "threat protection", "compliance"],
    difficulty: "intermediate",
    estimatedTime: 25
  },
  tableOfContents: [
    { id: "security-overview", title: "Security Overview", level: 1 },
    { id: "authentication", title: "Authentication & Authorization", level: 1 },
    { id: "data-protection", title: "Data Protection", level: 1 },
    { id: "network-security", title: "Network Security", level: 1 },
    { id: "monitoring", title: "Security Monitoring", level: 1 },
    { id: "incident-response", title: "Incident Response", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Security Measures and Protocols",
    content: `CareerForge implements a comprehensive security framework designed to protect user data, prevent unauthorized access, and ensure compliance with industry standards. Our multi-layered security approach combines advanced technology with proven best practices to maintain the highest levels of data protection and system integrity.`
  },
  sections: [
    {
      id: "security-overview",
      title: "Security Overview",
      content: `Our security framework is built on the principle of defense in depth, implementing multiple layers of protection across all system components.

### Security Principles

#### Zero Trust Architecture
- **Never Trust, Always Verify**: Every access request is authenticated and authorized
- **Least Privilege Access**: Users and systems only have access to necessary resources
- **Micro-Segmentation**: Network isolation between different system components

#### Security by Design
- **Secure Development Lifecycle**: Security integrated into all development phases
- **Automated Security Testing**: Continuous vulnerability scanning and penetration testing
- **Code Review Requirements**: Mandatory security review for all code changes

### Compliance Frameworks
- **SOC 2 Type II**: Annual audit for security, availability, and confidentiality
- **GDPR**: Comprehensive data protection and privacy compliance
- **ISO 27001**: Information security management system certification
- **PCI DSS**: Payment card industry data security standards (for payment processing)`,
      calloutBoxes: [
        {
          type: "info",
          title: "Security First Approach",
          content: "Security is not an afterthought at CareerForge - it's embedded in every aspect of our platform design and operations."
        }
      ]
    },
    {
      id: "authentication",
      title: "Authentication & Authorization",
      content: `Robust authentication and authorization mechanisms ensure that only legitimate users can access system resources.

### Multi-Factor Authentication (MFA)
- **Required for All Users**: MFA mandatory for all account access
- **Multiple Methods**: SMS, authenticator apps, hardware keys, and biometric options
- **Adaptive MFA**: Risk-based authentication based on user behavior and location

### OAuth 2.0 & OpenID Connect
- **Industry Standard Protocols**: Secure token-based authentication
- **Social Login Integration**: Google, LinkedIn, and other OAuth providers
- **JWT Tokens**: Secure, stateless authentication tokens with expiration

### Role-Based Access Control (RBAC)
- **Granular Permissions**: Fine-grained access control based on user roles
- **Hierarchical Roles**: Admin, Recruiter, Job Seeker, and API user roles
- **Dynamic Permissions**: Context-aware permission evaluation

### API Security
- **Bearer Token Authentication**: Secure API access with JWT tokens
- **Rate Limiting**: Protection against abuse and DoS attacks
- **Request Signing**: Additional security for sensitive API operations`,
      codeExamples: [
        {
          id: "jwt-auth",
          title: "JWT Authentication Example",
          description: "Implementing secure JWT-based authentication",
          language: "typescript",
          code: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  role: string;
}

class AuthService {
  private jwtSecret = process.env.JWT_SECRET!;
  private jwtExpiresIn = '24h';

  async authenticateUser(email: string, password: string): Promise<string | null> {
    // Verify user credentials
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) return null;

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000)
      },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn }
    );

    return token;
  }

  verifyToken(token: string): User | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };
    } catch (error) {
      return null;
    }
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    // Database query implementation
    return null;
  }
}`
        }
      ]
    },
    {
      id: "data-protection",
      title: "Data Protection",
      content: `Comprehensive data protection measures ensure the confidentiality, integrity, and availability of user data.

### Encryption at Rest
- **AES-256 Encryption**: All sensitive data encrypted using industry-standard algorithms
- **Key Management**: Secure key storage and rotation using AWS KMS or equivalent
- **Database Encryption**: Transparent data encryption for all database storage

### Encryption in Transit
- **TLS 1.3**: End-to-end encryption for all data transmission
- **Certificate Pinning**: Additional protection against man-in-the-middle attacks
- **Perfect Forward Secrecy**: Session keys that cannot be compromised retroactively

### Data Classification
- **Public Data**: Resume information visible to employers
- **Private Data**: Personal contact information, payment details
- **Sensitive Data**: Social security numbers, biometric data (if applicable)
- **Confidential Data**: System secrets, encryption keys

### Data Retention
- **GDPR Compliance**: Data retention based on legitimate business needs
- **Automated Deletion**: Scheduled cleanup of expired or unnecessary data
- **Audit Logging**: Complete audit trail of data access and modifications`,
      lists: [
        {
          type: "unordered",
          title: "Data Protection Best Practices",
          items: [
            "Encrypt all sensitive data at rest and in transit",
            "Implement proper access controls and audit logging",
            "Regular security assessments and penetration testing",
            "Automated backup and disaster recovery procedures",
            "Data minimization and purpose limitation principles"
          ]
        }
      ]
    },
    {
      id: "network-security",
      title: "Network Security",
      content: `Network-level security controls protect against external threats and unauthorized access attempts.

### Web Application Firewall (WAF)
- **OWASP Protection**: Defense against common web application vulnerabilities
- **DDoS Protection**: Cloud-based DDoS mitigation services
- **Rate Limiting**: Protection against brute force and abuse attacks

### Network Segmentation
- **DMZ Architecture**: Isolated public-facing services
- **Internal Network Isolation**: Separation between application and database tiers
- **Zero Trust Networking**: Micro-segmentation and east-west traffic control

### Intrusion Detection & Prevention
- **Real-time Monitoring**: Continuous network traffic analysis
- **Signature-based Detection**: Known attack pattern recognition
- **Behavioral Analysis**: Anomaly detection for suspicious activities

### Secure Configuration
- **Hardened Servers**: Minimal attack surface configuration
- **Regular Patching**: Automated security updates and patch management
- **Configuration Management**: Infrastructure as code with security validation`,
      codeExamples: [
        {
          id: "waf-config",
          title: "WAF Configuration Example",
          description: "AWS WAF rules for protecting web applications",
          language: "json",
          code: `{
  "Name": "CareerForge-WAF",
  "Scope": "REGIONAL",
  "DefaultAction": {
    "Allow": {}
  },
  "Rules": [
    {
      "Name": "SQLInjectionProtection",
      "Priority": 1,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesSQLiRuleSet"
        }
      },
      "OverrideAction": {
        "Block": {}
      },
      "VisibilityConfig": {
        "SampledRequestsEnabled": true,
        "CloudWatchMetricsEnabled": true,
        "MetricName": "SQLInjectionProtection"
      }
    },
    {
      "Name": "RateLimitProtection",
      "Priority": 2,
      "Statement": {
        "RateBasedStatement": {
          "Limit": 2000,
          "AggregateKeyType": "IP"
        }
      },
      "Action": {
        "Block": {}
      },
      "VisibilityConfig": {
        "SampledRequestsEnabled": true,
        "CloudWatchMetricsEnabled": true,
        "MetricName": "RateLimitProtection"
      }
    }
  ],
  "VisibilityConfig": {
    "SampledRequestsEnabled": true,
    "CloudWatchMetricsEnabled": true,
    "MetricName": "CareerForge-WAF"
  }
}`
        }
      ]
    },
    {
      id: "monitoring",
      title: "Security Monitoring",
      content: `Continuous security monitoring ensures rapid detection and response to security incidents.

### Security Information and Event Management (SIEM)
- **Centralized Logging**: All security events collected and analyzed
- **Real-time Alerts**: Automated alerting for suspicious activities
- **Compliance Reporting**: Automated generation of security reports

### Log Management
- **Comprehensive Logging**: All authentication, authorization, and data access events
- **Log Retention**: Secure storage with configurable retention policies
- **Log Analysis**: Automated pattern recognition and anomaly detection

### Vulnerability Management
- **Automated Scanning**: Continuous vulnerability assessment
- **Risk Prioritization**: CVSS-based vulnerability scoring and prioritization
- **Patch Management**: Automated deployment of security patches

### Threat Intelligence
- **External Threat Feeds**: Integration with threat intelligence platforms
- **Indicator of Compromise (IoC) Detection**: Automated malware and attack detection
- **Security Advisories**: Proactive monitoring of security vulnerabilities`,
      calloutBoxes: [
        {
          type: "warning",
          title: "24/7 Monitoring",
          content: "Our Security Operations Center (SOC) provides round-the-clock monitoring and incident response capabilities."
        }
      ]
    },
    {
      id: "incident-response",
      title: "Incident Response",
      content: `Structured incident response processes ensure rapid and effective handling of security incidents.

### Incident Response Plan
- **Preparation Phase**: Tools, processes, and team readiness
- **Identification Phase**: Incident detection and initial assessment
- **Containment Phase**: Short-term and long-term containment strategies
- **Eradication Phase**: Root cause analysis and system cleanup
- **Recovery Phase**: System restoration and service resumption
- **Lessons Learned Phase**: Post-incident review and improvement

### Communication Protocols
- **Internal Communication**: Clear escalation paths and notification procedures
- **External Communication**: Transparent communication with affected users
- **Regulatory Reporting**: Compliance with breach notification requirements

### Forensic Analysis
- **Digital Forensics**: Preservation and analysis of digital evidence
- **Chain of Custody**: Proper handling of evidence for legal proceedings
- **Root Cause Analysis**: Thorough investigation of incident causes

### Continuous Improvement
- **Post-Incident Reviews**: Regular debriefing and process improvement
- **Security Training**: Ongoing security awareness training for all staff
- **Technology Updates**: Regular updates to security tools and processes`,
      lists: [
        {
          type: "ordered",
          title: "Incident Response Timeline",
          items: [
            "Incident detection within 5 minutes of occurrence",
            "Initial assessment completed within 15 minutes",
            "Containment measures implemented within 1 hour",
            "Full resolution achieved within 24 hours for most incidents",
            "Post-incident report completed within 72 hours"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Explore Security Topics",
    links: [
      {
        text: "Data Privacy Policies",
        href: "/docs/security-compliance/data-privacy",
        description: "Learn about our data privacy and protection policies"
      },
      {
        text: "Compliance Standards",
        href: "/docs/security-compliance/compliance-standards",
        description: "Understanding our compliance certifications and standards"
      },
      {
        text: "API Security",
        href: "/docs/backend-api/authentication",
        description: "Secure API integration and authentication"
      }
    ]
  },
  relatedResources: [
    {
      text: "Security Best Practices",
      href: "/docs/developer-resources/best-practices",
      description: "Developer security guidelines and best practices"
    },
    {
      text: "Privacy Policy",
      href: "/privacy-policy",
      description: "Complete privacy policy and data handling practices"
    },
    {
      text: "Trust Center",
      href: "/trust-center",
      description: "Security documentation and compliance certificates"
    }
  ]
}