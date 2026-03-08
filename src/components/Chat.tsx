import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X } from 'lucide-react';

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const WHATSAPP_NUMBER = "5538998832315"; // Número atualizado do Mentor
  const WHATSAPP_MESSAGE = encodeURIComponent("Olá Mentor! Gostaria de tirar uma dúvida sobre o curso de Marketing.");

  // CONFIGURAÇÕES DO MENTOR (PODE ALTERAR AQUI)
  const MENTOR_NAME = "Thiago Macedo";
  const MENTOR_PHOTO = "https://drive.google.com/uc?export=view&id=1sC1b7EUPH5exHQt8cl8CQCT_ZlpY_I0a"; // Link direto do Google Drive

  const handleWhatsAppRedirect = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#25D366] text-white p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-brand-dark hover:bg-[#128C7E] transition-all flex items-center justify-center"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white border-2 border-brand-dark rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-72 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-[#25D366] text-white border-b-2 border-brand-dark flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <h3 className="font-bold uppercase text-xs tracking-wider">WhatsApp do Mentor</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto border-2 border-brand-dark overflow-hidden">
                <img src={MENTOR_PHOTO} alt={MENTOR_NAME} referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-brand-dark">{MENTOR_NAME}</h4>
                <p className="text-xs text-gray-500">Mentor de Marketing & Vendas</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dúvidas sobre os projetos ou lições? Me chame agora no WhatsApp!
              </p>
              <button 
                onClick={handleWhatsAppRedirect}
                className="brutal-button w-full bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-2 py-3"
              >
                <MessageSquare className="w-5 h-5" /> Iniciar Conversa
              </button>
            </div>
            <div className="p-2 bg-gray-50 text-[9px] text-center text-gray-400 uppercase font-mono border-t border-gray-100">
              Resposta média: 15 minutos
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
