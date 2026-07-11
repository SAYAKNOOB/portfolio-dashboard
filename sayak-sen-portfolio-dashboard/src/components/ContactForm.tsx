import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { resumeData } from '../data';

interface ContactFormProps {
  theme?: 'dark' | 'light';
}

export default function ContactForm({ theme = 'dark' }: ContactFormProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: 'SDET / Automation Engineer',
    message: ''
  });

  const isDark = theme === 'dark';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const templates = [
    {
      label: "Full-Time SDET Opportunity",
      subject: "Hiring Opportunity for Sayak Sen — SDET Role",
      body: `Hi Sayak,

I came across your portfolio and was very impressed by your work in QA automation, cloud data validation, and Guidewire testing.

We have an exciting SDET / QA Engineer opportunity at our company that we believe aligns well with your skill set in Python, Playwright, GCP, and Informatica/IICS.

Would you be open to a brief conversation to explore this further?

Best regards,`
    },
    {
      label: "QA Automation Consultant",
      subject: "QA Automation Consulting Collaboration",
      body: `Hi Sayak,

I noticed your extensive experience in architecting Playwright frameworks and validating massive database reconciliation workflows.

We have an active platform migration project and would love to consult with you on standardizing our regression automation pipelines.

Let us know your availability.

Best,`
    }
  ];

  const [activeTemplate, setActiveTemplate] = useState(0);

  const mailtoLink = `mailto:${resumeData.personal.email}?subject=${encodeURIComponent(
    templates[activeTemplate].subject
  )}&body=${encodeURIComponent(templates[activeTemplate].body)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      {/* Contact Cards - Left */}
      <div className="flex flex-col space-y-4 h-full">
        <div className={`border rounded-2xl p-6 flex flex-col justify-between flex-1 ${
          isDark 
            ? 'bg-neutral-950/40 border-neutral-800/80' 
            : 'bg-white border-stone-200 shadow-md'
        }`}>
          <div>
            <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-neutral-100' : 'text-stone-950'}`}>Direct Contacts</h3>
            <p className={`text-xs mb-5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Based in Bangalore. Available for full-time opportunities, tech reviews, and QA discussions.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Email */}
            <div className={`flex items-center justify-between p-3 rounded-xl border transition duration-200 ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800/60 hover:border-neutral-700'
                : 'bg-stone-50 border-stone-200 hover:border-stone-300'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                    isDark ? 'text-neutral-500' : 'text-stone-400 font-bold'
                  }`}>Email Socket</span>
                  <a href={`mailto:${resumeData.personal.email}`} className={`hover:text-amber-500 transition text-xs font-semibold ${
                    isDark ? 'text-neutral-200' : 'text-stone-800'
                  }`}>
                    {resumeData.personal.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(resumeData.personal.email, 'email')}
                className={`p-1.5 rounded-md transition ${
                  isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200' : 'hover:bg-stone-200/50 text-stone-500'
                }`}
                title="Copy Email Address"
              >
                {copied === 'email' ? <Check className="w-4.5 h-4.5 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className={`flex items-center justify-between p-3 rounded-xl border transition duration-200 ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800/60 hover:border-neutral-700'
                : 'bg-stone-50 border-stone-200 hover:border-stone-300'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                    isDark ? 'text-neutral-500' : 'text-stone-400 font-bold'
                  }`}>Phone Link</span>
                  <a href={`tel:${resumeData.personal.phone.replace(/\s+/g, '')}`} className={`hover:text-emerald-500 transition text-xs font-semibold ${
                    isDark ? 'text-neutral-200' : 'text-stone-850'
                  }`}>
                    {resumeData.personal.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(resumeData.personal.phone, 'phone')}
                className={`p-1.5 rounded-md transition ${
                  isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200' : 'hover:bg-stone-200/50 text-stone-500'
                }`}
                title="Copy Phone Number"
              >
                {copied === 'phone' ? <Check className="w-4.5 h-4.5 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location */}
            <div className={`flex items-center p-3 rounded-xl border ${
              isDark
                ? 'bg-neutral-900/60 border-neutral-800/60'
                : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-sky-500/10 text-sky-500' : 'bg-sky-50 text-sky-700 border border-sky-100'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                    isDark ? 'text-neutral-500' : 'text-stone-400 font-bold'
                  }`}>HQ Location</span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-stone-850'}`}>
                    {resumeData.personal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Socials Grid */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={resumeData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border font-mono text-xs transition duration-200 ${
              isDark
                ? 'border-neutral-800 hover:border-amber-500/30 bg-neutral-950/40 text-neutral-300 hover:text-amber-500'
                : 'border-stone-200 hover:border-amber-400 bg-white text-stone-600 hover:text-amber-800 shadow-sm'
            }`}
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border font-mono text-xs transition duration-200 ${
              isDark
                ? 'border-neutral-800 hover:border-amber-500/30 bg-neutral-950/40 text-neutral-300 hover:text-amber-500'
                : 'border-stone-200 hover:border-amber-400 bg-white text-stone-600 hover:text-amber-800 shadow-sm'
            }`}
          >
            <span>GitHub Code</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Template Recruiter Connector - Right */}
      <div className={`border rounded-2xl p-6 flex flex-col justify-between h-full ${
        isDark 
          ? 'bg-neutral-950/40 border-neutral-800/80' 
          : 'bg-white border-stone-200 shadow-md'
      }`}>
        <div>
          <div className={`flex items-center justify-between gap-4 mb-4 pb-3 border-b ${
            isDark ? 'border-neutral-900' : 'border-stone-100'
          }`}>
            <h3 className={`text-base font-bold ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>Recruiter Quick Mail</h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider font-semibold ${
              isDark
                ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                : 'text-emerald-800 bg-emerald-50 border-emerald-200'
            }`}>
              Instant Generation
            </span>
          </div>

          <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
            Select a template below to generate a pre-formatted hiring email ready to send from your local client.
          </p>

          {/* Template Selection Tabs */}
          <div className="flex gap-2 mb-4">
            {templates.map((temp, index) => (
              <button
                key={index}
                onClick={() => setActiveTemplate(index)}
                className={`flex-1 px-3 py-2 text-left text-xs font-mono rounded-lg border transition-all duration-200 ${
                  activeTemplate === index
                    ? isDark
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 font-semibold"
                      : "bg-amber-50 text-amber-800 border-amber-300 font-semibold"
                    : isDark
                    ? "bg-neutral-900 border-neutral-800/60 text-neutral-400 hover:text-neutral-300"
                    : "bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900"
                }`}
              >
                {temp.label}
              </button>
            ))}
          </div>

          {/* Preview Box */}
          <div className={`border rounded-xl p-4 font-mono text-[11px] space-y-2 h-[200px] overflow-y-auto mb-6 ${
            isDark
              ? 'bg-neutral-950 border-neutral-900 text-neutral-400'
              : 'bg-stone-50 border-stone-200/80 text-stone-600 shadow-inner'
          }`}>
            <div className={`border-b pb-1.5 ${isDark ? 'border-neutral-900 text-neutral-500' : 'border-stone-200 text-stone-500'}`}>
              <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-stone-700'}`}>Subject: </span>
              {templates[activeTemplate].subject}
            </div>
            <div className={`whitespace-pre-line leading-relaxed ${isDark ? 'text-neutral-300' : 'text-stone-850 font-medium'}`}>
              {templates[activeTemplate].body}
            </div>
          </div>
        </div>

        <a
          href={mailtoLink}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition ${
            isDark
              ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
              : 'bg-stone-900 text-stone-100 hover:bg-stone-850 hover:text-white border border-stone-950 shadow-md'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Send Prefilled Mail Client ↗</span>
        </a>
      </div>
    </div>
  );
}
