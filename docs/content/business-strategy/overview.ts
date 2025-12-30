import { ContentDocument } from '@/lib/content-types'

export const overviewContent: ContentDocument = {
  metadata: {
    title: "Business Overview",
    description: "Comprehensive overview of CareerForge's business model, mission, and strategic positioning in the career development and recruitment industry.",
    version: "1.0.0",
    lastUpdated: "2024-12-30",
    authors: ["Business Strategy Team"],
    tags: ["business", "overview", "mission", "strategy", "careerforge", "recruitment", "platform"],
    difficulty: "beginner",
    estimatedTime: 15
  },

  sections: [
    {
      id: "company-overview",
      title: "Company Overview",
      content: `
        <p>CareerForge is a cutting-edge career development and recruitment platform that leverages artificial intelligence to revolutionize how individuals find meaningful employment and how companies discover exceptional talent. Founded with the vision of democratizing career opportunities, CareerForge combines advanced AI technologies with human-centered design to create a seamless, intelligent job matching ecosystem.</p>

        <div class="company-stats">
          <h3>Key Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">500K+</span>
              <span class="stat-label">Active Users</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">10K+</span>
              <span class="stat-label">Partner Companies</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">95%</span>
              <span class="stat-label">Match Accuracy</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Countries Served</span>
            </div>
          </div>
        </div>
      `
    },

    {
      id: "mission-vision",
      title: "Mission & Vision",
      content: `
        <h3>Our Mission</h3>
        <p>To empower individuals and organizations worldwide by creating intelligent connections between talent and opportunity, fostering career growth and business success through innovative AI-driven solutions.</p>

        <h3>Our Vision</h3>
        <p>To become the world's most trusted and comprehensive career development platform, where every professional can unlock their full potential and every organization can build exceptional teams with confidence.</p>

        <div class="core-values">
          <h3>Core Values</h3>
          <ul>
            <li><strong>Innovation:</strong> Continuously pushing the boundaries of what's possible with AI and technology</li>
            <li><strong>Integrity:</strong> Maintaining the highest standards of data privacy, security, and ethical AI practices</li>
            <li><strong>Inclusivity:</strong> Creating equal opportunities for all individuals regardless of background or location</li>
            <li><strong>Excellence:</strong> Delivering exceptional user experiences and measurable business results</li>
            <li><strong>Collaboration:</strong> Building strong partnerships with users, companies, and the broader ecosystem</li>
          </ul>
        </div>
      `
    },

    {
      id: "business-model",
      title: "Business Model",
      content: `
        <h3>Revenue Streams</h3>
        <p>CareerForge operates on a multi-faceted business model designed to create sustainable value for all stakeholders:</p>

        <div class="revenue-model">
          <div class="model-section">
            <h4>🏢 Enterprise Solutions</h4>
            <p>Premium recruitment and talent management solutions for large organizations</p>
            <ul>
              <li>Advanced AI-powered candidate screening</li>
              <li>Custom analytics and reporting dashboards</li>
              <li>Dedicated account management and support</li>
              <li>Integration with existing HR systems</li>
            </ul>
          </div>

          <div class="model-section">
            <h4>💼 Professional Services</h4>
            <p>Premium features for individual professionals</p>
            <ul>
              <li>Enhanced resume optimization</li>
              <li>Priority job matching</li>
              <li>Career coaching and guidance</li>
              <li>Advanced skill assessment tools</li>
            </ul>
          </div>

          <div class="model-section">
            <h4>🤝 Partnerships & Integrations</h4>
            <p>Strategic partnerships with educational institutions and professional networks</p>
            <ul>
              <li>University career services integrations</li>
              <li>Professional certification partnerships</li>
              <li>API licensing for third-party platforms</li>
              <li>White-label solutions for enterprises</li>
            </ul>
          </div>
        </div>

        <h3>Pricing Strategy</h3>
        <p>Our flexible pricing model ensures accessibility while providing premium value:</p>
        <ul>
          <li><strong>Free Tier:</strong> Basic job searching and application features</li>
          <li><strong>Professional Tier:</strong> Advanced tools and priority matching ($29/month)</li>
          <li><strong>Enterprise Tier:</strong> Custom solutions with dedicated support ($99+/month per user)</li>
        </ul>
      `
    },

    {
      id: "market-positioning",
      title: "Market Positioning",
      content: `
        <h3>Competitive Advantages</h3>
        <p>CareerForge differentiates itself through several key competitive advantages:</p>

        <div class="competitive-advantages">
          <div class="advantage-item">
            <h4>🎯 AI-Powered Precision</h4>
            <p>Industry-leading match accuracy through proprietary machine learning algorithms that understand both technical skills and cultural fit.</p>
          </div>

          <div class="advantage-item">
            <h4>🔒 Enterprise-Grade Security</h4>
            <p>SOC 2 Type II compliant infrastructure with end-to-end encryption and comprehensive data protection measures.</p>
          </div>

          <div class="advantage-item">
            <h4>🌍 Global Reach</h4>
            <p>Localized experiences in 50+ countries with support for multiple languages and regional employment regulations.</p>
          </div>

          <div class="advantage-item">
            <h4>📊 Data-Driven Insights</h4>
            <p>Comprehensive analytics that help both job seekers and employers make informed decisions about career and hiring strategies.</p>
          </div>
        </div>

        <h3>Target Markets</h3>
        <div class="market-segments">
          <div class="segment">
            <h4>Individual Professionals</h4>
            <ul>
              <li>Recent graduates entering the workforce</li>
              <li>Mid-career professionals seeking advancement</li>
              <li>Career changers exploring new industries</li>
              <li>Executives and senior leaders</li>
            </ul>
          </div>

          <div class="segment">
            <h4>Organizations</h4>
            <ul>
              <li>Technology companies (startups to enterprises)</li>
              <li>Professional services firms</li>
              <li>Healthcare and life sciences</li>
              <li>Financial services and fintech</li>
              <li>Educational institutions</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "growth-strategy",
      title: "Growth Strategy",
      content: `
        <h3>Expansion Roadmap</h3>
        <p>CareerForge's growth strategy focuses on three key pillars:</p>

        <div class="growth-pillars">
          <div class="pillar">
            <h4>🚀 Product Innovation</h4>
            <ul>
              <li>Continuous AI model improvements</li>
              <li>New feature development based on user feedback</li>
              <li>Integration with emerging technologies (AR/VR, blockchain)</li>
              <li>Expansion into adjacent markets (learning, networking)</li>
            </ul>
          </div>

          <div class="pillar">
            <h4>🌐 Geographic Expansion</h4>
            <ul>
              <li>Launch in emerging markets (Asia Pacific, Latin America)</li>
              <li>Localized content and language support</li>
              <li>Partnerships with regional employment agencies</li>
              <li>Compliance with international labor regulations</li>
            </ul>
          </div>

          <div class="pillar">
            <h4>🤝 Strategic Partnerships</h4>
            <ul>
              <li>Technology integrations with major HR platforms</li>
              <li>Educational institution partnerships</li>
              <li>Professional certification organizations</li>
              <li>Industry association collaborations</li>
            </ul>
          </div>
        </div>

        <h3>Key Performance Indicators</h3>
        <div class="kpi-grid">
          <div class="kpi-item">
            <span class="kpi-metric">Monthly Active Users</span>
            <span class="kpi-target">1M by 2025</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-metric">Enterprise Customers</span>
            <span class="kpi-target">50K by 2025</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-metric">Match Success Rate</span>
            <span class="kpi-target">97% by 2024</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-metric">Revenue Growth</span>
            <span class="kpi-target">300% YoY</span>
          </div>
        </div>
      `
    },

    {
      id: "team-leadership",
      title: "Leadership Team",
      content: `
        <h3>Executive Leadership</h3>
        <p>CareerForge is led by a team of experienced entrepreneurs and AI experts with deep backgrounds in technology, recruitment, and business development.</p>

        <div class="leadership-team">
          <div class="executive">
            <h4>Sarah Chen</h4>
            <p class="role">Chief Executive Officer</p>
            <p>Former VP of Engineering at LinkedIn with 15+ years in AI and machine learning. PhD in Computer Science from Stanford.</p>
          </div>

          <div class="executive">
            <h4>Michael Rodriguez</h4>
            <p class="role">Chief Technology Officer</p>
            <p>Ex-Principal Engineer at Google AI, specializing in natural language processing and recommendation systems.</p>
          </div>

          <div class="executive">
            <h4>Dr. Emily Watson</h4>
            <p class="role">Chief AI Officer</p>
            <p>Leading AI researcher with publications in machine learning and human-computer interaction. Former professor at MIT.</p>
          </div>

          <div class="executive">
            <h4>James Park</h4>
            <p class="role">Chief Operating Officer</p>
            <p>Former COO of Indeed, with extensive experience in scaling recruitment platforms and global operations.</p>
          </div>
        </div>

        <h3>Board of Directors</h3>
        <p>Our board includes industry veterans from leading technology companies and venture capital firms, providing strategic guidance and oversight.</p>
      `
    }
  ]
};