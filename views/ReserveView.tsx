
import React, { useState } from 'react';
import { PIECES } from '../constants.tsx';
import { Piece } from '../types';
import { Check, Calendar, Clock, Users, ChevronRight, MessageSquare } from 'lucide-react';

const ReserveView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPieces, setSelectedPieces] = useState<Piece[]>([]);
  const [bookingData, setBookingData] = useState({ date: '', time: '', guests: 1, notes: '' });

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

  const handleNext = () => setStep(prev => prev + 1);

  const totalPrice = selectedPieces.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="relative min-h-full pb-32">
      <div className="p-6 space-y-8 animate-in fade-in duration-500">
        <header className="text-center">
          <h2 className="serif text-3xl text-[#8D7B68]">Reservar Experiência</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-[#8D7B68]' : 'bg-[#F1E9E0]'}`} />
            ))}
          </div>
        </header>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#8D7B68]">1. Escolha as suas peças</h3>
            <div className="grid grid-cols-2 gap-4">
              {PIECES.map(piece => {
                const isSelected = selectedPieces.some(p => p.id === piece.id);
                return (
                  <div 
                    key={piece.id}
                    onClick={() => togglePiece(piece)}
                    className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${isSelected ? 'border-[#8D7B68] shadow-md' : 'border-transparent'}`}
                  >
                    <img src={piece.image} alt={piece.name} className="w-full aspect-square object-cover" />
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-[#8D7B68]">{piece.name}</h4>
                      <p className="text-xs text-[#A4907C]">{piece.price.toLocaleString()} MT</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#8D7B68] text-white p-1 rounded-full shadow-lg">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#8D7B68]">2. Detalhes da Reserva</h3>
            <div className="bg-[#F1E9E0]/30 p-4 rounded-2xl border border-[#F1E9E0] mb-6">
              <p className="text-[10px] font-bold text-[#8D7B68] uppercase mb-2 tracking-widest">Peças Selecionadas:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPieces.map(p => (
                  <span key={p.id} className="text-[10px] bg-white px-2 py-1 rounded-full border border-[#F1E9E0] text-[#A4907C]">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold">
                    <Calendar size={14} /> Data
                  </label>
                  <input 
                    type="date" 
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold">
                    <Clock size={14} /> Horário
                  </label>
                  <select 
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm"
                  >
                    <option value="">Selecionar</option>
                    <option value="10:00">10:00</option>
                    <option value="14:30">14:30</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold">
                  <Users size={14} /> Pessoas
                </label>
                <input 
                  type="number" 
                  min="1" 
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                  className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold">
                  <MessageSquare size={14} /> Notas (Alergias ou Observações)
                </label>
                <textarea 
                  rows={3}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                  placeholder="Informe se tiver alguma alergia alimentar ou pedido especial..."
                  className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 pt-10">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={40} />
            </div>
            <h2 className="serif text-2xl text-[#8D7B68]">Reserva Confirmada!</h2>
            <p className="text-[#A4907C] text-sm leading-relaxed">
              Enviámos os detalhes para o teu e-mail. <br/> Estamos ansiosos por te ver!
            </p>
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#F1E9E0] inline-block w-full">
               <p className="text-[10px] uppercase tracking-widest text-[#A4907C] font-bold mb-1">Data da Experiência</p>
               <p className="serif text-[#8D7B68]">{bookingData.date || 'Em breve'} às {bookingData.time || '--:--'}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-[#8D7B68] text-white py-4 rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Bar */}
      {step < 3 && (
        <div className="fixed bottom-24 left-6 right-6 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-4">
          <button 
            disabled={(step === 1 && selectedPieces.length === 0) || (step === 2 && (!bookingData.date || !bookingData.time))}
            onClick={handleNext}
            className="w-full bg-[#8D7B68] text-white p-5 rounded-3xl font-bold shadow-2xl flex items-center justify-between disabled:opacity-50 transition-all hover:bg-[#746455]"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-70 uppercase tracking-widest mb-1">Total Estimado</span>
              <span className="text-lg">{totalPrice.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
              {step === 1 ? 'Continuar' : 'Confirmar'} <ChevronRight size={18} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveView;
