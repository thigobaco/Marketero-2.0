import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Rocket, 
  Trophy, 
  Layout, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  Zap,
  Star,
  Target,
  Search,
  Loader2,
  X,
  Check,
  Youtube,
  FileText,
  Save,
  Library,
  Download
} from 'lucide-react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenAI } from "@google/genai";
import { Lesson, Project, UserStats } from './types';
import { LESSONS, INITIAL_PROJECTS } from './constants';
import { KNOWLEDGE_BASE } from './constants/knowledgeBase';
import { StatsCard } from './components/StatsCard';
import { Chat } from './components/Chat';
import { InstallButton } from './components/InstallButton';
import { Breadcrumbs } from './components/Breadcrumbs';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const nextLessonInitial = LESSONS.find(l => !l.completed && l.unlocked) || null;
  const [view, setView] = useState<'dashboard' | 'learning' | 'projects' | 'lesson-detail' | 'project-detail' | 'library'>(nextLessonInitial ? 'lesson-detail' : 'dashboard');
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(nextLessonInitial);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    nextLevelXp: 500,
    completedLessons: 0,
    activeProjects: 6
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');

  const downloadDocument = (title: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const kbContent = Object.values(KNOWLEDGE_BASE).join('\n\n');
      const prompt = `Você é um mentor especialista em Marketing e Vendas da Escola do Sebrae. 
      Use o seguinte conhecimento base extraído dos documentos oficiais para responder à pergunta do aluno:
      
      --- CONHECIMENTO BASE ---
      ${kbContent}
      --- FIM DO CONHECIMENTO BASE ---

      Pergunta do aluno: ${searchQuery}
      
      Responda de forma didática, profissional e encorajadora em português do Brasil. Cite conceitos dos documentos quando apropriado. Se a informação não estiver no conhecimento base, use seu conhecimento geral de marketing mas deixe claro que é um complemento.`;
      
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      
      setSearchResults(result.text || "Não foi possível encontrar uma resposta.");
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults("Erro ao realizar a pesquisa. Verifique sua conexão ou tente novamente mais tarde.");
    } finally {
      setIsSearching(false);
    }
  };

  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [projectFeedback, setProjectFeedback] = useState<string | null>(null);
  const [activeProjectStepIndex, setActiveProjectStepIndex] = useState(0);

  // Notes State
  const [lessonNotes, setLessonNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('marketero_notes');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('marketero_notes', JSON.stringify(lessonNotes));
  }, [lessonNotes]);

  const handleNoteChange = (lessonId: string, note: string) => {
    setLessonNotes(prev => ({
      ...prev,
      [lessonId]: note
    }));
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedLesson || showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === selectedLesson.quiz[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestionIndex + 1 < selectedLesson.quiz.length) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleContinueLearning = () => {
    const next = lessons.find(l => !l.completed && l.unlocked);
    if (next) {
      setSelectedLesson(next);
      resetQuiz();
      setView('lesson-detail');
    } else {
      setView('learning');
    }
  };

  const handleCompleteLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    setLessons(prev => {
      const currentIndex = prev.findIndex(l => l.id === lessonId);
      return prev.map((l, idx) => {
        if (l.id === lessonId) return { ...l, completed: true };
        if (idx === currentIndex + 1) return { ...l, unlocked: true };
        return l;
      });
    });

    if (!lesson.completed) {
      setStats(prev => {
        const newXp = prev.xp + lesson.xp;
        let newLevel = prev.level;
        let newNextLevelXp = prev.nextLevelXp;
        
        if (newXp >= prev.nextLevelXp) {
          newLevel += 1;
          newNextLevelXp = Math.floor(prev.nextLevelXp * 1.5);
        }

        return {
          ...prev,
          xp: newXp,
          level: newLevel,
          nextLevelXp: newNextLevelXp,
          completedLessons: prev.completedLessons + 1
        };
      });
    }
    
    // Update selectedLesson if it's the one being completed
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson(prev => prev ? { ...prev, completed: true } : null);
    }
    
    setView('learning');
  };

  const handleStepComplete = (projectId: string, stepId: string, input: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newSteps = p.steps.map(s => s.id === stepId ? { ...s, completed: true, input } : s);
        const progress = Math.round((newSteps.filter(s => s.completed).length / newSteps.length) * 100);
        const status = (progress === 100 ? 'Concluído' : 'Em Progresso') as Project['status'];
        
        if (projectId === 'p1' && stepId === 's2') {
          const inputLower = input.toLowerCase();
          if (inputLower.includes('preço') && inputLower.includes('alto')) {
            setProjectFeedback('Um preço alto pode ser visto como uma fraqueza, mas se transformado em uma estratégia de valor (como no Oceano Azul), pode se tornar uma força de exclusividade e qualidade.');
          } else if (inputLower.includes('distribuição') && inputLower.includes('falta')) {
            setProjectFeedback('A falta de distribuição é um desafio, mas pode ser uma oportunidade para focar em canais digitais ou parcerias estratégicas, transformando a limitação em uma força de nicho.');
          }
        }

        const updatedProject = { ...p, steps: newSteps, progress, status };
        if (selectedProject?.id === projectId) {
          setSelectedProject(updatedProject);
        }
        return updatedProject;
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-2 border-brand-dark sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('dashboard')}
        >
          <div className="bg-brand-primary p-2 rounded-lg border-2 border-brand-dark">
            <Zap className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display">MARKETERO</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Nível {stats.level}</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden border border-brand-dark">
                <motion.div 
                  className="h-full bg-brand-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                />
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase opacity-60">{stats.xp} / {stats.nextLevelXp} XP</span>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Trophy className="w-6 h-6" />
          </button>
          <InstallButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <Breadcrumbs 
          view={view} 
          selectedLessonName={selectedLesson?.title}
          selectedProjectName={selectedProject?.name}
          onNavigate={(v) => setView(v)}
        />
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section>
                <h2 className="text-4xl mb-2">Olá, Marketero! 👋</h2>
                <p className="text-gray-600">Pronto para dominar o mercado hoje?</p>
              </section>

              <StatsCard stats={stats} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => setView('learning')}
                  className="brutal-card bg-white p-6 cursor-pointer hover:bg-brand-secondary/5 transition-colors group"
                >
                  <div className="bg-brand-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-brand-secondary">
                    <BookOpen className="text-brand-secondary w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-brand-secondary transition-colors">Trilha de Aprendizado</h3>
                  <p className="text-sm text-gray-500 mb-4">Aprenda os fundamentos do zero ao avançado.</p>
                  <div className="flex items-center text-brand-secondary font-bold text-sm">
                    Continuar <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div 
                  onClick={() => setView('projects')}
                  className="brutal-card bg-white p-6 cursor-pointer hover:bg-brand-primary/5 transition-colors group"
                >
                  <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-brand-primary">
                    <Rocket className="text-brand-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-brand-primary transition-colors">Projetos Práticos</h3>
                  <p className="text-sm text-gray-500 mb-4">Aplique o que aprendeu em projetos reais.</p>
                  <div className="flex items-center text-brand-primary font-bold text-sm">
                    Ver Projetos <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div 
                  onClick={() => setView('library')}
                  className="brutal-card bg-white p-6 cursor-pointer hover:bg-brand-secondary/5 transition-colors group"
                >
                  <div className="bg-brand-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-brand-secondary">
                    <Library className="text-brand-secondary w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-brand-secondary transition-colors">Biblioteca</h3>
                  <p className="text-sm text-gray-500 mb-4">Acesse e baixe os documentos do curso.</p>
                  <div className="flex items-center text-brand-secondary font-bold text-sm">
                    Explorar <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div 
                  onClick={() => window.open('https://youtube.com/playlist?list=PLUkv8hZ8kunVjEKfgPdLQlD_Nk1vdILgq&si=j5nRpjj6DGiSw8tV', '_blank')}
                  className="brutal-card bg-white p-6 cursor-pointer hover:!bg-[#fef2f2] transition-colors group"
                >
                  <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 border-red-500">
                    <Youtube className="text-red-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-2 group-hover:text-red-600 transition-colors">Vídeos do Curso</h3>
                  <p className="text-sm text-gray-500 mb-4">Acesse a playlist completa com as aulas.</p>
                  <div className="flex items-center text-red-600 font-bold text-sm">
                    Assistir <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>

              <section className="mt-12">
                <h3 className="text-2xl mb-6">Próxima Lição</h3>
                {lessons.find(l => !l.completed && l.unlocked) && (
                  <div 
                    onClick={() => {
                      setSelectedLesson(lessons.find(l => !l.completed && l.unlocked)!);
                      resetQuiz();
                      setView('lesson-detail');
                    }}
                    className="brutal-card bg-white p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xl">
                        {lessons.findIndex(l => !l.completed && l.unlocked) + 1}
                      </div>
                      <div>
                        <h4 className="text-lg">{lessons.find(l => !l.completed && l.unlocked)?.title}</h4>
                        <span className="text-xs font-mono uppercase text-brand-secondary">{lessons.find(l => !l.completed && l.unlocked)?.difficulty}</span>
                      </div>
                    </div>
                    <button className="brutal-button py-2">Começar</button>
                  </div>
                )}
              </section>

              <section className="mt-12">
                <div className="brutal-card p-8 bg-brand-primary/5 border-brand-primary">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-primary p-2 rounded-lg">
                      <Search className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl">Pesquisa Inteligente</h3>
                      <p className="text-sm text-gray-600">Consulte materiais extras do Google Drive do curso.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Ex: O que é Marketing de Permissão?"
                        className="w-full brutal-card px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="brutal-button px-6 flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                      Pesquisar
                    </button>
                  </div>

                  {searchResults && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 brutal-card p-6 bg-white"
                    >
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Target className="w-4 h-4 text-brand-primary" /> Resultado da Pesquisa:
                      </h4>
                      <div className="markdown-body text-sm leading-relaxed">
                        <Markdown>{searchResults}</Markdown>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <span className="text-[10px] text-gray-400 uppercase font-mono">Fonte: Google Drive do Curso</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setView('library')}
                            className="text-xs text-brand-secondary hover:underline font-bold flex items-center gap-1"
                          >
                            <Library className="w-3 h-3" /> Ver todos os documentos
                          </button>
                          <button 
                            onClick={() => setSearchResults(null)}
                            className="text-xs text-gray-500 hover:text-brand-primary font-bold"
                          >
                            Limpar Resultado
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'learning' && (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft />
                </button>
                <h2 className="text-3xl">Trilha de Aprendizado</h2>
              </div>

              <div className="brutal-card p-6 bg-white border-2 border-brand-dark">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-gray-500 mb-1">Seu Progresso Geral</h3>
                    <p className="text-2xl font-display">
                      {lessons.filter(l => l.completed).length} de {lessons.length} lições
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display text-brand-primary">
                      {Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-4 bg-gray-100 border-2 border-brand-dark rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${(lessons.filter(l => l.completed).length / lessons.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  />
                </div>
                <p className="text-[10px] font-mono uppercase mt-4 text-gray-400">
                  {lessons.filter(l => l.completed).length === lessons.length 
                    ? "🎉 Parabéns! Você completou toda a trilha!" 
                    : "Continue estudando para desbloquear novos níveis!"}
                </p>
              </div>

              <div 
                onClick={() => window.open('https://youtube.com/playlist?list=PLUkv8hZ8kunVjEKfgPdLQlD_Nk1vdILgq&si=j5nRpjj6DGiSw8tV', '_blank')}
                className="brutal-card p-4 !bg-[#e62117] !text-white flex items-center justify-between cursor-pointer hover:opacity-90 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Playlist de Aulas</h3>
                    <p className="text-xs opacity-80">Acompanhe os vídeos enquanto estuda</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    onClick={() => {
                      if (lesson.unlocked) {
                        setSelectedLesson(lesson);
                        resetQuiz();
                        setView('lesson-detail');
                      }
                    }}
                    className={cn(
                      "brutal-card bg-white p-6 flex items-center justify-between transition-all",
                      lesson.unlocked ? "cursor-pointer hover:translate-x-1" : "opacity-60 cursor-not-allowed grayscale",
                      lesson.completed && "border-brand-accent bg-brand-accent/5"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 border-brand-dark",
                        lesson.completed ? "bg-brand-accent text-white" : "bg-white"
                      )}>
                        {lesson.completed ? <CheckCircle2 /> : index + 1}
                      </div>
                      <div>
                        <h4 className="text-xl mb-1">{lesson.title}</h4>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-[10px] font-mono uppercase px-2 py-1 rounded border border-brand-dark",
                        lesson.difficulty === 'Iniciante' ? "bg-green-100" : 
                        lesson.difficulty === 'Intermediário' ? "bg-yellow-100" : "bg-red-100"
                      )}>
                        {lesson.difficulty}
                      </span>
                      {!lesson.unlocked && <Lock className="w-5 h-5 text-gray-400" />}
                      {lesson.unlocked && !lesson.completed && <ChevronRight className="w-6 h-6 text-brand-primary" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'lesson-detail' && selectedLesson && (
            <motion.div 
              key="lesson-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setView('learning')}
                  className="brutal-card px-4 py-2 bg-white flex items-center gap-2 text-brand-secondary font-bold hover:bg-brand-secondary/5 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" /> Voltar para a Trilha
                </button>
                <div className="flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary text-brand-primary text-xs font-bold">
                  <Zap className="w-3 h-3" /> +{selectedLesson.xp} XP
                </div>
              </div>

              <div 
                onClick={() => window.open('https://youtube.com/playlist?list=PLUkv8hZ8kunVjEKfgPdLQlD_Nk1vdILgq&si=j5nRpjj6DGiSw8tV', '_blank')}
                className="brutal-card p-3 !bg-[#fef2f2] border-red-200 flex items-center gap-3 cursor-pointer hover:!bg-red-100 transition-colors"
              >
                <Youtube className="text-red-600 w-5 h-5" />
                <span className="text-sm font-bold text-red-700">Assistir aula desta trilha no YouTube</span>
              </div>

              <div className="brutal-card p-8 bg-white">
                <h2 className="text-3xl font-bold mb-6 border-b-4 border-brand-dark pb-4">
                  {selectedLesson.title}
                </h2>

                <div className="mb-8 p-6 bg-brand-primary/5 border-2 border-brand-primary border-dashed rounded-xl">
                  <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-brand-primary" /> Resumo do Tema
                  </h3>
                  <p className="text-gray-700 italic leading-relaxed">
                    {selectedLesson.summary}
                  </p>
                </div>

                {selectedLesson.videoUrl && (
                  <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl border-2 border-brand-dark">
                    <iframe
                      className="w-full h-full"
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="markdown-body">
                  <Markdown>{selectedLesson.content}</Markdown>
                </div>

                {/* Notes Section */}
                <div className="mt-12 p-6 bg-gray-50 border-2 border-brand-dark rounded-2xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-primary" /> Minhas Anotações
                  </h3>
                  <div className="relative">
                    <textarea
                      value={lessonNotes[selectedLesson.id] || ''}
                      onChange={(e) => handleNoteChange(selectedLesson.id, e.target.value)}
                      placeholder="Escreva aqui suas reflexões, insights ou pontos importantes desta lição..."
                      className="w-full h-40 p-4 bg-white border-2 border-brand-dark rounded-xl text-sm focus:ring-0 focus:border-brand-primary outline-none transition-all resize-none font-sans"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase text-gray-400">
                      <Save className="w-3 h-3" /> Salvo Automaticamente
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t-2 border-brand-dark">
                  {!quizActive && !selectedLesson.completed && (
                    <div className="text-center space-y-4">
                      <p className="text-sm text-gray-500 font-bold uppercase">Pronto para testar seus conhecimentos?</p>
                      <button 
                        onClick={() => setQuizActive(true)}
                        className="brutal-button w-full flex items-center justify-center gap-2"
                      >
                        <Trophy className="w-5 h-5" /> Iniciar Quiz de Fixação
                      </button>
                    </div>
                  )}

                  {quizActive && !quizCompleted && (
                    <motion.div 
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Questão {currentQuestionIndex + 1} de {selectedLesson.quiz.length}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-gray-400">Acertos</span>
                          <span className="text-sm font-bold bg-brand-accent/10 text-brand-accent px-2 py-1 border border-brand-accent rounded">
                            {quizScore}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full h-3 bg-gray-100 border-2 border-brand-dark rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-primary"
                          initial={{ width: `${((currentQuestionIndex) / selectedLesson.quiz.length) * 100}%` }}
                          animate={{ width: `${((currentQuestionIndex + 1) / selectedLesson.quiz.length) * 100}%` }}
                          transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        />
                      </div>

                      <div className="p-6 bg-gray-50 border-2 border-brand-dark rounded-2xl">
                        <p className="text-xl font-bold leading-tight text-brand-dark">
                          {selectedLesson.quiz[currentQuestionIndex].question}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {selectedLesson.quiz[currentQuestionIndex].options.map((option, idx) => {
                          const isCorrect = idx === selectedLesson.quiz[currentQuestionIndex].correctAnswer;
                          const isSelected = idx === selectedAnswer;
                          
                          return (
                            <motion.button 
                              key={idx}
                              whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                              whileTap={!showFeedback ? { scale: 0.98 } : {}}
                              animate={showFeedback && isSelected && !isCorrect ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                              onClick={() => handleAnswer(idx)}
                              disabled={showFeedback}
                              className={cn(
                                "p-4 border-2 border-brand-dark text-left transition-all font-bold flex items-center justify-between rounded-xl",
                                !showFeedback && "hover:bg-brand-primary/5 hover:border-brand-primary",
                                showFeedback && isCorrect && "bg-green-100 border-green-600 text-green-800",
                                showFeedback && isSelected && !isCorrect && "bg-red-100 border-red-600 text-red-800",
                                showFeedback && !isCorrect && !isSelected && "opacity-40"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg border-2 border-current flex items-center justify-center text-sm">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              <AnimatePresence>
                                {showFeedback && isCorrect && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                  </motion.div>
                                )}
                                {showFeedback && isSelected && !isCorrect && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <X className="w-6 h-6 text-red-600" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {showFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "p-4 rounded-xl border-2 text-center font-bold",
                              selectedAnswer === selectedLesson.quiz[currentQuestionIndex].correctAnswer
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-red-50 border-red-200 text-red-700"
                            )}
                          >
                            {selectedAnswer === selectedLesson.quiz[currentQuestionIndex].correctAnswer
                              ? "✨ Excelente! Você acertou!"
                              : "💡 Quase lá! Continue focado."}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {(quizCompleted || selectedLesson.completed) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-6"
                    >
                      {quizCompleted && (
                        <motion.div 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="brutal-card p-6 bg-brand-accent/10 border-brand-accent"
                        >
                          <motion.div
                            animate={{ 
                              rotate: [0, -10, 10, -10, 10, 0],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <Trophy className="w-12 h-12 text-brand-accent mx-auto mb-4" />
                          </motion.div>
                          <h3 className="text-2xl mb-2">Quiz Finalizado!</h3>
                          <p className="text-lg">Você acertou <strong>{quizScore}</strong> de <strong>{selectedLesson.quiz.length}</strong> questões.</p>
                        </motion.div>
                      )}
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCompleteLesson(selectedLesson.id)}
                        className="brutal-button w-full md:w-auto flex items-center justify-center gap-2 mx-auto"
                      >
                        <CheckCircle2 className="w-5 h-5" /> {selectedLesson.completed ? 'Voltar para a Trilha' : 'Concluir Lição e Ganhar XP'}
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                {lessons.findIndex(l => l.id === selectedLesson.id) > 0 ? (
                  <button 
                    onClick={() => {
                      const prev = lessons[lessons.findIndex(l => l.id === selectedLesson.id) - 1];
                      setSelectedLesson(prev);
                      resetQuiz();
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-2 text-brand-secondary font-bold hover:bg-brand-secondary/5 px-4 py-2 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" /> Anterior
                  </button>
                ) : <div />}

                {lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1 ? (
                  <motion.button 
                    whileHover={lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1].unlocked ? { scale: 1.05, x: 5 } : {}}
                    whileTap={lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1].unlocked ? { scale: 0.95 } : {}}
                    onClick={() => {
                      const next = lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1];
                      if (next.unlocked) {
                        setSelectedLesson(next);
                        resetQuiz();
                        window.scrollTo(0, 0);
                      }
                    }}
                    disabled={!lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1].unlocked}
                    className={cn(
                      "flex items-center gap-2 font-bold px-6 py-3 transition-all",
                      lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1].unlocked 
                        ? "brutal-button bg-brand-primary text-white" 
                        : "bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-not-allowed"
                    )}
                  >
                    Próxima <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ) : <div />}
              </div>
            </motion.div>
          )}

          {view === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft />
                </button>
                <h2 className="text-3xl">Projetos Práticos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div 
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      const firstUncompletedIndex = project.steps.findIndex(s => !s.completed);
                      setActiveProjectStepIndex(firstUncompletedIndex === -1 ? 0 : firstUncompletedIndex);
                      setView('project-detail');
                    }}
                    className="brutal-card p-6 cursor-pointer hover:translate-y-[-4px] transition-transform"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase bg-brand-primary/10 text-brand-primary px-2 py-1 rounded border border-brand-primary w-fit">
                          {project.category}
                        </span>
                        <span className={cn(
                          "text-[9px] font-bold uppercase px-2 py-0.5 rounded border w-fit",
                          project.status === 'Concluído' ? "bg-green-100 border-green-500 text-green-700" :
                          project.status === 'Em Progresso' ? "bg-blue-100 border-blue-500 text-blue-700" :
                          "bg-gray-100 border-gray-500 text-gray-700"
                        )}>
                          {project.status}
                        </span>
                      </div>
                      <span className="text-sm font-bold">{project.progress}%</span>
                    </div>
                    <h3 className="text-xl mb-2">{project.name}</h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-brand-dark mb-6">
                      <motion.div 
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                            <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="User" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <button className="text-brand-primary font-bold text-sm flex items-center">
                        Continuar <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="brutal-card p-6 border-dashed border-gray-400 bg-gray-50 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg mb-1">Novo Projeto</h3>
                  <p className="text-sm text-gray-500">Comece um novo desafio prático.</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div 
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-display">Biblioteca de Documentos</h2>
                  <p className="text-gray-500 text-sm">Acesse e baixe os materiais de apoio do curso.</p>
                </div>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Pesquisar documentos..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-brand-dark rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(KNOWLEDGE_BASE)
                  .filter(([key, content]) => 
                    key.toLowerCase().includes(librarySearch.toLowerCase()) || 
                    content.toLowerCase().includes(librarySearch.toLowerCase())
                  )
                  .map(([key, content]) => {
                    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="brutal-card p-6 bg-white flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brand-primary/10 rounded-lg border border-brand-primary">
                              <FileText className="w-5 h-5 text-brand-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{title}</h3>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                            {content.trim().substring(0, 180)}...
                          </p>
                        </div>
                        <button 
                          onClick={() => downloadDocument(title, content)}
                          className="brutal-button bg-brand-secondary text-white flex items-center justify-center gap-2 text-sm py-3"
                        >
                          <Download className="w-4 h-4" /> Baixar Documento (TXT)
                        </button>
                      </div>
                    );
                  })}
              </div>
              
              {Object.entries(KNOWLEDGE_BASE).filter(([key, content]) => 
                key.toLowerCase().includes(librarySearch.toLowerCase()) || 
                content.toLowerCase().includes(librarySearch.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-500">Nenhum documento encontrado</h3>
                  <p className="text-sm text-gray-400">Tente buscar por outros termos.</p>
                </div>
              )}
            </motion.div>
          )}

          {view === 'project-detail' && selectedProject && (
            <motion.div 
              key="project-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setView('projects')}
                  className="flex items-center gap-2 text-brand-secondary font-bold"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar para Projetos
                </button>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-sm font-bold text-brand-primary">
                    Progresso: {selectedProject.progress}%
                  </div>
                  <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden border border-brand-dark">
                    <motion.div 
                      className="h-full bg-brand-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProject.progress}%` }}
                      transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                  <div className="brutal-card p-4 bg-brand-dark text-white">
                    <h3 className="text-lg mb-2 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-brand-primary" /> Etapas
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.steps.map((step, idx) => (
                        <button 
                          key={step.id}
                          onClick={() => setActiveProjectStepIndex(idx)}
                          className={cn(
                            "w-full p-3 rounded-lg text-sm flex items-center gap-3 border transition-all text-left",
                            idx === activeProjectStepIndex ? "border-brand-primary bg-brand-primary/10 text-brand-primary font-bold" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10",
                            step.completed && idx !== activeProjectStepIndex && "text-brand-accent/70"
                          )}
                        >
                          {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[10px]">{idx + 1}</span>}
                          {step.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="brutal-card p-4 bg-brand-secondary/10 border-brand-secondary">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-brand-secondary">
                      <Target className="w-4 h-4" /> Objetivos
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                      {selectedProject.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="brutal-card p-4 bg-brand-accent/10 border-brand-accent">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2 text-brand-accent">
                      <Star className="w-4 h-4" /> Dica do Mentor
                    </h4>
                    <p className="text-xs text-gray-600 italic">
                      "{selectedProject.steps.find(s => !s.completed)?.hint || "Você está indo muito bem! Continue assim."}"
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="brutal-card p-8 bg-white">
                    <div className="mb-8 pb-6 border-b-2 border-brand-dark">
                      <h2 className="text-3xl mb-2">{selectedProject.name}</h2>
                      <p className="text-gray-600">{selectedProject.description}</p>
                    </div>

                    {activeProjectStepIndex < selectedProject.steps.length ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-brand-primary font-bold">Etapa {activeProjectStepIndex + 1} de {selectedProject.steps.length}</span>
                            <h3 className="text-2xl mt-1">{selectedProject.steps[activeProjectStepIndex].title}</h3>
                          </div>
                          {selectedProject.steps[activeProjectStepIndex].completed && (
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase px-2 py-1 rounded border border-green-200">Concluído</span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {selectedProject.steps[activeProjectStepIndex].instruction}
                        </p>

                        <div className="space-y-2">
                          <label className="text-sm font-bold uppercase tracking-wider">Sua Resposta</label>
                          <textarea 
                            key={`${selectedProject.id}-${activeProjectStepIndex}`}
                            defaultValue={selectedProject.steps[activeProjectStepIndex].input || ''}
                            className="w-full p-4 border-2 border-brand-dark focus:ring-2 focus:ring-brand-primary focus:outline-none min-h-[150px]"
                            placeholder="Digite aqui sua ideia..."
                            id="step-input"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => {
                              const input = (document.getElementById('step-input') as HTMLTextAreaElement).value;
                              if (input.trim()) {
                                handleStepComplete(selectedProject.id, selectedProject.steps[activeProjectStepIndex].id, input);
                                if (activeProjectStepIndex + 1 < selectedProject.steps.length) {
                                  setActiveProjectStepIndex(prev => prev + 1);
                                }
                              }
                            }}
                            className="brutal-button flex-1"
                          >
                            {selectedProject.steps[activeProjectStepIndex].completed ? 'Atualizar Resposta' : 'Salvar e Continuar'}
                          </button>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <button 
                            disabled={activeProjectStepIndex === 0}
                            onClick={() => setActiveProjectStepIndex(prev => prev - 1)}
                            className="flex items-center gap-2 text-sm font-bold text-brand-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4" /> Etapa Anterior
                          </button>
                          <button 
                            disabled={activeProjectStepIndex === selectedProject.steps.length - 1}
                            onClick={() => setActiveProjectStepIndex(prev => prev + 1)}
                            className="flex items-center gap-2 text-sm font-bold text-brand-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Próxima Etapa <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-6">
                        <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto border-2 border-brand-accent">
                          <Trophy className="w-10 h-10 text-brand-accent" />
                        </div>
                        <h2 className="text-3xl">Projeto Concluído!</h2>
                        <p className="text-gray-600">
                          Parabéns! Você finalizou todas as etapas deste projeto. Sua marca está pronta para o mercado!
                        </p>
                        <button 
                          onClick={() => setView('projects')}
                          className="brutal-button"
                        >
                          Ver Outros Projetos
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Review Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Resumo do Projeto</h4>
                    {selectedProject.steps.filter(s => s.completed).map(step => (
                      <div key={step.id} className="brutal-card p-4 bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                          <span className="text-sm font-bold">{step.title}</span>
                        </div>
                        <p className="text-sm text-gray-700">{step.input}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Navigation for Mobile */}
      <nav className="md:hidden bg-white border-t-2 border-brand-dark p-2 flex justify-around items-center sticky bottom-0 z-50">
        <button 
          onClick={() => setView('dashboard')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
            view === 'dashboard' ? "text-brand-primary" : "text-gray-400"
          )}
        >
          <Layout className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Início</span>
        </button>
        <button 
          onClick={() => setView('learning')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
            (view === 'learning' || view === 'lesson-detail') ? "text-brand-secondary" : "text-gray-400"
          )}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Aprender</span>
        </button>
        <button 
          onClick={() => setView('projects')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
            (view === 'projects' || view === 'project-detail') ? "text-brand-accent" : "text-gray-400"
          )}
        >
          <Rocket className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Projetos</span>
        </button>
        <button 
          onClick={() => setView('library')}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
            view === 'library' ? "text-brand-primary" : "text-gray-400"
          )}
        >
          <Library className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Biblioteca</span>
        </button>
      </nav>

      <Chat />

      {projectFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="brutal-card p-8 bg-white max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Dica do Mentor</h3>
            <p className="text-gray-700 mb-6">{projectFeedback}</p>
            <button 
              onClick={() => setProjectFeedback(null)}
              className="brutal-button w-full"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      <div className="text-center py-4 text-xs text-gray-500 border-t border-gray-200">
        Criador: Thiago Macedo
      </div>
    </div>
  );
}

