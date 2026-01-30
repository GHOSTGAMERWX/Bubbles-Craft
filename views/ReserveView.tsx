
import React, { useState, useRef } from 'react';
import { PIECES } from '../constants.tsx';
import { Piece } from '../types';
import { Check, UserCheck, Camera, AlertCircle, Tag } from 'lucide-react';

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

  return (
    <div className="relative min-h-full pb-32">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} capture="environment" />
      
      <div className="p-6 space-y-8">
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
                    className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${isSelected ? 'border-[#8D7B68] shadow-sm' : 'border-transparent'}`}
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
            
            <button 
              disabled={selectedPieces.length === 0}
              onClick={handleNext}
              className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold shadow-lg disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#8D7B68]">2. Detalhes</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-3xl border border-[#F1E9E0] flex items-center gap-4">
                <UserCheck size={24} className="text-[#8D7B68]" />
                <div>
                  <p className="text-sm font-bold text-[#8D7B68]">{bookingData.name}</p>
                  <p className="text-[11px] text-[#A4907C]">{bookingData.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#A4907C]">Data</label>
                  <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#A4907C]">Hora</label>
                  <select value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} className="w-full bg-white border border-[#F1E9E0] p-4 rounded-2xl text-sm">
                    <option value="">Escolher</option>
                    <option value="10:00">10:00</option>
                    <option value="14:30">14:30</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              disabled={!bookingData.date || !bookingData.time}
              onClick={handleNext}
              className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold"
            >
              Confirmar Reserva
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <h2 className="serif text-2xl text-[#8D7B68]">Registo das Peças</h2>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-left flex gap-3">
              <AlertCircle size={18} className="text-amber-600 shrink-0" />
              <p className="text-[11px] text-amber-700">Tira uma foto de cada peça agora para o rastreio.</p>
            </div>

            <div className="space-y-4">
               {pieceTags.map((tag) => (
                 <div key={tag} className="bg-white border border-[#F1E9E0] p-4 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F1E9E0] overflow-hidden flex items-center justify-center">
                        {paintedImages[tag] ? <img src={paintedImages[tag]} className="w-full h-full object-cover" alt="Peça pintada" /> : <Tag size={16} />}
                      </div>
                      <span className="text-sm font-bold text-[#8D7B68]">{tag}</span>
                   </div>
                   <button onClick={() => handleCapturePhoto(tag)} className="p-2 bg-[#8D7B68] text-white rounded-xl">
                     <Camera size={16} />
                   </button>
                 </div>
               ))}
            </div>

            <button onClick={() => setStep(4)} className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold">
              Finalizar
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
               <Check size={40} />
            </div>
            <div>
              <h2 className="serif text-3xl text-[#8D7B68]">Tudo pronto!</h2>
              <p className="text-[#A4907C] text-sm mt-2">A tua reserva foi registada com sucesso.</p>
            </div>
            <button onClick={resetFlow} className="text-[#8D7B68] font-bold text-sm uppercase">Fazer nova reserva</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveView;
