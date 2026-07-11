import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  Terminal, ShieldCheck, Database, Award, Mail, 
  Linkedin, Github, CheckCircle, Sparkles, ChevronRight,
  Cpu, GitBranch, Layers, ShieldAlert, Workflow, Heart, Download, Printer,
  Sun, Moon, ArrowUp, Copy, Check, Star
} from 'lucide-react';
import { resumeData } from './data';
import ConsolePanel from './components/ConsolePanel';
import MetricCard from './components/MetricCard';
import Timeline from './components/Timeline';
import ProjectsSection from './components/ProjectsSection';
import EducationCerts from './components/EducationCerts';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'projects' | 'education'>('overview');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [deviceType, setDeviceType] = useState<'Phone' | 'Tablet' | 'Laptop' | 'Desktop'>('Desktop');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => setIsLoading(false), 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === 't') {
        setTheme(prev => {
          const newTheme = prev === 'dark' ? 'light' : 'dark';
          setToastMessage(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`);
          return newTheme;
        });
      } else if (e.key.toLowerCase() === 's') {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setToastMessage('Scrolled to Skills section');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quotes = [
    "QA is not about finding bugs at the end of the sprint. It is about architecting continuous verification gates that save developer cycles and secure absolute production reliability.",
    "Automated testing isn't just about speed; it's about the confidence to deploy a critical patch at 5 PM on a Friday and sleep peacefully through the weekend.",
    "A test suite that is slow or flaky is worse than having no tests at all. Reliability, speed, and determinism are the three pillars of modern SDET engineering.",
    "Shift-left validation means catching defects before they ever compile. We don't just inspect quality; we code it directly into the continuous integration pipelines.",
    "Data integrity migration is a game of absolute precision. When validating millions of records across Oracle and GCP, a 99.9% pass rate is still a failure.",
    "Great SDETs build automation that acts as a multiplier for the entire engineering organization, eliminating toil and streamlining release cycles."
  ];

  useEffect(() => {
    // Keep a dynamic ticking timestamp with seconds
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    // Rotate quotes index every 8 seconds
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  useEffect(() => {
    // Handle device type detection automatically
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setDeviceType('Phone');
      else if (w < 1024) setDeviceType('Tablet');
      else if (w < 1440) setDeviceType('Laptop');
      else setDeviceType('Desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Detect system color scheme and pre-set mode automatically
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(systemPrefersDark.matches ? 'dark' : 'light');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    systemPrefersDark.addEventListener('change', handleSystemThemeChange);
    return () => systemPrefersDark.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const downloadResume = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFont('Helvetica', 'normal');
    
    // Page 1 Header
    doc.setFontSize(22);
    doc.setFont('Helvetica', 'bold');
    doc.text('Sayak Sen', 105, 18, { align: 'center' });
    
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    doc.text('Automation Engineer | Python Automation | Playwright | Guidewire QA | GCP | Oracle | Informatica/IICS', 105, 23, { align: 'center' });
    doc.text('Bengaluru, Karnataka, India | +91 6290890754 | ssayak02@gmail.com | linkedin.com/in/sayak--sen/ | GitHub', 105, 27, { align: 'center' });
    
    // Line separator
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 30, 195, 30);
    
    let y = 37;
    
    // Professional Summary
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('PROFESSIONAL SUMMARY', 15, y);
    y += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    const summaryText = "Automation Engineer with 2+ years of hands-on experience designing and executing end-to-end test life cycles across Guidewire PolicyCenter / ClaimCenter, GCP and Oracle DB. Delivered 100% SLA compliance and zero P0 defects in production across all release cycles. Proficient in Python/Playwright automation, CI/CD pipeline integration, REST API validation, cloud data migration testing, and stakeholder quality dashboards.";
    const splitSummary = doc.splitTextToSize(summaryText, 180);
    doc.text(splitSummary, 15, y);
    y += splitSummary.length * 4 + 4;
    
    // Technical Skills
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('TECHNICAL SKILLS', 15, y);
    y += 4.5;
    doc.setFontSize(8.5);
    
    const skillsList = [
      { label: 'Test Automation:', val: 'Playwright, Python, PyTest, TypeScript, Robo Framework, Codegen, PySpark, Apache' },
      { label: 'Cloud & Databases:', val: 'GCP (BigQuery, Cloud SQL), Oracle DB, DBeaver, SQL Optimisation' },
      { label: 'API & Backend:', val: 'REST API Validation, Source-to-Target Reconciliation, Postman, EchoAPI' },
      { label: 'ETL & Pipelines:', val: 'Informatica IICS, ETL Monitoring & Optimisation' },
      { label: 'Domain:', val: 'Guidewire PolicyCenter & ClaimCenter — Functional, Regression, UAT' },
      { label: 'DevOps & Tools:', val: 'Git, JIRA, CI/CD, Allure Reporting, Agile/Scrum' },
      { label: 'AI & GenAI:', val: 'GitHub Copilot, ChatGPT/LLMs — Rapid Prototyping, Test Case Generation' },
      { label: 'Programming:', val: 'Python, SQL, TypeScript, JavaScript, Java (OOP/DSA)' }
    ];
    
    skillsList.forEach((skill) => {
      doc.setFont('Helvetica', 'bold');
      doc.text(skill.label, 15, y);
      doc.setFont('Helvetica', 'normal');
      doc.text(skill.val, 55, y);
      y += 4.2;
    });
    
    y += 4;
    
    // Professional Experience
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('PROFESSIONAL EXPERIENCE', 15, y);
    y += 5;
    
    // Altimetrik
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold');
    doc.text('Altimetrik India', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('Jun 2025 - Present', 195, y, { align: 'right' });
    y += 4;
    doc.setFont('Helvetica', 'bolditalic');
    doc.text('Automation Engineer — Testing', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('Bengaluru, KA', 195, y, { align: 'right' });
    y += 5;
    
    doc.setFontSize(8.5);
    const altBullets = [
      "Achieved 100% SLA compliance and zero production rollbacks by designing and executing 150+ Playwright/Python test cases across Guidewire PolicyCenter and ClaimCenter insurance workflows, covering functional, regression.",
      "Reduced backend data defect leakage to zero across all pre- and post-deployment verification cycles by implementing a multi-source validation framework spanning GCP (BigQuery, Cloud SQL), Oracle DB, and DBeaver.",
      "Maintained 100% on-time delivery and zero stakeholder complaints by authoring test plans, leading peer reviews, and publishing release-gate quality dashboards at every sprint cycle end."
    ];
    
    altBullets.forEach((bullet) => {
      const splitBullet = doc.splitTextToSize("•  " + bullet, 178);
      doc.text(splitBullet, 17, y);
      y += splitBullet.length * 4 + 1.2;
    });
    
    y += 4;
    
    // SLK Software
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold');
    doc.text('SLK Software Services Pvt. Ltd.', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('Jun 2024 - Jun 2025', 195, y, { align: 'right' });
    y += 4;
    doc.setFont('Helvetica', 'bolditalic');
    doc.text('QA Engineer / SDET', 15, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('Bengaluru, KA', 195, y, { align: 'right' });
    y += 5;
    
    doc.setFontSize(8.5);
    const slkBullets = [
      "Reduced manual regression effort by ~60% and enabled consistent weekly release cadence by architecting end-to-end automated test suites in Python, TypeScript, and Playwright across 3 enterprise Guidewire insurance platforms.",
      "Compressed a multi-week cross-cloud validation effort to days — a ~90% acceleration by leveraging GitHub Copilot, LLMs, and Model-Based Testing to build a GCP <-> Oracle data validation framework.",
      "Maintained a zero P0-defect-in-production record across 10+ Guidewire deployments by owning end-to-end defect triage, replication documentation, and root-cause analysis for PolicyCenter and ClaimCenter releases.",
      "Ensured 100% data integrity compliance pre- and post-deployment by building source-to-target reconciliation pipelines that validated 500+ tables and 1M+ records across GCP, Oracle DB, and DBeaver.",
      "Reduced QA cycle time by 50-60% by developing TypeScript + Playwright GUI automation suites for Planview Portfolios with cross-browser coverage, fully integrated into CI/CD for nightly regression runs."
    ];
    
    slkBullets.forEach((bullet) => {
      const splitBullet = doc.splitTextToSize("•  " + bullet, 178);
      doc.text(splitBullet, 17, y);
      y += splitBullet.length * 4 + 1.2;
    });
    
    // Page 2 setup
    doc.addPage();
    let y2 = 18;
    
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('KEY PROJECTS & ACHIEVEMENTS', 15, y2);
    y2 += 5.5;
    
    // TAP Migration project
    doc.setFontSize(9.5);
    doc.setFont('Helvetica', 'bold');
    doc.text('TAP Migration — Guidewire & Cloud Data Migration |', 15, y2);
    y2 += 4;
    doc.setFont('Helvetica', 'italic');
    doc.text('Python, Playwright, Oracle, Informatica IICS, GCP, BigQuery, SQL', 15, y2);
    y2 += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    const proj1Bullets = [
      "Reduced manual validation effort by ~75% and compressed sign-off time from 3 days to under 4 hours by building Python reconciliation scripts validating data integrity across 10+ domains, 500+ tables, and 1M+ records during Oracle-to-GCP migration.",
      "Improved ETL pipeline reliability by ~30% and execution performance by ~30% by designing, monitoring, and SQL-optimising 15+ Informatica IICS transformation pipelines."
    ];
    proj1Bullets.forEach((bullet) => {
      const splitBullet = doc.splitTextToSize("•  " + bullet, 178);
      doc.text(splitBullet, 17, y2);
      y2 += splitBullet.length * 4 + 1.2;
    });
    
    y2 += 4;
    
    // ClaimCenter Migration project
    doc.setFontSize(9.5);
    doc.setFont('Helvetica', 'bold');
    doc.text('ClaimCenter Migration — CI/CD-Integrated Regression Framework |', 15, y2);
    y2 += 4;
    doc.setFont('Helvetica', 'italic');
    doc.text('Python, CI/CD, Allure Reporting, BigQuery, Cloud SQL, Oracle DB', 15, y2);
    y2 += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    const proj2Bullets = [
      "Reduced regression cycle time by ~40% by designing a scalable CI/CD regression framework with Allure dashboards enabling nightly automated runs.",
      "Compressed story completion from 5 days to under 24 hours by automating 100% of previously manual Guidewire ClaimCenter workflows."
    ];
    proj2Bullets.forEach((bullet) => {
      const splitBullet = doc.splitTextToSize("•  " + bullet, 178);
      doc.text(splitBullet, 17, y2);
      y2 += splitBullet.length * 4 + 1.2;
    });
    
    y2 += 4;
    
    // Guidewire Regression Suite
    doc.setFontSize(9.5);
    doc.setFont('Helvetica', 'bold');
    doc.text('Guidewire Regression Suite — PolicyCenter & ClaimCenter |', 15, y2);
    y2 += 4;
    doc.setFont('Helvetica', 'italic');
    doc.text('Python, Playwright, TypeScript', 15, y2);
    y2 += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    const proj3Bullets = [
      "Eliminated post-production defect leakage and improved release confidence across all sprints by creating and maintaining 1,000+ automated regression test cases for Guidewire PolicyCenter and ClaimCenter."
    ];
    proj3Bullets.forEach((bullet) => {
      const splitBullet = doc.splitTextToSize("•  " + bullet, 178);
      doc.text(splitBullet, 17, y2);
      y2 += splitBullet.length * 4 + 1.2;
    });
    
    y2 += 6;
    
    // Education
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('EDUCATION', 15, y2);
    y2 += 5.5;
    
    // NIT
    doc.setFontSize(9.5);
    doc.setFont('Helvetica', 'bold');
    doc.text('Narula Institute of Technology', 15, y2);
    doc.setFont('Helvetica', 'normal');
    doc.text('Jul 2020 - Jul 2024', 195, y2, { align: 'right' });
    y2 += 4;
    doc.text('B.Tech in Computer Science & Engineering', 15, y2);
    doc.text('West Bengal', 195, y2, { align: 'right' });
    y2 += 5.5;
    
    // NES
    doc.setFont('Helvetica', 'bold');
    doc.text('National English School', 15, y2);
    doc.setFont('Helvetica', 'normal');
    doc.text('Apr 2018 - Apr 2020', 195, y2, { align: 'right' });
    y2 += 4;
    doc.text('Science with Maths', 15, y2);
    doc.text('West Bengal', 195, y2, { align: 'right' });
    y2 += 5.5;
    
    // CBS
    doc.setFont('Helvetica', 'bold');
    doc.text("Calcutta Boys' School", 15, y2);
    y2 += 4;
    doc.setFont('Helvetica', 'normal');
    doc.text('Secondary Education', 15, y2);
    doc.text('West Bengal', 195, y2, { align: 'right' });
    y2 += 8;
    
    // Certifications
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('CERTIFICATIONS', 15, y2);
    y2 += 5.5;
    
    doc.setFontSize(8.5);
    doc.setFont('Helvetica', 'normal');
    const certs = [
      "✓ Google AI Professional",
      "✓ Google Cloud Platform (GCP) Fundamentals",
      "✓ Playwright with TypeScript — Advanced Automation",
      "✓ Python Automation — GCP BigQuery / Cloud SQL <-> Oracle DB",
      "✓ Agile & Scrum Practitioner",
      "In Progress: ISTQB Foundation Level; Google Cloud Generative AI Leader Professional"
    ];
    certs.forEach((cert) => {
      doc.text(cert, 15, y2);
      y2 += 4;
    });
    
    doc.save('Sayak_Sen_SDET_Resume.pdf');
  };

  const isDark = theme === 'dark';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [type]: true }));
    setToastMessage(`Copied ${type} to clipboard`);
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [type]: false })), 2000);
  };

  return (
    <div className={`overflow-x-hidden min-h-screen font-sans relative transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-200 ${
      isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-[#faf8f5] text-stone-900'
    }`}>
      {/* Background grid overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
        isDark ? 'bg-grid-pattern-dark opacity-45' : 'bg-grid-pattern opacity-35'
      }`}></div>
      
      {/* Subtle ambient light leaks */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 transition-all duration-350 ${
        isDark ? 'bg-amber-500/5' : 'bg-amber-500/3'
      }`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 transition-all duration-350 ${
        isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/3'
      }`}></div>
 
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col min-h-screen justify-between gap-12">
        
        {/* Navigation / Header bar */}
        <header className={`border-b pb-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 transition-colors duration-300 ${
          isDark ? 'border-neutral-900' : 'border-stone-200/80'
        }`}>
          {/* Logo Group */}
          <div className="flex items-center gap-3 w-full xl:w-auto flex-shrink-0">
            <div className={`p-2.5 rounded-xl shadow-lg transition-colors flex-shrink-0 ${
              isDark ? 'bg-amber-500 text-neutral-950 shadow-amber-500/10' : 'bg-stone-900 text-amber-100 shadow-stone-900/10'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className={`text-lg sm:text-xl font-bold tracking-tighter font-display ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>
                  SAYAK SEN
                </h1>
                <span className={`hidden sm:inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                  isDark ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  SDET v2.8
                </span>
                <span className={`hidden sm:inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                  isDark ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  AI Automation Engineer
                </span>
                <span className={`hidden sm:inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                  isDark ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' : 'bg-sky-100 text-sky-800 border-sky-200'
                }`}>
                  Quality Analyst (QA)
                </span>
              </div>
              <p className={`text-[10px] sm:text-xs font-mono mt-0.5 ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                SLK Software & Altimetrik Alumni • AI Automation Engineer
              </p>
            </div>
          </div>

          {/* Meta Bar and Theme Toggle Container */}
          <div className="flex items-center justify-between w-full xl:w-auto gap-4">
            {/* Meta Bar */}
            <div className="flex-1 flex overflow-hidden xl:justify-center">
              <div className={`flex flex-nowrap items-center gap-3 px-4 py-2 rounded-lg border font-mono text-[9.5px] sm:text-[11px] w-full xl:w-auto overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                isDark ? 'bg-neutral-900/60 border-neutral-800/60 text-neutral-400' : 'bg-white border-stone-200 text-stone-600 shadow-sm'
              }`}>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>Device: <strong className={isDark ? 'text-amber-500' : 'text-amber-700'}>{deviceType}</strong></span>
                </div>
                
                {/* Hide SLA on tiny screens to fit everything */}
                <span className={`hidden sm:inline-block ${isDark ? 'text-neutral-600' : 'text-stone-300'}`}>•</span>
                
                <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>SLA Rate: <strong className={isDark ? 'text-emerald-500' : 'text-emerald-700'}>100%</strong></span>
                </div>
                
                <span className={isDark ? 'text-neutral-600' : 'text-stone-300'}>•</span>
                
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 lg:hidden"></span>
                  <span>Environment: <strong className={isDark ? 'text-amber-500' : 'text-amber-700'}>GCP/Oracle/Robo Framework</strong></span>
                </div>

                {currentTime && (
                  <>
                    <span className={isDark ? 'text-neutral-600' : 'text-stone-300'}>•</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span>Clock: <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700 font-bold'}>{currentTime}</strong></span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Theme Toggle (Unified for Desktop and Mobile) */}
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none flex-shrink-0 border ${
                isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-stone-200 border-stone-300 shadow-inner'
              }`}
              title={`Toggle system styling to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              <span className={`absolute inset-0 flex justify-between px-1.5 items-center ${isDark ? 'text-amber-500' : 'text-amber-700'}`}>
                <Moon className="w-4 h-4" />
                <Sun className="w-4 h-4" />
              </span>
              <span
                className={`inline-block h-6 w-6 transform rounded-full transition-transform duration-300 z-10 ${
                  isDark ? 'translate-x-9 bg-neutral-200 shadow-sm' : 'translate-x-1 bg-white shadow-md'
                }`}
              />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-6">
          {/* Hero details - Left 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono w-fit ${
              isDark 
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                : 'bg-amber-50 border-amber-200 text-amber-800 shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Bengaluru, Kolkata, Mumbai, Gurgaon, Hyderabad & Remote Roles</span>
            </div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-display leading-[1.1] ${
              isDark ? 'text-neutral-100' : 'text-stone-900'
            }`}>
              Building bulletproof <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isDark ? 'from-amber-400 via-amber-500 to-emerald-500' : 'from-amber-700 via-amber-600 to-emerald-700'
              }`}>
                Automation Pipelines.
              </span>
            </h2>

            <div className={`min-h-[110px] sm:min-h-[90px] flex items-center p-5 rounded-2xl border transition-colors ${
              isDark ? 'bg-neutral-900/30 border-neutral-800/60' : 'bg-white border-stone-200 shadow-md shadow-stone-100/40'
            }`}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                  className={`text-xs md:text-sm leading-relaxed font-sans italic max-w-2xl border-l-2 pl-4 ${
                    isDark ? 'text-neutral-300 border-amber-500' : 'text-stone-700 border-amber-600 font-medium'
                  }`}
                >
                  "{quotes[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className={`text-sm md:text-base leading-relaxed max-w-2xl ${isDark ? 'text-neutral-400' : 'text-stone-600 font-medium'}`}>
              With 2+ years of hands-on SDET and testing experience, I build robust <strong>Python & TypeScript Playwright</strong> frameworks, validate high-stakes <strong>Oracle and GCP cloud migrations</strong>, and engineer <strong>Guidewire (PolicyCenter & ClaimCenter)</strong> testing suites.
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className={`px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg ${
                  isDark
                    ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/15'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-100 shadow-stone-900/10 border border-stone-950'
                }`}
              >
                Hire Sayak Sen 
              </a>
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setTimeout(() => {
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                }}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider rounded-xl transition text-left border ${
                  isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-350 text-stone-700 shadow-sm'
                }`}
              >
                Inspect Tech Stack
              </button>
              <button
                onClick={() => window.print()}
                className={`px-4 py-2.5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider rounded-xl transition border ${
                  isDark
                    ? 'bg-neutral-950/40 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-sky-500'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-sky-600 text-stone-600 hover:text-sky-800 shadow-sm'
                }`}
                title="Print Dashboard"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={downloadResume}
                className={`px-4 py-2.5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider rounded-xl transition border ${
                  isDark
                    ? 'bg-neutral-950/40 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-amber-500'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-600 text-stone-600 hover:text-amber-800 shadow-sm'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Resume PDF</span>
              </button>
            </div>
          </div>

          {/* Interactive sandbox terminal console - Right 5 columns */}
          <div className="lg:col-span-5">
            <ConsolePanel theme={theme} deviceType={deviceType} />
          </div>
        </section>

        {/* Bento Grid Stats - Highlights */}
        <section className="py-8">
          <div className={`flex items-center gap-2 mb-8 pb-4 border-b ${
            isDark ? 'border-neutral-900' : 'border-stone-200'
          }`}>
            <h3 className={`text-sm font-mono uppercase tracking-widest font-black ${
              isDark ? 'text-neutral-200' : 'text-stone-800'
            }`}>
              Continuous Verification & QA SLA Dashboard Highlights
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Zero Defect Leakage"
              value="0"
              sub="Zero P0/P1 defects leaked to production across all release cycles."
              iconName="ShieldCheck"
              color="emerald"
              statusText="E2E Release Gates"
              theme={theme}
              detailedActions={[
                "Built automated parallel reconciliation scripts across Oracle and GCP BigQuery database layers.",
                "Deployed comprehensive UI/API Playwright checks on release deployment branches.",
                "Set up continuous nightly automated validation pipelines with instant-alert slack webhooks."
              ]}
            />
            <MetricCard
              label="Test Execution"
              value="5000+"
              sub="Automated test cases written for PolicyCenter & ClaimCenter."
              iconName="Workflow"
              color="amber"
              statusText="Guidewire Suite"
              theme={theme}
              detailedActions={[
                "Engineered complete Guidewire PolicyCenter and ClaimCenter automation regression suites.",
                "Parallelized end-to-end regression workflows using multi-threaded Playwright browser workers.",
                "Created intelligent test-data generator modules simulating full claims lifecycle data sets."
              ]}
            />
            <MetricCard
              label="Migration Sign-off"
              value="< 4 hrs"
              sub="Reduced cloud data migration sign-off time from 3 days to under 4 hours."
              iconName="Layers"
              color="sky"
              statusText="Oracle ↔ GCP"
              theme={theme}
              detailedActions={[
                "Automated source-to-target cloud synchronizations mapping over 500+ database tables.",
                "Eliminated tedious manual cell-by-cell inspection loops with parallel execution checks.",
                "Designed and coded immediate data-type validation audits safeguarding target DB schemas."
              ]}
            />
            <MetricCard
              label="Effort Savings"
              value="~60%"
              sub="Saved developer and manual tester regression effort with nightly pipelines."
              iconName="Cpu"
              color="rose"
              statusText="CI/CD Pipelines"
              theme={theme}
              detailedActions={[
                "Integrated continuous regressions directly into GitHub Actions with self-healing retry logic.",
                "Configured automatic reporting dashboards (Allure) with auto-captured screenshots.",
                "Offered instant developer self-trigger queues to rapidly isolate newly checked-in faults."
              ]}
            />
          </div>
        </section>

        {/* Navigation tabs for main details */}
        <section className="mb-12">
          <div className={`flex border-b flex-wrap gap-6 ${
            isDark ? 'border-neutral-900' : 'border-stone-200'
          }`}>
            {[
              { id: 'overview', label: 'Skills Matrix' },
              { id: 'experience', label: 'Experience Timeline' },
              { id: 'projects', label: 'Key Achievements' },
              { id: 'education', label: 'Education & Certifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative pb-3 text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  activeTab === tab.id
                    ? isDark
                      ? "text-amber-500 font-bold"
                      : "text-amber-700 font-bold"
                    : isDark
                    ? "text-neutral-400 hover:text-neutral-200"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-underline"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full ${
                      isDark ? "bg-amber-500" : "bg-amber-600"
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className={`h-8 w-64 rounded ${isDark ? 'bg-neutral-800' : 'bg-stone-200'}`}></div>
                <div className={`h-4 w-96 rounded max-w-full ${isDark ? 'bg-neutral-800' : 'bg-stone-200'}`}></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={`h-32 rounded-xl border ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-stone-200 bg-white'}`}></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Tab: Overview (Skills Matrix) */}
                {activeTab === 'overview' && (
                  <div id="skills" className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>
                        Technical Competency Index
                      </h3>
                  <p className={`text-xs font-serif italic max-w-xl ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                    Engineered to cover full stack automation from front-end Playwright tests to backend GCP-to-Oracle validation frameworks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {resumeData.skills.map((skillGroup, idx) => {
                    const getIcon = (cat: string) => {
                      switch (cat) {
                        case 'Test Automation': return <Cpu className={`w-4 h-4 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />;
                        case 'Cloud & Databases': return <Database className={`w-4 h-4 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />;
                        case 'API & Backend': return <GitBranch className={`w-4 h-4 ${isDark ? 'text-sky-500' : 'text-sky-600'}`} />;
                        case 'ETL & Pipelines': return <Layers className={`w-4 h-4 ${isDark ? 'text-violet-500' : 'text-violet-650'}`} />;
                        case 'Domain Expertise': return <ShieldAlert className={`w-4 h-4 ${isDark ? 'text-rose-500' : 'text-rose-600'}`} />;
                        case 'DevOps & Tools': return <Workflow className={`w-4 h-4 ${isDark ? 'text-indigo-500' : 'text-indigo-600'}`} />;
                        case 'AI & GenAI': return <Sparkles className={`w-4 h-4 ${isDark ? 'text-fuchsia-500' : 'text-fuchsia-600'}`} />;
                        default: return <Terminal className={`w-4 h-4 ${isDark ? 'text-cyan-500' : 'text-cyan-600'}`} />;
                      }
                    };

                    const getBorderClass = (cat: string) => {
                      if (isDark) {
                        switch (cat) {
                          case 'Test Automation': return 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/30';
                          case 'Cloud & Databases': return 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30';
                          case 'API & Backend': return 'border-sky-500/20 bg-sky-500/5 hover:border-sky-500/30';
                          case 'ETL & Pipelines': return 'border-violet-500/20 bg-violet-500/5 hover:border-violet-500/30';
                          case 'Domain Expertise': return 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/30';
                          case 'DevOps & Tools': return 'border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/30';
                          case 'AI & GenAI': return 'border-fuchsia-500/20 bg-fuchsia-500/5 hover:border-fuchsia-500/30';
                          default: return 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/30';
                        }
                      } else {
                        switch (cat) {
                          case 'Test Automation': return 'border-amber-200 bg-white hover:border-amber-300 hover:shadow-md';
                          case 'Cloud & Databases': return 'border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-md';
                          case 'API & Backend': return 'border-sky-200 bg-white hover:border-sky-300 hover:shadow-md';
                          case 'ETL & Pipelines': return 'border-violet-200 bg-white hover:border-violet-300 hover:shadow-md';
                          case 'Domain Expertise': return 'border-rose-200 bg-white hover:border-rose-300 hover:shadow-md';
                          case 'DevOps & Tools': return 'border-indigo-200 bg-white hover:border-indigo-300 hover:shadow-md';
                          case 'AI & GenAI': return 'border-fuchsia-200 bg-white hover:border-fuchsia-300 hover:shadow-md';
                          default: return 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md';
                        }
                      }
                    };

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${getBorderClass(skillGroup.category)}`}
                      >
                        <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${
                          isDark ? 'border-neutral-900' : 'border-stone-100'
                        }`}>
                          {getIcon(skillGroup.category)}
                          <h4 className={`font-mono text-[11px] uppercase tracking-widest font-bold ${
                            isDark ? 'text-neutral-200' : 'text-stone-800'
                          }`}>
                            {skillGroup.category}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.items.map((item) => (
                            <span
                              key={item}
                              className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-colors ${
                                isDark
                                  ? 'bg-neutral-950 text-neutral-300 border-neutral-800/80 hover:border-neutral-700/80'
                                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab: Experience (Career Timeline) */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>Professional QA Tenure</h3>
                  <p className={`text-xs font-serif italic max-w-xl ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                    Detailed breakdown of full-time QA Engineering & SDET responsibilities within SLK Software and Altimetrik India.
                  </p>
                </div>
                <Timeline theme={theme} />
              </div>
            )}

            {/* Tab: Projects (Key Achievements) */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>Technical Project Highlights</h3>
                  <p className={`text-xs font-serif italic max-w-xl ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                    Real cloud migration deliverables, database schema reconciliations, and custom test frameworks built.
                  </p>
                </div>
                <ProjectsSection theme={theme} />
              </div>
            )}

                {/* Tab: Education (Schools and Certifications) */}
                {activeTab === 'education' && (
                  <EducationCerts theme={theme} />
                )}
              </>
            )}
          </div>
        </section>

        {/* Contact panel */}
        <section id="contact" className={`border-t pt-16 pb-12 transition-colors duration-300 ${
          isDark ? 'border-neutral-900' : 'border-stone-200'
        }`}>
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-2 ${
                isDark ? 'text-neutral-500' : 'text-stone-400 font-bold'
              }`}>Hiring Gate</span>
              <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-neutral-100' : 'text-stone-900'
              }`}>
                Establish Recruiter Socket Link
              </h2>
            </div>
            <p className={`text-xs font-serif italic max-w-lg md:text-right ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Connect via copyable channels or generate instant template subject mails ready to dispatch.
            </p>
          </div>
          <ContactForm theme={theme} />
        </section>

        {/* Footer */}
        <footer className={`border-t pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] transition-colors duration-300 ${
          isDark ? 'border-neutral-900 text-neutral-500' : 'border-stone-200 text-stone-500'
        }`}>
          <div>
            <span>© {new Date().getFullYear()} Sayak Sen Portfolio Dashboard • Powered by React & Tailwind</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className={`transition ${isDark ? 'hover:text-amber-500' : 'hover:text-amber-700'}`}>LinkedIn</a>
            <span>•</span>
            <a href={resumeData.personal.github} target="_blank" rel="noreferrer" className={`transition ${isDark ? 'hover:text-amber-500' : 'hover:text-amber-700'}`}>GitHub</a>
            <span>•</span>
            <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => handleCopy(resumeData.personal.email, 'email')}>
              <span className={`transition ${isDark ? 'group-hover:text-amber-500' : 'group-hover:text-amber-700'}`}>Email</span>
              {copiedStates['email'] ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => handleCopy(resumeData.personal.phone, 'phone')}>
              <span className={`transition ${isDark ? 'group-hover:text-amber-500' : 'group-hover:text-amber-700'}`}>Phone</span>
              {copiedStates['phone'] ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 p-3 rounded-full shadow-lg transition-colors z-50 ${
                isDark 
                  ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white border border-neutral-700/50' 
                  : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 shadow-xl'
              }`}
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <Toast message={toastMessage} onClose={() => setToastMessage(null)} isDark={isDark} />
      </div>
    </div>
  );
}
