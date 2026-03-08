import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface BreadcrumbsProps {
  view: 'dashboard' | 'learning' | 'projects' | 'lesson-detail' | 'project-detail' | 'library';
  selectedLessonName?: string;
  selectedProjectName?: string;
  onNavigate: (view: 'dashboard' | 'learning' | 'projects' | 'lesson-detail' | 'project-detail' | 'library') => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  view, 
  selectedLessonName, 
  selectedProjectName,
  onNavigate 
}) => {
  if (view === 'dashboard') return null;

  const items: { label: string; view: 'dashboard' | 'learning' | 'projects' | 'lesson-detail' | 'project-detail' | 'library'; icon?: any }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: Home },
  ];

  if (view === 'learning' || view === 'lesson-detail') {
    items.push({ label: 'Trilha de Aprendizado', view: 'learning', icon: undefined });
    if (view === 'lesson-detail' && selectedLessonName) {
      items.push({ label: selectedLessonName, view: 'lesson-detail', icon: undefined });
    }
  }

  if (view === 'projects' || view === 'project-detail') {
    items.push({ label: 'Projetos Práticos', view: 'projects', icon: undefined });
    if (view === 'project-detail' && selectedProjectName) {
      items.push({ label: selectedProjectName, view: 'project-detail', icon: undefined });
    }
  }

  if (view === 'library') {
    items.push({ label: 'Biblioteca de Documentos', view: 'library', icon: undefined });
  }

  return (
    <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />}
          <motion.button
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onNavigate(item.view)}
            className={`flex items-center gap-1.5 transition-colors ${
              index === items.length - 1 
                ? "text-brand-primary cursor-default" 
                : "text-gray-500 hover:text-brand-secondary"
            }`}
            disabled={index === items.length - 1}
          >
            {item.icon && <item.icon className="w-3.5 h-3.5" />}
            {item.label}
          </motion.button>
        </React.Fragment>
      ))}
    </nav>
  );
};
