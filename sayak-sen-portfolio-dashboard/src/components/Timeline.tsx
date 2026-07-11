import { Briefcase, MapPin, Calendar, Shield } from 'lucide-react';
import { resumeData, Job } from '../data';

interface TimelineProps {
  theme?: 'dark' | 'light';
}

export default function Timeline({ theme = 'dark' }: TimelineProps) {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8">
      {resumeData.experience.map((job: Job, index: number) => {
        const isCurrent = index === 0;

        return (
          <div
            key={job.id}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isDark
                ? 'bg-neutral-900/40 border-neutral-800/80 shadow-xl'
                : 'bg-white border-stone-200 shadow-md hover:shadow-lg'
            }`}
          >
            {/* Header Item */}
            <div className={`p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b ${
              isDark
                ? 'border-neutral-800/60 bg-neutral-950/20'
                : 'border-stone-100 bg-stone-50/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl mt-1 ${
                  isCurrent
                    ? isDark
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                    : isDark
                    ? 'bg-neutral-800/80 text-neutral-400 border border-neutral-700/40'
                    : 'bg-stone-100 text-stone-500 border border-stone-200'
                }`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`text-lg md:text-xl font-bold ${isDark ? 'text-neutral-100' : 'text-stone-900'}`}>
                      {job.role}
                    </h3>
                    {isCurrent && (
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${
                        isDark 
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}>
                        Active Release Cycle
                      </span>
                    )}
                  </div>
                  <p className={`${isDark ? 'text-amber-500' : 'text-amber-700'} font-semibold font-serif italic text-sm mt-0.5`}>
                    {job.company}
                  </p>
                </div>
              </div>

              <div className={`flex items-center justify-between md:justify-end gap-6 border-t pt-4 md:pt-0 md:border-none ${
                isDark ? 'border-neutral-800/60' : 'border-stone-150'
              }`}>
                <div className={`flex flex-col gap-1.5 text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{job.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <div className={`px-6 py-8 md:px-8 ${isDark ? 'bg-neutral-950/10' : 'bg-white'}`}>
              <div className="mb-6">
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-4 ${
                  isDark ? 'text-neutral-400' : 'text-stone-500 font-bold'
                }`}>
                  Key Quality Deliverables
                </span>
                <ul className="space-y-3.5">
                  {job.bullets.map((bullet, idx) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-stone-700 font-medium'
                    }`}>
                      <Shield className={`w-4 h-4 mt-1 flex-shrink-0 ${
                        isDark ? 'text-amber-500/80' : 'text-amber-600'
                      }`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-3 ${
                  isDark ? 'text-neutral-400' : 'text-stone-500 font-bold'
                }`}>
                  QA Tech Stack Validated
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono text-[10px] px-2.5 py-1 rounded border ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800/80 text-neutral-400'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
