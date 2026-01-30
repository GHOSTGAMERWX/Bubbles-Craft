
import React, { useState, useEffect } from 'react';
import { Home, Palette, Image as ImageIcon, Coffee, User } from 'lucide-react';
import { TabType } from './types';
import HomeView from './views/HomeView';
import ReserveView from './views/ReserveView';
import GalleryView from './views/GalleryView';
import MenuView from './views/MenuView';
import ProfileView from './views/ProfileView';
import AuthView from './views/AuthView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Carregamento simples inicial
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 mb-4 rounded-full border-2 border-[#8D7B68] flex items-center justify-center animate-pulse">
           <span className="serif text-xl text-[#8D7B68]">B&C</span>
        </div>
        <h1 className="serif text-2xl text-[#8D7B68]">Bubbles & Craft</h1>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AuthView onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView onNavigate={setActiveTab} />;
      case 'reserve': return <ReserveView />;
      case 'gallery': return <GalleryView />;
      case 'menu': return <MenuView />;
      case 'profile': return <ProfileView onLogout={() => setIsLoggedIn(false)} />;
      default: return <HomeView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col max-w-md mx-auto shadow-2xl relative">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-sm border-t border-[#F1E9E0] h-20 flex justify-around items-center px-4 z-50">
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
