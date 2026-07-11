import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, CheckCircle2, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { resumeData, Project } from '../data';

interface ProjectsSectionProps {
  theme?: 'dark' | 'light';
}

export default function ProjectsSection({ theme = 'dark' }: ProjectsSectionProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const isDark = theme === 'dark';

  const filterTags = ["All", "Python", "Cloud", "Automation", "Playwright", "GCP", "Guidewire"];

  const filteredProjects = selectedTag === "All"
    ? resumeData.projects
    : resumeData.projects.filter(proj => 
        proj.skills.some(skill => 
          skill.toLowerCase().includes(selectedTag.toLowerCase()) ||
          (selectedTag === "Guidewire" && (skill.includes("ClaimCenter") || skill.includes("PolicyCenter"))) ||
          (selectedTag === "Cloud" && (skill.includes("GCP") || skill.includes("BigQuery") || skill.includes("Cloud SQL") || skill.includes("IICS"))) ||
          (selectedTag === "Automation" && (skill.includes("Playwright") || skill.includes("CI/CD") || skill.includes("PySpark")))
        )
      );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className={`flex flex-wrap items-center gap-2 pb-4 border-b ${
        isDark ? 'border-neutral-800/50' : 'border-stone-200/80'
      }`}>
        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by:</span>
        </div>
        {filterTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 text-[11px] font-mono rounded-full border transition-all duration-200 ${
              selectedTag === tag
                ? isDark
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/30 font-semibold"
                  : "bg-amber-100 text-amber-800 border-amber-300 font-semibold shadow-sm"
                : isDark
                ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 shadow-sm"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: Project, idx: number) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`border rounded-2xl p-6 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                isDark
                  ? 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700'
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-md hover:shadow-lg'
              }`}
            >
              <div className={`absolute top-0 right-0 p-8 text-7xl font-sans font-black select-none pointer-events-none transition-all duration-300 ${
                isDark
                  ? 'text-neutral-800/10 group-hover:text-amber-500/5'
                  : 'text-stone-100 group-hover:text-amber-500/5'
              }`}>
                0{idx + 1}
              </div>

              <div>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-amber-500' : 'bg-amber-600'}`}></span>
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${
                    isDark ? 'text-neutral-500' : 'text-stone-500 font-bold'
                  }`}>{project.category}</span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-2 transition-colors ${
                  isDark
                    ? 'text-neutral-100 group-hover:text-amber-400'
                    : 'text-stone-900 group-hover:text-amber-700'
                }`}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className={`text-xs leading-relaxed font-serif italic mb-6 ${
                  isDark ? 'text-neutral-400' : 'text-stone-600 font-medium'
                }`}>
                  {project.description}
                </p>

                {/* Metrics Blocks */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <motion.div 
                        key={mIdx} 
                        whileHover={{ y: -4, rotate: 1, scale: 1.02 }}
                        className={`p-4 rounded-xl text-center shadow-md transition-all duration-300 border cursor-default ${
                        isDark
                          ? 'bg-neutral-900/60 border-neutral-800/80 shadow-amber-500/5 hover:border-amber-500/30'
                          : 'bg-stone-50 border-stone-200/80 shadow-sm hover:border-amber-300 hover:bg-stone-50/50'
                      }`}>
                        <span className={`block font-sans text-2xl md:text-3xl font-black tracking-tight ${
                          isDark ? 'text-amber-400' : 'text-amber-600'
                        }`}>
                          {metric.value}
                        </span>
                        <span className={`block text-[9px] font-mono uppercase tracking-widest mt-1 font-semibold ${
                          isDark ? 'text-neutral-400' : 'text-stone-500'
                        }`}>
                          {metric.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Detail bullets */}
                <ul className="space-y-2.5 mb-6">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className={`flex items-start gap-2 text-xs leading-relaxed ${
                      isDark ? 'text-neutral-300' : 'text-stone-700 font-medium'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                        isDark ? 'text-neutral-500' : 'text-stone-400'
                      }`} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <div className={`flex flex-wrap gap-1 mt-auto pt-4 border-t ${
                  isDark ? 'border-neutral-900' : 'border-stone-100'
                }`}>
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800/60 text-neutral-400'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
