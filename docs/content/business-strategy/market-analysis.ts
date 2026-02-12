import { ContentDocument } from '@/lib/content-types'

export const marketAnalysisContent: ContentDocument = {
  metadata: {
    title: "Market Analysis",
    description: "Comprehensive analysis of the global career development and recruitment market, including size, trends, competitive landscape, and growth opportunities.",
    version: "1.0.0",
    lastUpdated: "2025-12-30",
    authors: ["Business Strategy Team"],
    tags: ["market analysis", "recruitment", "career development", "industry trends", "competitive landscape"],
    difficulty: "intermediate",
    estimatedTime: 25
  },

  sections: [
    {
      id: "market-overview",
      title: "Global Market Overview",
      content: `
        <h3>Market Size and Growth</h3>
        <p>The global recruitment and career development market represents a multi-trillion dollar opportunity with significant growth potential driven by digital transformation and AI adoption.</p>

        <div class="market-stats">
          <div class="stat-card">
            <span class="stat-value">$2.1T</span>
            <span class="stat-label">Global Recruitment Market (2025)</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">8.5%</span>
            <span class="stat-label">CAGR (2025-2030)</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">$4.2T</span>
            <span class="stat-label">Projected Market Size (2030)</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">45%</span>
            <span class="stat-label">Digital Transformation Rate</span>
          </div>
        </div>

        <h3>Key Market Segments</h3>
        <div class="market-segments">
          <div class="segment">
            <h4>🏢 Enterprise Recruitment</h4>
            <p>Large organizations' hiring solutions</p>
            <ul>
              <li>Market Size: $890B</li>
              <li>Growth Rate: 7.2%</li>
              <li>Key Players: LinkedIn, Indeed, Workday</li>
            </ul>
          </div>

          <div class="segment">
            <h4>💼 Professional Services</h4>
            <p>Individual career development tools</p>
            <ul>
              <li>Market Size: $450B</li>
              <li>Growth Rate: 12.8%</li>
              <li>Key Players: Coursera, Udemy, LinkedIn Learning</li>
            </ul>
          </div>

          <div class="segment">
            <h4>🤖 AI-Powered Solutions</h4>
            <p>AI-driven recruitment and matching</p>
            <ul>
              <li>Market Size: $180B</li>
              <li>Growth Rate: 28.5%</li>
              <li>Key Players: Eightfold, HireVue, CareerForge</li>
            </ul>
          </div>

          <div class="segment">
            <h4>🌐 Staffing & Temp Agencies</h4>
            <p>Traditional staffing services</p>
            <ul>
              <li>Market Size: $580B</li>
              <li>Growth Rate: 4.1%</li>
              <li>Key Players: Adecco, Randstad, Manpower</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "industry-trends",
      title: "Industry Trends & Drivers",
      content: `
        <h3>Major Market Drivers</h3>
        <div class="trend-drivers">
          <div class="driver">
            <h4>🎯 Skills Gap Crisis</h4>
            <p>The global skills gap is widening, with 85 million jobs going unfilled by 2030 due to skills mismatches.</p>
            <ul>
              <li>Technical skills shortage: 40% of jobs require digital skills</li>
              <li>Soft skills deficit: Communication and adaptability gaps</li>
              <li>Industry 4.0 transformation: New technology requirements</li>
              <li>Economic shifts: Remote work and gig economy changes</li>
            </ul>
          </div>

          <div class="driver">
            <h4>🤖 AI & Automation</h4>
            <p>AI adoption in recruitment is accelerating, with 75% of companies expected to use AI for hiring by 2025.</p>
            <ul>
              <li>Resume parsing and candidate screening</li>
              <li>Predictive analytics for candidate success</li>
              <li>Chatbots for initial candidate engagement</li>
              <li>Automated interview scheduling and feedback</li>
            </ul>
          </div>

          <div class="driver">
            <h4>🌍 Remote Work Revolution</h4>
            <p>The shift to remote and hybrid work has transformed recruitment dynamics globally.</p>
            <ul>
              <li>Global talent pools: Access to worldwide candidates</li>
              <li>Virtual interviews and assessments</li>
              <li>Remote onboarding and training</li>
              <li>Cultural adaptation challenges</li>
            </ul>
          </div>

          <div class="driver">
            <h4>📱 Mobile-First Recruitment</h4>
            <p>85% of job seekers use mobile devices for job searching, driving mobile-optimized solutions.</p>
            <ul>
              <li>Mobile applications for job searching</li>
              <li>One-click applications and quick matches</li>
              <li>Mobile-optimized career development tools</li>
              <li>Location-based job recommendations</li>
            </ul>
          </div>
        </div>

        <h3>Emerging Trends</h3>
        <div class="emerging-trends">
          <div class="trend">
            <h4>🧠 Predictive Career Analytics</h4>
            <p>AI-driven career trajectory predictions and personalized development plans</p>
          </div>
          <div class="trend">
            <h4>🎓 Lifelong Learning Integration</h4>
            <p>Seamless integration of learning platforms with career development</p>
          </div>
          <div class="trend">
            <h4>🌐 Metaverse Recruitment</h4>
            <p>Virtual reality job fairs and immersive interviewing experiences</p>
          </div>
          <div class="trend">
            <h4>🔗 Blockchain Credentials</h4>
            <p>Verifiable digital credentials and skill certifications</p>
          </div>
        </div>
      `
    },

    {
      id: "competitive-landscape",
      title: "Competitive Landscape",
      content: `
        <h3>Market Leaders</h3>
        <div class="competitors-grid">
          <div class="competitor">
            <h4>LinkedIn</h4>
            <div class="metrics">
              <span>Market Share: 28%</span>
              <span>Users: 900M+</span>
              <span>Revenue: $15B</span>
            </div>
            <p>Strengths: Network effects, professional data, enterprise solutions</p>
            <p>Weaknesses: High cost, complex interface, limited AI capabilities</p>
          </div>

          <div class="competitor">
            <h4>Indeed</h4>
            <div class="metrics">
              <span>Market Share: 18%</span>
              <span>Users: 350M+</span>
              <span>Revenue: $2.3B</span>
            </div>
            <p>Strengths: Job search dominance, simple UX, global reach</p>
            <p>Weaknesses: Limited career development tools, basic AI features</p>
          </div>

          <div class="competitor">
            <h4>Glassdoor</h4>
            <div class="metrics">
              <span>Market Share: 8%</span>
              <span>Users: 80M+</span>
              <span>Revenue: $320M</span>
            </div>
            <p>Strengths: Company reviews, salary data, employer branding</p>
            <p>Weaknesses: Smaller network, limited international presence</p>
          </div>

          <div class="competitor">
            <h4>Monster</h4>
            <div class="metrics">
              <span>Market Share: 6%</span>
              <span>Users: 200M+</span>
              <span>Revenue: $680M</span>
            </div>
            <p>Strengths: Established brand, resume database, assessment tools</p>
            <p>Weaknesses: Outdated technology, declining market share</p>
          </div>
        </div>

        <h3>AI-Focused Competitors</h3>
        <div class="ai-competitors">
          <div class="competitor">
            <h4>Eightfold AI</h4>
            <p>Focus: Talent intelligence and AI-powered recruiting</p>
            <p>Strengths: Advanced AI algorithms, enterprise focus</p>
            <p>Market Position: High-end enterprise solutions</p>
          </div>

          <div class="competitor">
            <h4>HireVue</h4>
            <p>Focus: Video interviewing and AI assessment</p>
            <p>Strengths: Video technology, assessment accuracy</p>
            <p>Market Position: Assessment and interviewing tools</p>
          </div>

          <div class="competitor">
            <h4>Paradox</h4>
            <p>Focus: AI-powered candidate experience</p>
            <p>Strengths: Conversational AI, candidate engagement</p>
            <p>Market Position: SMB and mid-market focus</p>
          </div>
        </div>

        <h3>Competitive Advantages Analysis</h3>
        <div class="swot-analysis">
          <div class="swot-section">
            <h4>Strengths</h4>
            <ul>
              <li>Proprietary AI matching algorithms</li>
              <li>Comprehensive career ecosystem approach</li>
              <li>Strong focus on candidate experience</li>
              <li>Global scalability and localization</li>
            </ul>
          </div>

          <div class="swot-section">
            <h4>Weaknesses</h4>
            <ul>
              <li>Relatively new entrant vs. established players</li>
              <li>Building network effects from scratch</li>
              <li>Resource constraints vs. larger competitors</li>
              <li>Complex technology stack to maintain</li>
            </ul>
          </div>

          <div class="swot-section">
            <h4>Opportunities</h4>
            <ul>
              <li>Rapid AI adoption in recruitment</li>
              <li>Growing remote work market</li>
              <li>Skills gap crisis creating demand</li>
              <li>Emerging markets with high growth potential</li>
            </ul>
          </div>

          <div class="swot-section">
            <h4>Threats</h4>
            <ul>
              <li>Established competitors with large user bases</li>
              <li>Economic downturns affecting hiring</li>
              <li>Regulatory changes in AI and data privacy</li>
              <li>Technology disruptions from new entrants</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "regional-analysis",
      title: "Regional Market Analysis",
      content: `
        <h3>North America</h3>
        <div class="regional-analysis">
          <div class="region-stats">
            <span>Market Size: $680B</span>
            <span>Growth Rate: 6.2%</span>
            <span>AI Adoption: 78%</span>
          </div>
          <div class="region-insights">
            <h4>Key Characteristics</h4>
            <ul>
              <li>Mature market with high digital adoption</li>
              <li>Strong focus on technology and innovation</li>
              <li>Complex regulatory environment (GDPR, CCPA)</li>
              <li>High competition from established players</li>
              <li>Premium pricing for advanced solutions</li>
            </ul>
            <h4>Growth Opportunities</h4>
            <ul>
              <li>AI-powered candidate experience</li>
              <li>Diversity and inclusion tools</li>
              <li>Skills-based hiring platforms</li>
              <li>Integration with existing HR tech stacks</li>
            </ul>
          </div>
        </div>

        <h3>Europe</h3>
        <div class="regional-analysis">
          <div class="region-stats">
            <span>Market Size: $420B</span>
            <span>Growth Rate: 7.8%</span>
            <span>AI Adoption: 65%</span>
          </div>
          <div class="region-insights">
            <h4>Key Characteristics</h4>
            <ul>
              <li>Strong emphasis on data privacy and ethics</li>
              <li>Multilingual requirements and localization</li>
              <li>Mature social welfare systems</li>
              <li>Focus on work-life balance and employee rights</li>
              <li>High adoption of remote work practices</li>
            </ul>
            <h4>Growth Opportunities</h4>
            <ul>
              <li>GDPR-compliant AI solutions</li>
              <li>Multilingual platform capabilities</li>
              <li>Cross-border recruitment tools</li>
              <li>Sustainable and ethical AI practices</li>
            </ul>
          </div>
        </div>

        <h3>Asia Pacific</h3>
        <div class="regional-analysis">
          <div class="region-stats">
            <span>Market Size: $580B</span>
            <span>Growth Rate: 12.5%</span>
            <span>AI Adoption: 55%</span>
          </div>
          <div class="region-insights">
            <h4>Key Characteristics</h4>
            <ul>
              <li>Rapid economic growth and urbanization</li>
              <li>Large and young workforce</li>
              <li>Diverse languages and cultural contexts</li>
              <li>Mobile-first user behavior</li>
              <li>Growing middle class with increasing expectations</li>
            </ul>
            <h4>Growth Opportunities</h4>
            <ul>
              <li>Mobile-optimized solutions</li>
              <li>Local language support and cultural adaptation</li>
              <li>Entry-level to executive career progression</li>
              <li>Integration with local employment ecosystems</li>
            </ul>
          </div>
        </div>

        <h3>Latin America</h3>
        <div class="regional-analysis">
          <div class="region-stats">
            <span>Market Size: $180B</span>
            <span>Growth Rate: 9.3%</span>
            <span>AI Adoption: 45%</span>
          </div>
          <div class="region-insights">
            <h4>Key Characteristics</h4>
            <ul>
              <li>Economic volatility and currency fluctuations</li>
              <li>Strong emphasis on personal relationships</li>
              <li>Growing middle class and digital adoption</li>
              <li>Multilingual requirements (Spanish, Portuguese)</li>
              <li>High mobile penetration and social media usage</li>
            </ul>
            <h4>Growth Opportunities</h4>
            <ul>
              <li>Affordable pricing models</li>
              <li>Relationship-focused platform features</li>
              <li>Mobile and social media integrations</li>
              <li>Economic resilience and local market understanding</li>
            </ul>
          </div>
        </div>

        <h3>Middle East & Africa</h3>
        <div class="regional-analysis">
          <div class="region-stats">
            <span>Market Size: $240B</span>
            <span>Growth Rate: 11.2%</span>
            <span>AI Adoption: 35%</span>
          </div>
          <div class="region-insights">
            <h4>Key Characteristics</h4>
            <ul>
              <li>Young and rapidly growing workforce</li>
              <li>Diverse cultural and religious contexts</li>
              <li>Economic diversification efforts</li>
              <li>Mobile-first digital adoption</li>
              <li>Growing expatriate and local talent markets</li>
            </ul>
            <h4>Growth Opportunities</h4>
            <ul>
              <li>Cultural adaptation and localization</li>
              <li>Mobile-optimized user experiences</li>
              <li>Skills development and education integration</li>
              <li>Cross-cultural communication tools</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "customer-analysis",
      title: "Customer Segmentation & Needs",
      content: `
        <h3>Individual Users (Job Seekers)</h3>
        <div class="customer-segment">
          <div class="segment-profile">
            <h4>🎓 Recent Graduates</h4>
            <ul>
              <li>Age: 20-25</li>
              <li>Tech-savvy, mobile-first</li>
              <li>Focus: Entry-level positions, career guidance</li>
              <li>Pain Points: Lack of experience, unclear career paths</li>
              <li>Needs: Career counseling, skill development, job matching</li>
            </ul>
          </div>

          <div class="segment-profile">
            <h4>💼 Mid-Career Professionals</h4>
            <ul>
              <li>Age: 30-45</li>
              <li>Established careers, seeking advancement</li>
              <li>Focus: Career transitions, leadership roles</li>
              <li>Pain Points: Skill gaps, work-life balance</li>
              <li>Needs: Career coaching, networking, upskilling</li>
            </ul>
          </div>

          <div class="segment-profile">
            <h4>🔄 Career Changers</h4>
            <ul>
              <li>Age: 25-50</li>
              <li>Experienced in one field, switching industries</li>
              <li>Focus: Skill transferability, new opportunities</li>
              <li>Pain Points: Lack of relevant experience, uncertainty</li>
              <li>Needs: Career transition support, skill assessment</li>
            </ul>
          </div>

          <div class="segment-profile">
            <h4>🌍 Global Nomads</h4>
            <ul>
              <li>Age: 25-40</li>
              <li>International experience, remote work</li>
              <li>Focus: Global opportunities, cultural adaptation</li>
              <li>Pain Points: Visa requirements, cultural differences</li>
              <li>Needs: International job matching, relocation support</li>
            </ul>
          </div>
        </div>

        <h3>Enterprise Customers</h3>
        <div class="enterprise-segments">
          <div class="enterprise-segment">
            <h4>🏭 Large Enterprises (10,000+ employees)</h4>
            <ul>
              <li>Complex hiring needs across multiple departments</li>
              <li>Focus: Talent acquisition, employer branding</li>
              <li>Requirements: Advanced analytics, compliance, integration</li>
              <li>Budget: High, enterprise-level solutions</li>
              <li>Decision Process: Multi-stakeholder, lengthy sales cycles</li>
            </ul>
          </div>

          <div class="enterprise-segment">
            <h4>🏢 Mid-Market Companies (500-10,000 employees)</h4>
            <ul>
              <li>Growing rapidly, need scalable solutions</li>
              <li>Focus: Efficient hiring, talent development</li>
              <li>Requirements: User-friendly tools, ROI focus</li>
              <li>Budget: Medium to high, feature-rich solutions</li>
              <li>Decision Process: Departmental approval, faster cycles</li>
            </ul>
          </div>

          <div class="enterprise-segment">
            <h4>🚀 Startups & SMBs (1-500 employees)</h4>
            <ul>
              <li>Resource constraints, fast-moving environment</li>
              <li>Focus: Quick hiring, cost-effective solutions</li>
              <li>Requirements: Easy implementation, flexible pricing</li>
              <li>Budget: Low to medium, value-driven purchases</li>
              <li>Decision Process: Founder/CEO driven, quick decisions</li>
            </ul>
          </div>
        </div>

        <h3>Customer Pain Points & Needs</h3>
        <div class="pain-points">
          <div class="pain-category">
            <h4>For Job Seekers</h4>
            <ul>
              <li>Time-consuming job search process</li>
              <li>Lack of personalized recommendations</li>
              <li>Difficulty assessing job-culture fit</li>
              <li>Limited career development resources</li>
              <li>Generic application processes</li>
            </ul>
          </div>

          <div class="pain-category">
            <h4>For Employers</h4>
            <ul>
              <li>High cost per hire</li>
              <li>Long time-to-fill positions</li>
              <li>Poor candidate quality</li>
              <li>Lack of diverse talent pools</li>
              <li>Complex compliance requirements</li>
            </ul>
          </div>
        </div>
      `
    },

    {
      id: "market-opportunities",
      title: "Market Opportunities & Entry Strategy",
      content: `
        <h3>Primary Market Opportunities</h3>
        <div class="opportunities-grid">
          <div class="opportunity">
            <h4>🎯 AI-Powered Matching Gap</h4>
            <p>Current solutions lack sophisticated AI matching capabilities</p>
            <ul>
              <li>Market Size: $120B opportunity</li>
              <li>Competitive Advantage: Proprietary algorithms</li>
              <li>Entry Strategy: Technology differentiation</li>
              <li>Timeline: Immediate opportunity</li>
            </ul>
          </div>

          <div class="opportunity">
            <h4>🌐 Global Expansion Potential</h4>
            <p>Untapped markets in emerging economies</p>
            <ul>
              <li>Market Size: $800B opportunity</li>
              <li>Competitive Advantage: Localization expertise</li>
              <li>Entry Strategy: Regional partnerships</li>
              <li>Timeline: 2-3 year horizon</li>
            </ul>
          </div>

          <div class="opportunity">
            <h4>📚 Skills Development Integration</h4>
            <p>Growing demand for lifelong learning solutions</p>
            <ul>
              <li>Market Size: $300B opportunity</li>
              <li>Competitive Advantage: Comprehensive ecosystem</li>
              <li>Entry Strategy: Platform integrations</li>
              <li>Timeline: 1-2 year horizon</li>
            </ul>
          </div>

          <div class="opportunity">
            <h4>🤝 Enterprise Solutions</h4>
            <p>Large organizations seeking advanced recruitment tech</p>
            <ul>
              <li>Market Size: $400B opportunity</li>
              <li>Competitive Advantage: Enterprise-grade features</li>
              <li>Entry Strategy: Direct sales and partnerships</li>
              <li>Timeline: 1-3 year horizon</li>
            </ul>
          </div>
        </div>

        <h3>Entry Strategy Recommendations</h3>
        <div class="entry-strategy">
          <div class="strategy-phase">
            <h4>Phase 1: Market Validation (Months 1-6)</h4>
            <ul>
              <li>Launch MVP with core AI matching features</li>
              <li>Target early adopter segments (tech-savvy users)</li>
              <li>Focus on product-market fit validation</li>
              <li>Build initial user base and gather feedback</li>
              <li>Establish brand presence and thought leadership</li>
            </ul>
          </div>

          <div class="strategy-phase">
            <h4>Phase 2: Product Expansion (Months 7-18)</h4>
            <ul>
              <li>Add advanced features (career coaching, skills assessment)</li>
              <li>Expand to adjacent markets (learning, networking)</li>
              <li>Develop enterprise solutions and partnerships</li>
              <li>Scale infrastructure and team</li>
              <li>Establish go-to-market motion</li>
            </ul>
          </div>

          <div class="strategy-phase">
            <h4>Phase 3: Market Leadership (Months 19-36)</h4>
            <ul>
              <li>Achieve market leadership in AI-powered recruitment</li>
              <li>Expand globally with localized offerings</li>
              <li>Build comprehensive career ecosystem</li>
              <li>Drive industry standards and partnerships</li>
              <li>Establish sustainable competitive advantages</li>
            </ul>
          </div>
        </div>

        <h3>Risk Assessment & Mitigation</h3>
        <div class="risk-matrix">
          <div class="risk-item">
            <h4>High Risk - High Impact</h4>
            <ul>
              <li><strong>Technology Competition:</strong> AI advancements by competitors</li>
              <li><strong>Regulatory Changes:</strong> Data privacy and AI regulations</li>
              <li><strong>Economic Downturn:</strong> Reduced hiring activity</li>
            </ul>
          </div>

          <div class="risk-item">
            <h4>Medium Risk - Medium Impact</h4>
            <ul>
              <li><strong>Market Saturation:</strong> Too many similar solutions</li>
              <li><strong>Technology Failures:</strong> AI model inaccuracies</li>
              <li><strong>Talent Acquisition:</strong> Hiring key technical talent</li>
            </ul>
          </div>

          <div class="risk-item">
            <h4>Low Risk - High Impact</h4>
            <ul>
              <li><strong>Partnership Opportunities:</strong> Strategic alliances</li>
              <li><strong>Technology Breakthroughs:</strong> AI advancements</li>
              <li><strong>Market Expansion:</strong> New geographic markets</li>
            </ul>
          </div>
        </div>
      `
    }
  ]
};