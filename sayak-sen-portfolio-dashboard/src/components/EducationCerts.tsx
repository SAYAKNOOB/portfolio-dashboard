import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { resumeData, Education, Certification } from '../data';

interface EducationCertsProps {
  theme?: 'dark' | 'light';
}

export default function EducationCerts({ theme = 'dark' }: EducationCertsProps) {
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Education - Left Col */}
      <div className="lg:col-span-5 space-y-6">
        <h3 className={`text-sm font-mono uppercase tracking-widest flex items-center gap-2 mb-2 ${
          isDark ? 'text-neutral-400' : 'text-stone-600 font-bold'
        }`}>
          <GraduationCap className={`w-4 h-4 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
          <span>Academic Foundation</span>
        </h3>

        <div className="space-y-4">
          {resumeData.education.map((edu: Education, idx: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className={`border p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-md hover:shadow-lg'
              }`}
            >
              <span className={`font-mono text-[9px] uppercase tracking-widest block mb-1 ${
                isDark ? 'text-amber-500' : 'text-amber-700 font-bold'
              }`}>
                {edu.period}
              </span>
              <h4 className={`text-base font-bold transition-colors ${
                isDark 
                  ? 'text-neutral-100 group-hover:text-amber-400' 
                  : 'text-stone-900 group-hover:text-amber-700'
              }`}>
                {edu.degree}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600 font-medium'}`}>
                {edu.institution}
              </p>
              <p className={`text-[10px] font-mono mt-2 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>
                {edu.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications - Right Col */}
      <div className="lg:col-span-7 space-y-6">
        <h3 className={`text-sm font-mono uppercase tracking-widest flex items-center gap-2 mb-2 ${
          isDark ? 'text-neutral-400' : 'text-stone-600 font-bold'
        }`}>
          <Award className={`w-4 h-4 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
          <span>Professional Credentials</span>
        </h3>

        <div className={`border rounded-2xl p-6 space-y-4 ${
          isDark 
            ? 'bg-neutral-950/20 border-neutral-800/50' 
            : 'bg-stone-50/50 border-stone-200/80 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resumeData.certifications.map((cert: Certification, idx: number) => {
              const isCompleted = cert.status === 'completed';

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                    isCompleted
                      ? isDark
                        ? 'bg-neutral-950 border-neutral-800/80 hover:border-amber-500/30 shadow-md'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/5'
                      : isDark
                      ? 'bg-neutral-900/40 border-neutral-800/40 opacity-75'
                      : 'bg-stone-100/50 border-stone-200/50 opacity-80'
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Clock className={`w-4 h-4 ${isDark ? 'text-amber-500/70' : 'text-amber-600'}`} />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold leading-relaxed ${
                      isDark ? 'text-neutral-200' : 'text-stone-850'
                    }`}>
                      {cert.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[9px] font-mono ${isDark ? 'text-neutral-500' : 'text-stone-500'}`}>{cert.provider}</span>
                      <span className={`text-[9px] ${isDark ? 'text-neutral-600' : 'text-stone-300'}`}>•</span>
                      <span className={`text-[9px] font-mono uppercase tracking-wider ${
                        isCompleted 
                          ? 'text-emerald-500/80' 
                          : isDark ? 'text-amber-500/70' : 'text-amber-700'
                      }`}>
                        {isCompleted ? 'Verified' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
