import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface ConsoleLine {
  type: 'cmd' | 'info' | 'success' | 'warning' | 'error' | 'header';
  text: string;
}

interface ConsolePanelProps {
  theme?: 'dark' | 'light';
  deviceType?: 'Phone' | 'Tablet' | 'Laptop' | 'Desktop';
}

export default function ConsolePanel({ theme = 'dark', deviceType = 'Desktop' }: ConsolePanelProps) {
  const isDark = theme === 'dark';

  const [history, setHistory] = useState<ConsoleLine[]>([
    { type: 'header', text: '=== SAYAK SEN - SDET COMMAND CENTER v2.8.5 ===' },
    { type: 'info', text: 'Initializing testing environments...' },
    { type: 'info', text: 'Loading Python 3.11, Playwright, Oracle Client, and GCP modules.' },
    { type: 'success', text: 'Ready. Type a command or click an action button below to run automated tests.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSuite, setActiveSuite] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the terminal content ONLY, without scrolling the browser window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const runTestScript = async (scriptName: string) => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveSuite(scriptName);
    setProgress(0);

    const logs: { text: string; type: 'info' | 'success' | 'warning' | 'error' }[] = [];

    if (scriptName === 'tap_migration.py') {
      logs.push(
        { text: '$ python src/db/tap_migration.py --source oracle_prod --target gcp_bigquery', type: 'info' },
        { text: '[INIT] Connected to Oracle on-prem database (10.120.2.45)', type: 'info' },
        { text: '[INIT] Connected to Google Cloud BigQuery instance', type: 'info' },
        { text: '[ETL] Fetching Informatica transformation logs for validation...', type: 'info' },
        { text: '[VALIDATE] Initiating table schemas reconciliation for 500+ tables...', type: 'info' },
        { text: '[VALIDATE] Reconciling: PolicyCenter tables, ClaimCenter tables, FinancialLedger', type: 'info' },
        { text: '[COMPARE] 1,248,320 source rows loaded. 1,248,320 target rows verified.', type: 'success' },
        { text: '[PASS] Row counts match perfectly. Zero discrepancy detected.', type: 'success' },
        { text: '[BENCHMARK] Reconciliation completed in 3.8s (TAP Sign-off time: < 4 hours total)', type: 'success' },
        { text: '✓ [SUCCESS] TAP Migration verification pass. Zero data leakages.', type: 'success' }
      );
    } else if (scriptName === 'claimcenter_migration.py') {
      logs.push(
        { text: '$ python src/db/claimcenter_migration.py --verify-cloud-sync', type: 'info' },
        { text: '[INIT] Monitoring Active ClaimCenter Oracle→GCP migration queues...', type: 'info' },
        { text: '[ETL] Running source-to-target reconciliation on 6M+ historical records...', type: 'info' },
        { text: '[VERIFY] Comparing claim transaction states & reserve ledger balances...', type: 'info' },
        { text: '[PASS] Cloud synchronization verified with 100% data integrity compliance.', type: 'success' },
        { text: '[KPI] Saved manual efforts by ~85% with automated cross-cloud validations.', type: 'success' },
        { text: '✓ [SUCCESS] ClaimCenter Migration fully certified (0 defect slippages).', type: 'success' }
      );
    } else if (scriptName === 'planview_portfolios.ts') {
      logs.push(
        { text: '$ npx playwright test tests/planview/regression/ --project=all --workers=4', type: 'info' },
        { text: '[PLAYWRIGHT] Launching GUI automation suites on Chromium/Webkit/Firefox...', type: 'info' },
        { text: '[PLANVIEW] Navigating to Planview Portfolio login interface...', type: 'info' },
        { text: '[ACTION] Verifying cross-browser portfolio allocations & schedule rendering...', type: 'info' },
        { text: '[ACTION] Running nightly CI/CD integration regression test cases...', type: 'info' },
        { text: '[PASS] Web UI component interactions and layouts rendered correctly.', type: 'success' },
        { text: '[KPI] QA cycle time reduced by 50-60% across Planview suite.', type: 'success' },
        { text: '✓ [SUCCESS] Planview Portfolios GUI automation fully verified.', type: 'success' }
      );
    } else {
      // guidewire_e2e.ts
      logs.push(
        { text: '$ npx playwright test tests/guidewire/smoke/ --project=chromium --workers=4', type: 'info' },
        { text: 'Playwright v1.42.0 running on Chromium/Webkit/Firefox (headless)', type: 'info' },
        { text: '[LOGIN] Navigating to Guidewire PolicyCenter login portal...', type: 'info' },
        { text: '[AUTH] Logging in with Secure Recruiter Key token...', type: 'info' },
        { text: '[ACTION] Generating mock commercial auto policy: PC-2026-0891', type: 'info' },
        { text: '[ACTION] Directing policy flow through underwriting gate...', type: 'info' },
        { text: '[ACTION] Transferring Policy record to ClaimCenter UI API...', type: 'info' },
        { text: '[CLAIM] Claim created successfully: CC-2026-90412. Status: OPEN', type: 'success' },
        { text: '[SCREENSHOT] Screenshot saved to /assets/allure-results/claims_flow_pass.png', type: 'info' },
        { text: '[REPORT] All 150+ automated functional scenarios PASSED.', type: 'success' },
        { text: '✓ [SUCCESS] Guidewire regression suite fully verified (100% SLA compliance).', type: 'success' }
      );
    }

    // Simulate progress animation
    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setProgress(Math.round(((i + 1) / logs.length) * 100));
      setHistory((prev) => [
        ...prev,
        {
          type: logs[i].type === 'success' ? 'success' : logs[i].type === 'error' ? 'error' : 'info',
          text: logs[i].text,
        },
      ]);
    }

    setIsRunning(false);
    setActiveSuite(null);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isRunning) return;

    const cmd = inputVal.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: 'cmd', text: `> ${inputVal}` }]);
    setInputVal('');

    setTimeout(() => {
      switch (cmd) {
        case 'help':
          setHistory((prev) => [
            ...prev,
            { type: 'info', text: 'Available commands:' },
            { type: 'info', text: '  run-tests  - Runs the complete automated regression suite' },
            { type: 'info', text: '  skills     - Evaluates core technical skill groups' },
            { type: 'info', text: '  contact    - Prints out personal connection links' },
            { type: 'info', text: '  clear      - Flushes the console buffer' },
            { type: 'info', text: '  about      - Displays a quick bio summary' },
            { type: 'info', text: '  hi / hello - Send a warm greeting' },
            { type: 'info', text: '  name       - Get the engineer\'s professional title' }
          ]);
          break;
        case 'hi':
        case 'hello':
        case 'hey':
          setHistory((prev) => [
            ...prev,
            { type: 'success', text: 'Hello! I am Sayak\'s Automated Command AI. Nice to meet you! How can I assist with your QA team validation today?' }
          ]);
          break;
        case 'name':
          setHistory((prev) => [
            ...prev,
            { type: 'success', text: 'Profile Name: Sayak Sen (AI Automation Engineer & SDET)' }
          ]);
          break;
        case 'skills':
          setHistory((prev) => [
            ...prev,
            { type: 'success', text: '[Test Automation]: Playwright, Python, PyTest, TypeScript, Robo Framework, Codegen' },
            { type: 'success', text: '[Cloud / DBs]: GCP (BigQuery, Cloud SQL), Oracle DB, DBeaver' },
            { type: 'success', text: '[ETL Tools]: Informatica IICS, Source-to-Target pipelines' },
            { type: 'success', text: '[Domains]: Guidewire PolicyCenter & ClaimCenter (1,000+ tests)' },
            { type: 'success', text: '[AI/GenAI]: GitHub Copilot, Model-Based Test Code Synthesis, Claude Certified' }
          ]);
          break;
        case 'about':
          setHistory((prev) => [
            ...prev,
            { type: 'info', text: 'Sayak Sen — AI Automation Engineer & SDET' },
            { type: 'info', text: 'Available for Roles In: Bengaluru, Kolkata, Mumbai, Gurgaon, Hyderabad & Remote' },
            { type: 'info', text: '2+ Years of Hands-on enterprise QA excellence with SLK Software & Altimetrik India.' },
            { type: 'success', text: 'Slogan: "QA is not about finding bugs at the end of the sprint. It is about architecting continuous verification gates that save developer cycles and secure absolute production reliability."' }
          ]);
          break;
        case 'contact':
          setHistory((prev) => [
            ...prev,
            { type: 'info', text: 'Establishing secure communication socket...' },
            { type: 'success', text: 'Email: ssayak02@gmail.com' },
            { type: 'success', text: 'Phone: +91 6290890754' },
            { type: 'success', text: 'GitHub: SAYAKNOOB' },
            { type: 'success', text: 'LinkedIn: linkedin.com/in/sayak--sen/' }
          ]);
          break;
        case 'clear':
          setHistory([]);
          break;
        case 'run-tests':
          runTestScript('guidewire_e2e.ts');
          break;
        default:
          setHistory((prev) => [
            ...prev,
            { type: 'error', text: `Command not found: "${cmd}". Type "help" for a list of valid commands.` }
          ]);
          break;
      }
    }, 150);
  };

  // Determine height of terminal depending on deviceType
  const getHeightClass = () => {
    if (deviceType === 'Phone') return 'h-[370px]';
    if (deviceType === 'Tablet') return 'h-[430px]';
    return 'h-[525px]';
  };

  return (
    <div className={`border rounded-2xl shadow-2xl overflow-hidden flex flex-col ${getHeightClass()} font-mono text-xs transition-colors duration-300 ${
      isDark
        ? 'bg-neutral-900 border-neutral-800'
        : 'bg-[#faf8f5] border-stone-250'
    }`}>
      {/* Console Topbar */}
      <div className={`px-4 py-3 border-b flex items-center justify-between ${
        isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-[#f0ece1] border-stone-250'
      }`}>
        <div className="flex items-center gap-2">
          <Terminal className={`w-4 h-4 animate-pulse ${isDark ? 'text-amber-500' : 'text-amber-700'}`} />
          <span className={`font-bold ${isDark ? 'text-neutral-300' : 'text-stone-850'}`}>
            Automated QA Sandbox Terminal
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
      </div>

      {/* Main Console Log */}
      <div 
        ref={containerRef} 
        className={`flex-1 overflow-y-auto p-4 space-y-2 select-all ${
          isDark ? 'bg-neutral-950/95 text-neutral-300' : 'bg-[#fcfbf9] text-stone-850'
        }`}
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.type === 'cmd'
                ? isDark ? 'text-sky-400 font-semibold' : 'text-blue-700 font-bold'
                : line.type === 'success'
                ? isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'
                : line.type === 'warning'
                ? isDark ? 'text-amber-400' : 'text-amber-700 font-semibold'
                : line.type === 'error'
                ? isDark ? 'text-rose-400' : 'text-rose-700 font-bold'
                : line.type === 'header'
                ? isDark 
                  ? 'text-amber-500 font-bold border-b border-neutral-800/60 pb-1 mb-2' 
                  : 'text-amber-800 font-bold border-b border-stone-200/80 pb-1 mb-2'
                : isDark ? 'text-neutral-400' : 'text-stone-500 font-medium'
            }`}
          >
            {line.text}
          </div>
        ))}
        {isRunning && (
          <div className={`${isDark ? 'text-amber-400' : 'text-amber-750'} flex items-center gap-2 animate-pulse mt-1`}>
            <span>Running script: {activeSuite}... {progress}%</span>
          </div>
        )}
      </div>

      {/* Progress bar if running */}
      {isRunning && (
        <div className={`w-full h-1 ${isDark ? 'bg-neutral-800' : 'bg-stone-200'}`}>
          <div
            className={`h-full transition-all duration-300 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Action triggers */}
      <div className={`p-3 border-t grid grid-cols-2 md:grid-cols-4 gap-2 ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-[#f0ece1] border-stone-250'
      }`}>
        <button
          onClick={() => runTestScript('tap_migration.py')}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-2.5 py-1.5 rounded transition disabled:opacity-50 text-[11px] border ${
            isDark
              ? 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-900'
              : 'bg-white text-stone-800 border-stone-300 hover:border-amber-600 hover:bg-stone-50/50 shadow-sm'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
          <span>TAP Migration</span>
        </button>
        <button
          onClick={() => runTestScript('claimcenter_migration.py')}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-2.5 py-1.5 rounded transition disabled:opacity-50 text-[11px] border ${
            isDark
              ? 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900'
              : 'bg-white text-stone-800 border-stone-300 hover:border-emerald-600 hover:bg-stone-50/50 shadow-sm'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />
          <span>Claim Center</span>
        </button>
        <button
          onClick={() => runTestScript('planview_portfolios.ts')}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-2.5 py-1.5 rounded transition disabled:opacity-50 text-[11px] border ${
            isDark
              ? 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-sky-500/50 hover:bg-neutral-900'
              : 'bg-white text-stone-800 border-stone-300 hover:border-sky-600 hover:bg-stone-50/50 shadow-sm'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isDark ? 'text-sky-500' : 'text-sky-600'}`} />
          <span>Planview GUI</span>
        </button>
        <button
          onClick={() => runTestScript('guidewire_e2e.ts')}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-2.5 py-1.5 rounded transition disabled:opacity-50 text-[11px] border ${
            isDark
              ? 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-violet-500/50 hover:bg-neutral-900'
              : 'bg-white text-stone-800 border-stone-300 hover:border-violet-600 hover:bg-stone-50/50 shadow-sm'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
          <span>Guidewire E2E</span>
        </button>
      </div>

      {/* Dynamic Shell Command line */}
      <form onSubmit={handleCommandSubmit} className={`p-2.5 border-t flex items-center gap-2 ${
        isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-[#fcfbf9] border-stone-250'
      }`}>
        <ChevronRight className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Type command ("help", "skills", "about", "contact", "clear")...'
          className={`flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-xs ${
            isDark ? 'text-neutral-300 placeholder-neutral-600' : 'text-stone-800 placeholder-stone-400'
          }`}
          disabled={isRunning}
        />
        <div className={`flex gap-2 text-[10px] px-2 border-l ${
          isDark ? 'text-neutral-500 border-neutral-850' : 'text-stone-400 border-stone-200'
        }`}>
          <span>TAB to autocomplete</span>
        </div>
      </form>
    </div>
  );
}
