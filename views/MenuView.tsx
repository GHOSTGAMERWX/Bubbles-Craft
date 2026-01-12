
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants.tsx';
import { Sparkles } from 'lucide-react';

const MenuView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  
  const categories = ['Todos', 'Cafés Especiais', 'Bebidas Quentes', 'Bebidas Frias', 'Snacks & Doces'];
  const filteredItems = activeCategory === 'Todos' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <h2 className="serif text-3xl text-[#8D7B68]">O Nosso Menu</h2>
        <p className="text-sm text-[#A4907C]">Sabores que abraçam e confortam.</p>
      </header>

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-[#8D7B68] text-white shadow-md' : 'bg-white text-[#A4907C] border border-[#F1E9E0]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-[#F1E9E0] shadow-sm relative overflow-hidden">
            {item.isNew && (
              <div className="absolute top-0 right-0 bg-[#C8B6A6] text-white text-[9px] px-2 py-1 font-bold uppercase tracking-tighter rounded-bl-lg flex items-center gap-1">
                <Sparkles size={8} /> Novo
              </div>
            )}
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-[#8D7B68]">{item.name}</h4>
                <span className="text-sm font-medium text-[#A4907C]">{item.price.toLocaleString()} MT</span>
              </div>
              <p className="text-[11px] text-[#A4907C] mt-1 leading-tight">{item.description}</p>
              <div className="flex items-center gap-1 mt-2">
                 <div className={`w-2 h-2 rounded-full ${item.category === 'Cafés Especiais' ? 'bg-amber-800' : 'bg-green-200'}`} />
                 <span className="text-[9px] uppercase tracking-widest text-[#C8B6A6]">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-[#F1E9E0]/40 p-6 rounded-3xl border border-dashed border-[#C8B6A6] text-center space-y-2">
        <h4 className="serif text-[#8D7B68] text-lg">Happy Hour Criativo</h4>
        <p className="text-xs text-[#A4907C]">Todas as quartas: Na reserva de uma peça grande, o teu Latte é por nossa conta!</p>
      </div>
    </div>
  );
};

export default MenuView;
