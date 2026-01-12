
import React from 'react';
import { TabType } from '../types';
import { ChevronRight, Sparkles, Coffee, Paintbrush, Heart, Clock } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: TabType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative h-[480px] flex flex-col justify-between p-8 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Ceramic painting studio" 
          />
          {/* Subtle top gradient for logo visibility and stronger bottom gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A3F35]/50 via-transparent to-[#4A3F35]/90" />
        </div>
        
        {/* Top Logo & Slogan - Blended with background */}
        <div className="relative z-10 text-center pt-2">
          <h2 className="serif text-2xl tracking-tight text-white/95">Bubbles & Craft</h2>
          <p className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-medium mt-1">Artesanal & Aconchegante</p>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-4 pb-4">
          <div className="bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/30">
            <p className="text-[10px] font-bold uppercase tracking-widest">Seu refúgio criativo</p>
          </div>
          <h1 className="serif text-5xl leading-tight">Momentos que ganham forma.</h1>
          <p className="text-white/80 text-sm max-w-[280px]">
            Um café, um pincel e a sua imaginação. Descubra a experiência Bubbles & Craft.
          </p>
          <button 
            onClick={() => onNavigate('reserve')}
            className="bg-white text-[#8D7B68] px-8 py-4 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 active:scale-95 transition-transform"
          >
            Começar Experiência <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* A Jornada Bubbles & Craft */}
      <section className="px-6 py-12 space-y-10">
        <div className="text-center">
          <h2 className="serif text-3xl text-[#8D7B68]">Como funciona</h2>
          <div className="w-12 h-1 bg-[#C8B6A6] mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-12">
          {/* Passo 1 */}
          <JourneyStep 
            number="01"
            title="Escolha a sua peça"
            description="De canecas cozy a vasos elegantes. O primeiro passo é encontrar a tela de cerâmica que mais combina com você."
            icon={<Paintbrush size={20} />}
            image="https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=400"
            onClick={() => onNavigate('reserve')}
          />

          {/* Passo 2 */}
          <JourneyStep 
            number="02"
            title="Inspira-te com cores"
            description="Mergulhe em um universo variado de cores e pigmentos. Temos tudo o que você precisa para dar vida à sua visão."
            icon={<Sparkles size={20} />}
            image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400"
            onClick={() => onNavigate('gallery')}
            reverse
          />

          {/* Passo 3 */}
          <JourneyStep 
            number="03"
            title="Sabor em cada traço"
            description="Faça a tua ordem a partir do nosso menu artesanal. Um bom café é o melhor combustível para a criatividade."
            icon={<Coffee size={20} />}
            image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=400"
            onClick={() => onNavigate('menu')}
          />

          {/* Passo 4 */}
          <JourneyStep 
            number="04"
            title="Nós eternizamos"
            description="Deixe a peça connosco. Iremos eternizar a tua obra de arte no forno e avisaremos assim que estiver pronta para a recolha."
            icon={<Clock size={20} />}
            image="https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=400"
            onClick={() => onNavigate('profile')}
            reverse
          />
        </div>
      </section>

      {/* Footer / Quote */}
      <section className="px-8 pb-16">
        <div className="bg-white p-10 rounded-[40px] border border-[#F1E9E0] text-center shadow-sm">
          <Heart className="mx-auto text-[#C8B6A6] mb-4" fill="currentColor" size={24} />
          <p className="serif text-xl text-[#8D7B68] italic">
            "Não é apenas sobre a cerâmica, é sobre o tempo que você dedica a si mesmo."
          </p>
        </div>
      </section>
    </div>
  );
};

const JourneyStep: React.FC<{ 
  number: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  image: string;
  onClick: () => void;
  reverse?: boolean;
}> = ({ number, title, description, icon, image, onClick, reverse }) => (
  <div className={`flex items-center gap-6 ${reverse ? 'flex-row-reverse' : ''}`} onClick={onClick}>
    <div className="flex-1 space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-light text-[#C8B6A6] opacity-50">{number}</span>
        <div className="w-8 h-8 rounded-full bg-[#F1E9E0] flex items-center justify-center text-[#8D7B68]">
          {icon}
        </div>
      </div>
      <h3 className="serif text-xl text-[#8D7B68] leading-tight">{title}</h3>
      <p className="text-xs text-[#A4907C] leading-relaxed">
        {description}
      </p>
    </div>
    <div className="w-32 h-40 rounded-[24px] overflow-hidden shadow-lg border-4 border-white active:scale-95 transition-transform cursor-pointer">
      <img src={image} className="w-full h-full object-cover" alt={title} />
    </div>
  </div>
);

export default HomeView;
