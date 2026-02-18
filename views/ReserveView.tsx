
import React, { useState } from 'react';
import { PIECES } from '../constants.tsx';
import { Piece } from '../types';
import { Check, UserCheck, AlertCircle, Tag, ChevronRight, ShoppingCart, MessageSquare, Hash } from 'lucide-react';

const ReserveView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPieces, setSelectedPieces] = useState<Piece[]>([]);
  
  const userProfile = {
    name: 'Maria Silva',
    phone: '+258 84 000 0000'
  };

  const [bookingData, setBookingData] = useState({ 
    date: '', 
    time: '', 
    guests: 1, 
    notes: '',
    name: userProfile.name,
    phone: userProfile.phone
  });
  
  const [pieceTags, setPieceTags] = useState<string[]>([]);

  const generateIds = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randomCode = Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    const newOrderId = `ORD-${randomCode}`;
    const tags = selectedPieces.map((_, i) => `${newOrderId}-${(i + 1).toString().padStart(2, '0')}`);
    setPieceTags(tags);
  };

  const togglePiece = (piece: Piece) => {
    setSelectedPieces(prev => {
      const isSelected = prev.find(p => p.id === piece.id);
      if (isSelected) {
        return prev.filter(p => p.id !== piece.id);
      } else {
        return [...prev, piece];
      }
    });
  };

  const handleNext = () => {
    if (step === 1 && selectedPieces.length === 0) return;
    if (step === 2 && (!bookingData.date || !bookingData.time)) return;

    if (step === 2) {
      generateIds();
    }
    setStep(prev => prev + 1);
  };

  const resetFlow = () => {
    setStep(1);
    setSelectedPieces([]);
    setBookingData({ ...bookingData, date: '', time: '', notes: '' });
  };

  // Determinar se o botão principal deve estar desativado
  const isButtonDisabled = () => {
    if (step === 1) return selectedPieces.length === 0;
    if (step === 2) return !bookingData.date || !bookingData.time;
    return false;
  };

  // Texto do botão principal baseado no step
  const getButtonText = () => {
    if (step === 1) return `Continuar ${selectedPieces.length > 0 ? `(${selectedPieces.length} ${selectedPieces.length === 1 ? 'peça' : 'peças'})` : ''}`;
    if (step === 2) return "Confirmar Reserva";
    if (step === 3) return "Finalizar Registo";
    return "";
  };

  const totalPrice = selectedPieces.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="relative min-h-screen pb-48">
      <div className="p-6 space-y-8">
        {step < 4 && (
          <header className="text-center">
            <h2 className="serif text-3xl text-[#8D7B68]">Nova Reserva</h2>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#8D7B68] w-12' : 'bg-[#F1E9E0]'}`} />
              ))}
            </div>
          </header>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-medium text-[#8D7B68]">1. Escolha as peças</h3>
              <span className="text-[10px] text-[#A4907C] font-bold uppercase tracking-widest">{selectedPieces.length} selecionadas</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PIECES.map(piece => {
                const isSelected = selectedPieces.some(p => p.id === piece.id);
                return (
                  <div 
                    key={piece.id}
                    onClick={() => togglePiece(piece)}
                    className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer active:scale-95 ${isSelected ? 'border-[#8D7B68] shadow-md -translate-y-1' : 'border-transparent shadow-sm'}`}
                  >
                    <img src={piece.image} alt={piece.name} className="w-full aspect-square object-cover" />
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-[#8D7B68]">{piece.name}</h4>
                      <p className="text-xs text-[#A4907C]">{piece.price.toLocaleString()} MT</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#8D7B68] text-white p-1.5 rounded-full shadow-lg animate-in zoom-in duration-300">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
            <h3 className="text-lg font-medium text-[#8D7B68]">2. Detalhes do Agendamento</h3>
            
            <div className="space-y-6">
              {/* Resumo do Pedido */}
              <section className="bg-white p-5 rounded-[32px] border border-[#F1E9E0] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#8D7B68]">
                  <ShoppingCart size={18} />
                  <h4 className="text-[10px] uppercase font-black tracking-[0.2em]">As suas escolhas</h4>
                </div>
                
                <div className="space-y-3">
                  {selectedPieces.map(piece => (
                    <div key={piece.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <img src={piece.image} className="w-10 h-10 rounded-xl object-cover" alt={piece.name} />
                        <span className="text-sm font-medium text-[#4A3F35]">{piece.name}</span>
                      </div>
                      <span className="text-xs text-[#A4907C]">{piece.price.toLocaleString()} MT</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-[#F1E9E0] flex justify-between items-center">
                  <span className="text-xs font-bold text-[#8D7B68]">Total Estimado</span>
                  <span className="text-lg serif text-[#8D7B68]">{totalPrice.toLocaleString()} MT</span>
                </div>
              </section>

              {/* Formulário de Agendamento */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-[32px] border border-[#F1E9E0] flex items-center gap-4 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] flex items-center justify-center text-[#8D7B68] border border-[#F1E9E0]">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-[#A4907C] uppercase font-bold tracking-widest mb-0.5">Identificação</p>
                    <p className="text-sm font-bold text-[#8D7B68]">{bookingData.name}</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[32px] border border-[#F1E9E0] space-y-5 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-[#A4907C] tracking-widest ml-1">Data</label>
                      <input 
                        type="date" 
                        value={bookingData.date} 
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})} 
                        className="w-full bg-[#FDFBF7] border border-[#F1E9E0] p-4 rounded-2xl text-sm outline-none focus:border-[#8D7B68] transition-colors" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-[#A4907C] tracking-widest ml-1">Horário</label>
                      <select 
                        value={bookingData.time} 
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})} 
                        className="w-full bg-[#FDFBF7] border border-[#F1E9E0] p-4 rounded-2xl text-sm outline-none focus:border-[#8D7B68] transition-colors appearance-none"
                      >
                        <option value="">Escolher</option>
                        <option value="10:00">10:00</option>
                        <option value="14:30">14:30</option>
                        <option value="18:00">18:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center gap-2 mb-1 ml-1">
                      <MessageSquare size={14} className="text-[#A4907C]" />
                      <label className="text-[10px] uppercase font-black text-[#A4907C] tracking-widest">Notas Especiais</label>
                    </div>
                    <textarea 
                      placeholder="Ex: Reserva para aniversário, mesa perto da luz..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                      rows={3}
                      className="w-full bg-[#FDFBF7] border border-[#F1E9E0] p-4 rounded-2xl text-sm outline-none focus:border-[#8D7B68] transition-colors resize-none placeholder:text-[#C8B6A6]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <h2 className="serif text-2xl text-[#8D7B68]">Identificação das Peças</h2>
            <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-3xl text-left flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Hash size={20} />
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Estes são os códigos de rastreio para as suas peças. <span className="font-bold">Marque a sua peça física</span> com este ID no café para podermos identificar a sua obra após a cozedura.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
               {selectedPieces.map((piece, index) => (
                 <div key={pieceTags[index]} className="bg-white border border-[#F1E9E0] p-4 rounded-[24px] flex items-center justify-between shadow-sm group">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#FDFBF7] overflow-hidden flex items-center justify-center border border-[#F1E9E0] relative shadow-inner">
                        <img src={piece.image} className="w-full h-full object-cover opacity-80" alt={piece.name} />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-black text-[#A4907C] uppercase tracking-widest block mb-0.5">{piece.name}</span>
                        <span className="text-base font-bold text-[#8D7B68] tracking-wider">{pieceTags[index]}</span>
                      </div>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center border border-[#F1E9E0]">
                      <Tag size={16} className="text-[#C8B6A6]" />
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center animate-in zoom-in duration-700">
            <div className="relative">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center animate-pulse">
                 <Check size={48} strokeWidth={3} />
              </div>
              <div className="absolute -inset-4 bg-green-500/10 rounded-full animate-ping duration-[2000ms]" />
            </div>
            <div className="space-y-3">
              <h2 className="serif text-4xl text-[#8D7B68]">Está reservado!</h2>
              <p className="text-[#A4907C] text-sm max-w-[240px] mx-auto leading-relaxed">
                A tua experiência foi registada. Anote os seus códigos de rastreio e mostre-os à nossa equipa ao chegar.
              </p>
            </div>
            <button 
              onClick={resetFlow} 
              className="px-10 py-4 bg-white border border-[#F1E9E0] rounded-full text-[#8D7B68] font-bold text-[10px] uppercase tracking-[0.2em] shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Fazer nova reserva
            </button>
          </div>
        )}
      </div>

      {/* Botão Flutuante Fixo (Apenas nos passos 1, 2 e 3) */}
      {step < 4 && (
        <div className="fixed bottom-24 left-0 right-0 px-6 z-40 animate-in slide-in-from-bottom-8 duration-700 delay-300">
          <div className="max-w-md mx-auto">
            <button 
              disabled={isButtonDisabled()}
              onClick={handleNext}
              className={`w-full py-5 rounded-[24px] font-bold text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 transition-all duration-500 transform ${
                isButtonDisabled() 
                ? 'bg-[#EADACD] text-[#C8B6A6] scale-95 opacity-80 cursor-not-allowed' 
                : 'bg-[#8D7B68] text-white active:scale-[0.98] hover:bg-[#746455]'
              }`}
            >
              {getButtonText()}
              {!isButtonDisabled() && <ChevronRight size={20} className="animate-pulse" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReserveView;
