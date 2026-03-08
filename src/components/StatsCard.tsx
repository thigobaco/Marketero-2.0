import React from 'react';
import { motion } from 'motion/react';
import { Trophy, BookOpen, Rocket, Zap, Star } from 'lucide-react';
import { UserStats } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatsCardProps {
  stats: UserStats;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats, className }) => {
  const progress = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <div className={cn("brutal-card p-6 bg-white space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary p-2 rounded-lg border-2 border-brand-dark">
            <Trophy className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display uppercase tracking-tight">Perfil do Marketero</h3>
            <p className="text-xs text-gray-500 font-mono">ESTATÍSTICAS DE CARREIRA</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-4xl font-display text-brand-primary">Lvl {stats.level}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-sm font-bold flex items-center gap-1">
            <Zap className="w-4 h-4 text-brand-secondary" /> XP ATUAL
          </span>
          <div className="text-right">
            <span className="text-xs font-mono block">Progresso: {stats.xp} / {stats.nextLevelXp}</span>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-100 border-2 border-brand-dark rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-brand-secondary/5 border-2 border-brand-secondary/20 p-4 rounded-xl flex flex-col items-center text-center">
          <BookOpen className="w-5 h-5 text-brand-secondary mb-2" />
          <span className="text-2xl font-display">{stats.completedLessons}</span>
          <span className="text-[10px] font-bold uppercase text-gray-500">Lições Concluídas</span>
        </div>
        <div className="bg-brand-primary/5 border-2 border-brand-primary/20 p-4 rounded-xl flex flex-col items-center text-center">
          <Rocket className="w-5 h-5 text-brand-primary mb-2" />
          <span className="text-2xl font-display">{stats.activeProjects}</span>
          <span className="text-[10px] font-bold uppercase text-gray-500">Projetos Ativos</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-brand-accent/10 p-3 rounded-lg border border-brand-accent/30">
        <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
        <p className="text-xs font-medium text-brand-accent">
          Faltam <span className="font-bold">{stats.nextLevelXp - stats.xp} XP</span> para o próximo nível!
        </p>
      </div>
    </div>
  );
};
