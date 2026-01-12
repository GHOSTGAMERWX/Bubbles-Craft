
import React from 'react';
import { GALLERY_IMAGES } from '../constants.tsx';
import { Camera, Heart } from 'lucide-react';

const GalleryView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <h2 className="serif text-3xl text-[#8D7B68]">Inspira-te</h2>
        <p className="text-sm text-[#A4907C]">Um toque de cor, uma pitada de criatividade.</p>
      </header>

      {/* Hero Gallery Piece */}
      <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-neutral-100 shadow-xl">
        <img src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Featured art" />
        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg">
          <div>
            <p className="text-[10px] uppercase text-[#8D7B68] font-bold">Obra da Semana</p>
            <p className="serif text-lg text-[#8D7B68]">Vaso Terracota Dreams</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-400 shadow-sm">
            <Heart size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="pt-4">
         <h3 className="serif text-xl text-[#8D7B68]">Nossos Clientes</h3>
      </div>

      {/* Masonry-like Grid */}
      <div className="grid grid-cols-2 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className={`rounded-2xl overflow-hidden shadow-sm ${i % 3 === 0 ? 'row-span-2' : ''}`}>
            <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt={`Gallery ${i}`} />
          </div>
        ))}
      </div>

      <div className="text-center py-10 opacity-50 italic text-sm text-[#A4907C]">
        "Inspirado pelos nossos incríveis clientes"
      </div>
    </div>
  );
};

export default GalleryView;
