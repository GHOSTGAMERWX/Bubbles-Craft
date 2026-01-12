
import React, { useState, useEffect } from 'react';
import { Home, Palette, Image as ImageIcon, Coffee, User } from 'lucide-react';
import { TabType } from './types';
import HomeView from './views/HomeView';
import ReserveView from './views/ReserveView';
import GalleryView from './views/GalleryView';
import MenuView from './views/MenuView';
import ProfileView from './views/ProfileView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 20, 100);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 mb-8 rounded-full border-2 border-[#8D7B68] flex items-center justify-center animate-pulse">
           <span className="serif text-3xl text-[#8D7B68]">B&C</span>
        </div>
        <h1 className="serif text-3xl text-[#8D7B68] mb-2">Bubbles & Craft</h1>
        <p className="text-[10px] text-[#A4907C] uppercase tracking-[0.3em] mb-12">Artesanal & Aconchegante</p>
        
        <div className="w-48 h-1 bg-[#F1E9E0] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8D7B68] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-[10px] text-[#C8B6A6] italic uppercase">Aquecendo o forno...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView onNavigate={setActiveTab} />;
      case 'reserve': return <ReserveView />;
      case 'gallery': return <GalleryView />;
      case 'menu': return <MenuView />;
      case 'profile': return <ProfileView />;
      default: return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col max-w-md mx-auto shadow-2xl relative">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-lg border-t border-[#F1E9E0] h-20 flex justify-around items-center px-4 z-50">
        <NavButton 
          active={activeTab === 'home'} 
          icon={<Home size={22} />} 
          label="Início" 
          onClick={() => setActiveTab('home')} 
        />
        <NavButton 
          active={activeTab === 'reserve'} 
          icon={<Palette size={22} />} 
          label="Reservar" 
          onClick={() => setActiveTab('reserve')} 
        />
        <NavButton 
          active={activeTab === 'gallery'} 
          icon={<ImageIcon size={22} />} 
          label="Galeria" 
          onClick={() => setActiveTab('gallery')} 
        />
        <NavButton 
          active={activeTab === 'menu'} 
          icon={<Coffee size={22} />} 
          label="Menu" 
          onClick={() => setActiveTab('menu')} 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          icon={<User size={22} />} 
          label="Perfil" 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#8D7B68]' : 'text-[#A4907C]'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
