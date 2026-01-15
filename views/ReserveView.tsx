
import React, { useState } from 'react';
import { PIECES } from '../constants.tsx';
import { Piece } from '../types';
import { Check, Calendar, Clock, Users, ChevronRight, MessageSquare, Hash, User, Phone, Tag, Copy } from 'lucide-react';

const ReserveView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPieces, setSelectedPieces] = useState<Piece[]>([]);
  const [bookingData, setBookingData] = useState({ 
    date: '', 
    time: '', 
    guests: 1, 
    notes: '',
    name: '',
    phone: ''
  });
  const [orderId, setOrderId] = useState('');
  const [pieceTags, setPieceTags] = useState<string[]>([]);

  const generateIds = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randomCode = Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    const newOrderId = `ORD-${randomCode}`;
    
    const tags = selectedPieces.map((_, i) => `${newOrderId}-${(i + 1).toString().padStart(2, '0')}`);
    
    setOrderId(newOrderId);
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
    if (step === 2) {
      generateIds();
    }
    setStep(prev => prev + 1);
  };

  const totalPrice = selectedPieces.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="relative min-h-full pb-32">
      <div className="p-6 space-y-8 animate-in fade-in duration-500">
        <header className="text-center">
          <h2 className="serif text-3xl text-[#8D7B68]">Nova Reserva</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-[#8D7B68]' : 'bg-[#F1E9E0]'}`} />
            ))}
          </div>
        </header>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#8D7B68]">1. Escolha as peças</h3>
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
            <h3 className="text-lg font-medium text-[#8D7B68]">2. Identificação do Cliente</h3>
            
            <div className="space-y-4">
              <div className="bg-[#F1E9E0]/30 p-4 rounded-2xl border border-[#F1E9E0] mb-2">
                <p className="text-[10px] font-bold text-[#8D7B68] uppercase tracking-widest mb-1">Peças no Pedido:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPieces.map(p => (
                    <span key={p.id} className="text-[10px] bg-white px-2 py-1 rounded-full border border-[#F1E9E0] text-[#A4907C]">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nome Completo para Levantamento" 
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" 
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
                  <input 
                    type="tel" 
                    placeholder="Número de Telemóvel" 
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1">
                      <Calendar size={12} /> Data
                    </label>
                    <input 
                      type="date" 
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1">
                      <Clock size={12} /> Hora
                    </label>
                    <select 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm"
                    >
                      <option value="">Escolher</option>
                      <option value="10:00">10:00</option>
                      <option value="14:30">14:30</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1">
                    <MessageSquare size={12} /> Notas
                  </label>
                  <textarea 
                    rows={2}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    placeholder="Algum detalhe especial?"
                    className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 pt-2 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-100">
              <Check size={32} />
            </div>
            
            <div className="space-y-1">
              <h2 className="serif text-3xl text-[#8D7B68]">Reserva Confirmada</h2>
              <p className="text-[#A4907C] text-[10px] uppercase tracking-[0.3em] font-black">Bubbles & Craft Inventário</p>
            </div>

            {/* Main Order Card */}
            <div className="relative bg-white border-2 border-[#8D7B68]/20 rounded-[32px] p-6 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Hash size={60} />
              </div>
              
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#A4907C] font-bold">ID Único do Pedido</p>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    <span className="serif text-4xl text-[#8D7B68] font-bold tracking-tighter">
                      {orderId}
                    </span>
                    <button className="text-[#C8B6A6] active:scale-90 transition-all">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="w-full h-px border-t border-dashed border-[#F1E9E0]" />

                <div className="space-y-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#A4907C] font-black">Etiquetas Individuais ({selectedPieces.length})</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {pieceTags.map((tag, i) => (
                      <div key={tag} className="bg-[#FDFBF7] border border-[#F1E9E0] px-3 py-2 rounded-xl flex items-center gap-2">
                        <Tag size={10} className="text-[#C8B6A6]" />
                        <span className="text-[11px] font-mono font-bold text-[#8D7B68]">{tag}</span>
                        <span className="text-[9px] text-[#A4907C] italic opacity-60">• {selectedPieces[i].name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F1E9E0]/30 rounded-2xl p-4 text-left border border-[#F1E9E0]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><User size={14} className="text-[#8D7B68]" /></div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#A4907C] font-black">Verificação Alternativa</p>
                  <p className="text-xs text-[#8D7B68] font-medium leading-relaxed">
                    Podes levantar as tuas peças indicando o nome <b>{bookingData.name || 'registado'}</b> ou o telemóvel <b>{bookingData.phone || 'associado'}</b> no balcão.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all hover:bg-[#746455]"
            >
              Concluído
            </button>
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="fixed bottom-24 left-6 right-6 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-4">
          <button 
            disabled={(step === 1 && selectedPieces.length === 0) || (step === 2 && (!bookingData.date || !bookingData.time || !bookingData.name))}
            onClick={handleNext}
            className="w-full bg-[#8D7B68] text-white p-5 rounded-3xl font-bold shadow-2xl flex items-center justify-between disabled:opacity-50 transition-all hover:bg-[#746455]"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-70 uppercase tracking-widest mb-1">Custo Estimado</span>
              <span className="text-lg">{totalPrice.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
              {step === 1 ? 'Próximo' : 'Confirmar Tudo'} <ChevronRight size={18} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveView;
