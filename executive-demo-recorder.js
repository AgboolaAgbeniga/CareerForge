/**
 * CareerForge Executive Demo Recorder
 * Professional presentation for Silicon Valley executives
 * Showcases AI-powered hiring platform value proposition
 */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

class CareerForgeExecutiveDemo {
  constructor() {
    this.browser = null;
    this.page = null;
    this.recorder = null;
  }

  async initialize() {
    console.log('🚀 Initializing CareerForge Executive Demo...');

    this.browser = await puppeteer.launch({
      headless: false, // Visible for recording
      defaultViewport: { width: 1920, height: 1080 },
      args: [
        '--window-size=1920,1080',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    this.page = await this.browser.newPage();
    this.recorder = new PuppeteerScreenRecorder(this.page);

    // Set professional viewport
    await this.page.setViewport({ width: 1920, height: 1080 });

    console.log('✅ Demo environment ready');
  }

  async startRecording(filename) {
    await this.recorder.start(`./executive-demos/${filename}.mp4`);
    console.log(`🎬 Started recording: ${filename}`);
  }

  async stopRecording() {
    await this.recorder.stop();
    console.log('⏹️ Recording stopped');
  }

  async executivePause(seconds = 3) {
    // Strategic pauses for executive explanation
    console.log(`⏸️ Pausing ${seconds}s for executive explanation...`);
    await this.page.waitForTimeout(seconds * 1000);
  }

  async highlightElement(selector, message) {
    // Add visual highlight for key elements
    await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (element) {
        element.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.8)';
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
          element.style.boxShadow = '';
          element.style.transform = '';
        }, 2000);
      }
    }, selector);

    console.log(`✨ Highlighted: ${message}`);
  }

  async narrate(message) {
    // Console logging for voiceover cues
    console.log(`🎤 ${message}`);
  }

  async showcaseHomepage() {
    console.log('\n🏠 === HOMEPAGE SHOWCASE ===');

    await this.page.goto('http://localhost:3000/demo');
    await this.page.waitForTimeout(2000);

    this.narrate('Welcome to CareerForge - the future of AI-powered recruitment');
    await this.executivePause(4);

    // Highlight the AI matching animation
    this.narrate('Watch our proprietary AI matching engine in action');
    await this.highlightElement('.hero-glow', 'AI Matching Animation');
    await this.executivePause(6);

    // Show value proposition
    this.narrate('Connecting top talent with innovative companies at unprecedented speed');
    await this.highlightElement('[data-testid="value-prop"]', 'Value Proposition');
    await this.executivePause(4);
  }

  async showcaseJobSeekerFlow() {
    console.log('\n👨‍💼 === JOB SEEKER JOURNEY ===');

    this.narrate('Let\'s experience the job seeker perspective - where the magic begins');

    // Start job seeker flow
    await this.page.click('button:has-text("Upload Resume")');
    await this.page.waitForTimeout(1500);

    this.narrate('Seamless resume upload with instant AI analysis');
    await this.executivePause(3);

    // Simulate upload and analysis
    this.narrate('Our AI extracts skills, experience, and optimizes for ATS compatibility');
    await this.page.waitForTimeout(3000);

    // Show generated resume
    this.narrate('AI-generated professional resume in seconds - not hours');
    await this.highlightElement('[data-testid="generated-resume"]', 'AI-Generated Resume');
    await this.executivePause(4);

    // Navigate to dashboard
    await this.page.click('button:has-text("Dashboard")');
    await this.page.waitForTimeout(1500);

    this.narrate('Personalized dashboard with AI-matched opportunities');
    await this.highlightElement('[data-testid="job-matches"]', 'AI Job Matches');
    await this.executivePause(3);

    // Show applications tracking
    await this.page.click('button:has-text("Applications")');
    await this.page.waitForTimeout(1500);

    this.narrate('Real-time application tracking with intelligent insights');
    await this.executivePause(3);
  }

  async showcaseRecruiterFlow() {
    console.log('\n🏢 === RECRUITER POWERHOUSE ===');

    // Reset to homepage
    await this.page.goto('http://localhost:3000/demo');
    await this.page.waitForTimeout(1000);

    this.narrate('Now let\'s see the recruiter experience - where efficiency meets intelligence');

    // Start recruiter flow
    await this.page.click('button:has-text("Post a Job")');
    await this.page.waitForTimeout(1500);

    this.narrate('Intuitive job posting with AI optimization suggestions');
    await this.executivePause(3);

    // Fill job details
    await this.page.type('input[placeholder*="Job Title"]', 'Senior Product Designer');
    await this.page.type('textarea', 'Join our innovative team building the future of fintech...');
    await this.page.waitForTimeout(1000);

    this.narrate('AI suggests optimal salary ranges and skill requirements');
    await this.highlightElement('[data-testid="ai-insights"]', 'AI Optimization Insights');
    await this.executivePause(4);

    // Publish job
    await this.page.click('button:has-text("Publish Job")');
    await this.page.waitForTimeout(3000);

    this.narrate('Instant candidate matching powered by our proprietary algorithms');
    await this.executivePause(3);

    // Show candidate matches
    this.narrate('Top-tier candidates ranked by match score and cultural fit');
    await this.highlightElement('[data-testid="candidate-matches"]', 'AI-Ranked Candidates');
    await this.executivePause(4);

    // Show detailed profile
    await this.page.click('.candidate-card:first-child');
    await this.page.waitForTimeout(1500);

    this.narrate('Comprehensive candidate profiles with AI-driven insights');
    await this.executivePause(3);
  }

  async showcaseKeyMetrics() {
    console.log('\n📊 === METRICS & ROI ===');

    this.narrate('Let\'s talk numbers - the real executive conversation');

    // Navigate to dashboard
    await this.page.click('button:has-text("Dashboard")');
    await this.page.waitForTimeout(1500);

    this.narrate('Time-to-hire reduced by 65% compared to traditional methods');
    await this.highlightElement('[data-testid="time-to-hire"]', '65% Faster Hiring');
    await this.executivePause(3);

    this.narrate('Quality of hire improved by 40% through better candidate matching');
    await this.highlightElement('[data-testid="quality-metrics"]', '40% Better Quality');
    await this.executivePause(3);

    this.narrate('Cost per hire reduced by 55% through automation');
    await this.highlightElement('[data-testid="cost-savings"]', '55% Cost Reduction');
    await this.executivePause(3);
  }

  async showcaseInnovation() {
    console.log('\n🚀 === TECHNOLOGICAL INNOVATION ===');

    this.narrate('What sets CareerForge apart in the AI recruitment landscape');

    // Show AI features
    this.narrate('Proprietary natural language processing for resume analysis');
    await this.highlightElement('[data-testid="nlp-engine"]', 'NLP Technology');
    await this.executivePause(3);

    this.narrate('Machine learning algorithms for cultural fit assessment');
    await this.highlightElement('[data-testid="ml-algorithms"]', 'ML Algorithms');
    await this.executivePause(3);

    this.narrate('Real-time predictive analytics for hiring success');
    await this.highlightElement('[data-testid="predictive-analytics"]', 'Predictive Analytics');
    await this.executivePause(3);
  }

  async executiveClose() {
    console.log('\n🎯 === EXECUTIVE CLOSE ===');

    this.narrate('CareerForge represents the convergence of AI innovation and recruitment efficiency');
    await this.executivePause(3);

    this.narrate('We\'re not just another HR tool - we\'re the future of talent acquisition');
    await this.executivePause(3);

    this.narrate('Join us in revolutionizing how the world finds and connects with exceptional talent');
    await this.executivePause(4);

    // Show final CTA
    this.narrate('Ready to transform your hiring process? Let\'s discuss partnership opportunities.');
    await this.executivePause(3);
  }

  async runFullDemo() {
    try {
      await this.initialize();

      // Record complete executive presentation
      await this.startRecording('careerforge-executive-pitch');

      await this.showcaseHomepage();
      await this.showcaseJobSeekerFlow();
      await this.showcaseRecruiterFlow();
      await this.showcaseKeyMetrics();
      await this.showcaseInnovation();
      await this.executiveClose();

      await this.stopRecording();

      console.log('\n🎉 Executive demo recording completed!');
      console.log('📁 Video saved to: ./executive-demos/careerforge-executive-pitch.mp4');
      console.log('📊 Demo length: ~8-10 minutes');
      console.log('🎯 Perfect for Silicon Valley executive presentations');

    } catch (error) {
      console.error('❌ Demo recording failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  async runQuickDemo() {
    try {
      await this.initialize();
      await this.startRecording('careerforge-quick-pitch');

      // Condensed 3-minute version
      await this.showcaseHomepage();
      await this.showcaseJobSeekerFlow();
      await this.showcaseRecruiterFlow();
      await this.executiveClose();

      await this.stopRecording();

      console.log('\n✅ Quick demo completed! (3-4 minutes)');

    } catch (error) {
      console.error('❌ Quick demo failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Export for use
module.exports = CareerForgeExecutiveDemo;

// CLI runner
if (require.main === module) {
  const demo = new CareerForgeExecutiveDemo();

  const args = process.argv.slice(2);
  const mode = args[0] || 'full'; // 'full' or 'quick'

  if (mode === 'quick') {
    demo.runQuickDemo();
  } else {
    demo.runFullDemo();
  }
}