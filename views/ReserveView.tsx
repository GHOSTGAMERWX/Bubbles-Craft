
import React, { useState, useRef } from 'react';
import { PIECES } from '../constants.tsx';
import { Piece } from '../types';
import { Check, Calendar, Clock, ChevronRight, MessageSquare, Hash, UserCheck, Camera, Sparkles, AlertCircle, Tag, ArrowRight, Printer, Share2 } from 'lucide-react';

const ReserveView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPieces, setSelectedPieces] = useState<Piece[]>([]);
  const [paintedImages, setPaintedImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTagForPhoto, setCurrentTagForPhoto] = useState<string | null>(null);
  
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

  const resetFlow = () => {
    setStep(1);
    setSelectedPieces([]);
    setPaintedImages({});
    setBookingData({ ...bookingData, date: '', time: '', notes: '' });
  };

  const handleCapturePhoto = (tag: string) => {
    setCurrentTagForPhoto(tag);
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentTagForPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaintedImages(prev => ({
          ...prev,
          [currentTagForPhoto]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const totalPrice = selectedPieces.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="relative min-h-full pb-32">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} capture="environment" />
      
      <div className="p-6 space-y-8 animate-in fade-in duration-500">
        {step < 4 && (
          <header className="text-center">
            <h2 className="serif text-3xl text-[#8D7B68]">Nova Reserva</h2>
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-[#8D7B68]' : 'bg-[#F1E9E0]'}`} />
              ))}
            </div>
          </header>
        )}

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
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-medium text-[#8D7B68]">2. Detalhes do Agendamento</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-3xl border border-[#F1E9E0] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F1E9E0]/50 flex items-center justify-center text-[#8D7B68]">
                  <UserCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#A4907C] font-bold">Identidade de Reserva</p>
                  <p className="text-sm font-bold text-[#8D7B68]">{bookingData.name}</p>
                  <p className="text-[11px] text-[#A4907C]">{bookingData.phone}</p>
                </div>
              </div>

              <div className="bg-[#F1E9E0]/30 p-4 rounded-2xl border border-[#F1E9E0] mb-2">
                <p className="text-[10px] font-bold text-[#8D7B68] uppercase tracking-widest mb-1">Resumo das Peças:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPieces.map(p => (
                    <span key={p.id} className="text-[10px] bg-white px-2 py-1 rounded-full border border-[#F1E9E0] text-[#A4907C]">
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1"><Calendar size={12} /> Data</label>
                    <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1"><Clock size={12} /> Hora</label>
                    <select value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm">
                      <option value="">Escolher</option>
                      <option value="10:00">10:00</option>
                      <option value="14:30">14:30</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#A4907C] flex items-center gap-2 font-bold ml-1"><MessageSquare size={12} /> Notas Especiais</label>
                  <textarea rows={3} value={bookingData.notes} onChange={(e) => setBookingData({...bookingData, notes: e.target.value})} placeholder="Ex: Mesa perto da janela, kit de pintura extra..." className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm resize-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 pt-2 animate-in zoom-in-95 duration-500 pb-12">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-100"><Check size={32} /></div>
            <div className="space-y-1">
              <h2 className="serif text-3xl text-[#8D7B68]">Quase Lá</h2>
              <p className="text-[#A4907C] text-[10px] uppercase tracking-[0.3em] font-black">Registo das Peças Pintadas</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-left flex gap-3">
              <AlertCircle size={18} className="text-amber-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Atenção Craft</p>
                <p className="text-[11px] text-amber-700 leading-tight">Para não perderes a tua obra após o forno, tira uma foto de cada peça agora.</p>
              </div>
            </div>

            <div className="relative bg-white border-2 border-[#8D7B68]/20 rounded-[32px] p-6 shadow-sm">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#A4907C] font-bold">ID Único do Pedido</p>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    <span className="serif text-4xl text-[#8D7B68] font-bold tracking-tighter">{orderId}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   {pieceTags.map((tag, i) => (
                     <div key={tag} className="bg-[#FDFBF7] border border-[#F1E9E0] p-3 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#F1E9E0] overflow-hidden flex items-center justify-center text-[#8D7B68]">
                            {paintedImages[tag] ? (
                              <img src={paintedImages[tag]} className="w-full h-full object-cover" alt="Sua pintura" />
                            ) : (
                              <Tag size={16} />
                            )}
                          </div>
                          <div className="text-left">
                            <span className="text-[11px] font-mono font-bold text-[#8D7B68] block leading-none">{tag}</span>
                            <span className="text-[9px] text-[#A4907C] italic">{selectedPieces[i].name}</span>
                          </div>
                       </div>
                       <button 
                         onClick={() => handleCapturePhoto(tag)}
                         className={`p-2.5 rounded-xl transition-all ${paintedImages[tag] ? 'bg-green-100 text-green-600' : 'bg-[#8D7B68] text-white active:scale-90 shadow-sm'}`}
                       >
                         {paintedImages[tag] ? <Check size={16} /> : <Camera size={16} />}
                       </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)} 
              className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all hover:bg-[#746455]"
            >
              Finalizar & Guardar
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in zoom-in-95 duration-700 text-center pb-12">
            {/* Success Animation Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#8D7B68]/10 rounded-full animate-ping duration-[2000ms]" />
              <div className="relative w-24 h-24 bg-white border-4 border-[#8D7B68] rounded-full flex items-center justify-center text-[#8D7B68] shadow-xl">
                 <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-bounce" size={24} />
                 <Check size={48} strokeWidth={3} className="animate-in slide-in-from-bottom-2" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="serif text-4xl text-[#8D7B68]">Tudo pronto!</h2>
              <p className="text-[#A4907C] text-sm max-w-[280px] mx-auto leading-relaxed">
                A tua reserva foi registada com sucesso. Já podes relaxar, o resto é connosco!
              </p>
            </div>

            {/* Receipt Card */}
            <div className="w-full bg-white rounded-3xl border border-[#F1E9E0] shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 bg-[#FDFBF7] border-b border-dashed border-[#F1E9E0] space-y-4">
                 <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#A4907C]">
                    <span>Ticket Digital</span>
                    <span className="text-[#8D7B68]">{orderId}</span>
                 </div>
                 <div className="flex gap-4 items-center justify-center">
                    {pieceTags.map(tag => (
                      <div key={tag} className="w-12 h-12 rounded-xl bg-[#F1E9E0] overflow-hidden border border-white shadow-sm">
                         {paintedImages[tag] ? (
                           <img src={paintedImages[tag]} className="w-full h-full object-cover" alt="Ref" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-[#A4907C]"><Hash size={16} /></div>
                         )}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#A4907C] tracking-widest">Data</p>
                      <p className="text-sm font-semibold text-[#8D7B68]">{bookingData.date || 'Hoje'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#A4907C] tracking-widest">Hora</p>
                      <p className="text-sm font-semibold text-[#8D7B68]">{bookingData.time || '14:30'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 pt-2 text-[#A4907C]">
                    <Share2 size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Partilhar Recibo</span>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full space-y-3">
              <button 
                onClick={() => window.location.reload()} // Em uma app real, trocaria a tab ativa aqui
                className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                Ver no meu Perfil <ArrowRight size={18} />
              </button>
              <button 
                onClick={resetFlow}
                className="w-full bg-white border border-[#F1E9E0] text-[#A4907C] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                Nova Criação
              </button>
            </div>
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="fixed bottom-24 left-6 right-6 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-4">
          <button 
            disabled={(step === 1 && selectedPieces.length === 0) || (step === 2 && (!bookingData.date || !bookingData.time))}
            onClick={handleNext}
            className="w-full bg-[#8D7B68] text-white p-5 rounded-3xl font-bold shadow-2xl flex items-center justify-between disabled:opacity-50 transition-all hover:bg-[#746455]"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-70 uppercase tracking-widest mb-1">Custo Estimado</span>
              <span className="text-lg">{totalPrice.toLocaleString()} MT</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
              {step === 1 ? 'Seguinte' : 'Confirmar Reserva'} <ChevronRight size={18} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveView;
