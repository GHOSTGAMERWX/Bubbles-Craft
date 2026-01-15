
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants.tsx';
import { Sparkles, ChevronDown, Coffee, UtensilsCrossed } from 'lucide-react';

type MainTab = 'Comidas' | 'Bebidas';

const MenuView: React.FC = () => {
  const [mainTab, setMainTab] = useState<MainTab>('Comidas');
  const [activeCategory, setActiveCategory] = useState<string>(mainTab === 'Comidas' ? 'Entradas' : 'Cafés');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const foodCategories = ['Entradas', 'Principal', 'Pizzas'];
  const drinkCategories = ['Cafés', 'Bubbles', 'Artesanais', 'Cervejas'];
  
  const categories = mainTab === 'Comidas' ? foodCategories : drinkCategories;
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleMainTabChange = (tab: MainTab) => {
    setMainTab(tab);
    setActiveCategory(tab === 'Comidas' ? 'Entradas' : 'Cafés');
    setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 min-h-screen pb-32">
      <header className="text-center space-y-2">
        <h2 className="serif text-4xl text-[#8D7B68]">Sabor Artesanal</h2>
        <p className="text-[10px] text-[#A4907C] uppercase tracking-[0.2em] font-bold">Curadoria Bubbles & Craft</p>
      </header>

      {/* Main Switch: Comidas vs Bebidas */}
      <div className="flex bg-[#F1E9E0]/50 p-1.5 rounded-2xl border border-[#F1E9E0]">
        <button 
          onClick={() => handleMainTabChange('Comidas')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            mainTab === 'Comidas' 
              ? 'bg-white text-[#8D7B68] shadow-sm' 
              : 'text-[#A4907C]'
          }`}
        >
          <UtensilsCrossed size={16} /> Comidas
        </button>
        <button 
          onClick={() => handleMainTabChange('Bebidas')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            mainTab === 'Bebidas' 
              ? 'bg-white text-[#8D7B68] shadow-sm' 
              : 'text-[#A4907C]'
          }`}
        >
          <Coffee size={16} /> Bebidas
        </button>
      </div>

      {/* Sub-Categories Tabs */}
      <div className="flex justify-start gap-4 overflow-x-auto no-scrollbar border-b border-[#F1E9E0] pb-0.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setExpandedId(null);
            }}
            className={`px-4 py-3 text-[11px] uppercase tracking-widest font-bold whitespace-nowrap transition-all relative ${
              activeCategory === cat 
                ? 'text-[#8D7B68]' 
                : 'text-[#C8B6A6]'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8D7B68]" />
            )}
          </button>
        ))}
      </div>

      {/* Menu List - Minimalist Style */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div 
              key={item.id} 
              className="group cursor-pointer bg-white rounded-2xl border border-[#F1E9E0] transition-all hover:border-[#8D7B68]/30 shadow-sm"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className={`serif text-lg transition-colors ${expandedId === item.id ? 'text-[#8D7B68]' : 'text-[#4A3F35]'}`}>
                    {item.name}
                  </h4>
                  {item.isNew && (
                    <span className="bg-[#C8B6A6] text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter animate-pulse">
                      Novo
                    </span>
                  )}
                </div>
                <ChevronDown 
                  size={18} 
                  className={`text-[#C8B6A6] transition-transform duration-300 ${expandedId === item.id ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {/* Expandable Description */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedId === item.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-[#A4907C] leading-relaxed italic border-t border-[#FDFBF7] pt-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-[#A4907C] italic text-sm">
            Novidades a caminho desta categoria...
          </div>
        )}
      </div>

      {/* Note for Experience */}
      <div className="pt-8 text-center pb-12">
        <div className="inline-block p-1 rounded-full bg-[#F1E9E0]/30">
          <div className="px-8 py-10 rounded-full border border-dashed border-[#C8B6A6] space-y-3 bg-white/50 backdrop-blur-sm shadow-inner">
            <Sparkles size={16} className="mx-auto text-[#C8B6A6]" />
            <p className="text-[10px] text-[#A4907C] uppercase tracking-[0.3em] font-black">Bubbles & Craft</p>
            <p className="text-[11px] text-[#8D7B68] max-w-[220px] mx-auto leading-relaxed font-medium">
              Ingredientes frescos, processos manuais e muito amor em cada preparação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
