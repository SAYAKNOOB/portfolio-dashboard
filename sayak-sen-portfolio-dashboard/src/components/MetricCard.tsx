import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

interface MetricCardProps {
  value: string;
  label: string;
  sub: string;
  iconName: keyof typeof Icons;
  color: string;
  detailedActions: string[];
  statusText?: string;
  theme?: 'dark' | 'light';
}

export default function MetricCard({ 
  value, 
  label, 
  sub, 
  iconName, 
  color, 
  detailedActions, 
  statusText,
  theme = 'dark' 
}: MetricCardProps) {
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string }>;

  const getColorClasses = (col: string, isDark: boolean) => {
    if (isDark) {
      switch (col) {
        case 'amber':
          return {
            bg: 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40',
            text: 'text-amber-500',
            iconBg: 'bg-amber-500/10 text-amber-500'
          };
        case 'emerald':
          return {
            bg: 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40',
            text: 'text-emerald-500',
            iconBg: 'bg-emerald-500/10 text-emerald-500'
          };
        case 'sky':
          return {
            bg: 'bg-sky-500/5 border-sky-500/20 hover:border-sky-500/40',
            text: 'text-sky-500',
            iconBg: 'bg-sky-500/10 text-sky-500'
          };
        case 'rose':
          return {
            bg: 'bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40',
            text: 'text-rose-500',
            iconBg: 'bg-rose-500/10 text-rose-500'
          };
        case 'violet':
          return {
            bg: 'bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40',
            text: 'text-violet-500',
            iconBg: 'bg-violet-500/10 text-violet-500'
          };
        default:
          return {
            bg: 'bg-neutral-500/5 border-neutral-500/20 hover:border-neutral-500/40',
            text: 'text-neutral-500',
            iconBg: 'bg-neutral-500/10 text-neutral-500'
          };
      }
    } else {
      switch (col) {
        case 'amber':
          return {
            bg: 'bg-white border-stone-200 hover:border-amber-350 hover:shadow-lg hover:shadow-amber-500/5',
            text: 'text-amber-700',
            iconBg: 'bg-amber-50 text-amber-700 border border-amber-100'
          };
        case 'emerald':
          return {
            bg: 'bg-white border-stone-200 hover:border-emerald-350 hover:shadow-lg hover:shadow-emerald-500/5',
            text: 'text-emerald-700',
            iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
          };
        case 'sky':
          return {
            bg: 'bg-white border-stone-200 hover:border-sky-350 hover:shadow-lg hover:shadow-sky-500/5',
            text: 'text-sky-700',
            iconBg: 'bg-sky-50 text-sky-700 border border-sky-100'
          };
        case 'rose':
          return {
            bg: 'bg-white border-stone-200 hover:border-rose-350 hover:shadow-lg hover:shadow-rose-500/5',
            text: 'text-rose-700',
            iconBg: 'bg-rose-50 text-rose-700 border border-rose-100'
          };
        case 'violet':
          return {
            bg: 'bg-white border-stone-200 hover:border-violet-350 hover:shadow-lg hover:shadow-violet-500/5',
            text: 'text-violet-700',
            iconBg: 'bg-violet-50 text-violet-700 border border-violet-100'
          };
        default:
          return {
            bg: 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-lg',
            text: 'text-stone-800',
            iconBg: 'bg-stone-50 text-stone-800 border border-stone-100'
          };
      }
    }
  };

  const style = getColorClasses(color, theme === 'dark');

  return (
    <div className="flex flex-col h-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group h-full min-h-[220px] ${style.bg}`}
      >
        <div>
          <div className="flex items-center justify-between gap-4 mb-4 select-none">
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              theme === 'light' ? 'text-stone-500 font-bold' : 'text-neutral-400 font-semibold'
            }`}>{label}</span>
            {IconComponent && (
              <div className={`p-2 rounded-lg ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <IconComponent className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="select-none mb-3">
            <h3 className={`text-4xl md:text-5xl font-black font-sans tracking-tight mb-2 ${style.text}`}>
              {value}
            </h3>
            <p className={`text-xs font-sans font-medium leading-relaxed ${
              theme === 'light' ? 'text-stone-600' : 'text-neutral-400'
            }`}>
              {sub}
            </p>
          </div>
        </div>

        {/* Detailed Deliverables shown directly inside the card (Basic Details) */}
        <div className={`mt-4 pt-4 border-t flex-1 flex flex-col justify-end ${
          theme === 'light' ? 'border-stone-200/80' : 'border-neutral-800/40'
        }`}>
          <span className={`text-[9px] font-mono uppercase tracking-widest block mb-2 font-bold ${
            theme === 'light' ? 'text-stone-500' : 'text-neutral-500'
          }`}>
            Core Deliverables:
          </span>
          <ul className="space-y-1.5">
            {detailedActions.slice(0, 2).map((action, idx) => (
              <li key={idx} className={`flex items-start gap-2 text-[11px] leading-relaxed ${
                theme === 'light' ? 'text-stone-700 font-medium' : 'text-neutral-300'
              }`}>
                <Icons.Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${style.text}`} />
                <span>{action}</span>
              </li>
            ))}
          </ul>

          {statusText && (
            <div className={`flex items-center gap-1.5 text-[10px] font-mono font-medium ${
              theme === 'light' ? 'text-stone-500' : 'text-neutral-500'
            } mt-4 pt-2 border-t ${
              theme === 'light' ? 'border-stone-100' : 'border-neutral-900/60'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Scope: {statusText}</span>
            </div>
          )}
        </div>

        {/* Grid crosshair visual embellishments */}
        {theme === 'dark' ? (
          <>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-800 opacity-35"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-800 opacity-35"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-stone-200 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-stone-200 opacity-70"></div>
          </>
        )}
      </motion.div>
    </div>
  );
}
