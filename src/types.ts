export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  summary: string;
  quiz: QuizQuestion[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  xp: number;
  unlocked: boolean;
  completed: boolean;
  videoUrl?: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  completed: boolean;
  input?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  progress: number;
  status: 'A Fazer' | 'Em Progresso' | 'Concluído';
  learningObjectives: string[];
  steps: ProjectStep[];
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  completedLessons: number;
  activeProjects: number;
}
