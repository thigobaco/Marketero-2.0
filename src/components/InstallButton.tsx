import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManualGuide, setShowManualGuide] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowManualGuide(true);
    }
  };

  return (
    <>
      <button 
        onClick={handleInstall}
        className="bg-brand-accent text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 hover:bg-brand-dark transition-all border-2 border-brand-dark group"
      >
        <Download className="w-4 h-4 group-hover:animate-bounce" />
        <span className="text-xs font-bold uppercase tracking-tight hidden sm:inline">
          {deferredPrompt ? 'Instalar' : 'App'}
        </span>
      </button>

      {showManualGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="brutal-card p-8 bg-white max-w-md w-full relative">
            <button 
              onClick={() => setShowManualGuide(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-display mb-6 flex items-center gap-2">
              <Download className="text-brand-primary" /> Guia de Instalação
            </h3>
            
            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <div className="bg-brand-primary/10 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                <p>No <strong>Android/Chrome</strong>, clique nos 3 pontinhos e selecione "Instalar aplicativo".</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-brand-secondary/10 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                <p>No <strong>iPhone/Safari</strong>, clique no ícone de compartilhar e selecione "Adicionar à Tela de Início".</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-brand-accent/10 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                <p>No <strong>Computador</strong>, procure o ícone de instalação na barra de endereços.</p>
              </div>
            </div>

            <button 
              onClick={() => setShowManualGuide(false)}
              className="brutal-button w-full mt-8"
            >
              Entendido!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
