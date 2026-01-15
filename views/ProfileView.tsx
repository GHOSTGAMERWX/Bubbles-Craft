
import React, { useState } from 'react';
import { MOCK_RESERVATIONS, PIECES, MOCK_HISTORY } from '../constants.tsx';
import { ReservationStatus } from '../types';
import { Bell, Package, LogOut, Settings, Camera, ChevronLeft, User as UserIcon, Shield, Check, Heart } from 'lucide-react';

type ProfileSubView = 'main' | 'history' | 'settings' | 'user-gallery';

interface ProfileViewProps {
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [subView, setSubView] = useState<ProfileSubView>('main');
  const [notifications, setNotifications] = useState(true);

  // Mock de fotos postadas pela Maria
  const [userPhotos] = useState([
    { id: 'up1', url: 'https://images.unsplash.com/photo-1525974738370-013ae11ca9c1?auto=format&fit=crop&q=80&w=400', likes: 84 },
    { id: 'up2', url: 'https://images.unsplash.com/photo-1563240381-5ccf7690ca08?auto=format&fit=crop&q=80&w=400', likes: 126 },
    { id: 'up3', url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400', likes: 45 },
    { id: 'up4', url: 'https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80&w=400', likes: 210 },
  ]);

  const renderMain = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-6 p-6 pb-0">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" alt="User avatar" />
          <button className="absolute bottom-0 right-0 bg-[#8D7B68] text-white p-1.5 rounded-full border-2 border-white shadow-sm active:scale-90 transition-transform">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <h2 className="serif text-2xl text-[#8D7B68]">Olá, Maria</h2>
          <p className="text-xs text-[#A4907C]">Membro Criativo desde 2023</p>
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* Status Trackers */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="serif text-xl text-[#8D7B68]">Peças em Curso</h3>
            <button onClick={() => setNotifications(!notifications)} className="relative">
               <Bell size={20} className={notifications ? 'text-[#8D7B68]' : 'text-[#C8B6A6]'} />
               {notifications && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border border-white" />}
            </button>
          </div>
          
          <div className="space-y-4">
            {MOCK_RESERVATIONS.map(res => {
              const piece = PIECES.find(p => p.id === res.pieceId);
              return (
                <div key={res.id} className="bg-white p-4 rounded-2xl border border-[#F1E9E0] space-y-3 shadow-sm">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <img src={piece?.image} className="w-12 h-12 rounded-lg object-cover" alt={piece?.name} />
                      <div>
                        <h4 className="text-sm font-semibold text-[#8D7B68]">{piece?.name}</h4>
                        <p className="text-[10px] text-[#A4907C]">Reservado em {res.date}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] h-max px-2 py-1 rounded-full font-bold uppercase tracking-tighter ${
                      res.status === ReservationStatus.READY ? 'bg-green-100 text-green-700' : 
                      res.status === ReservationStatus.DRYING ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {res.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#F1E9E0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#8D7B68] transition-all duration-1000" 
                        style={{ width: res.status === ReservationStatus.READY ? '100%' : res.status === ReservationStatus.DRYING ? '66%' : '33%' }} 
                      />
                    </div>
                    <p className="text-[9px] text-[#A4907C] text-right">
                      {res.status === ReservationStatus.READY ? 'Já podes levantar!' : 'A secar ao teu ritmo...'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* User Posted Photos Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="serif text-xl text-[#8D7B68]">A Minha Galeria</h3>
            <button 
              onClick={() => setSubView('user-gallery')}
              className="text-[10px] uppercase font-bold text-[#A4907C] tracking-widest hover:text-[#8D7B68] transition-colors"
            >
              Ver Todas
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {userPhotos.slice(0, 4).map(photo => (
              <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-[#F1E9E0]">
                <img src={photo.url} className="w-full h-full object-cover" alt="Minha obra" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1 text-white scale-75">
                    <Heart size={14} className="fill-current" />
                    <span className="text-xs font-bold">{photo.likes}</span>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm px-1 rounded flex items-center gap-0.5 shadow-sm group-hover:hidden">
                  <Heart size={8} className="text-red-500 fill-current" />
                  <span className="text-[8px] font-bold text-[#8D7B68]">{photo.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Options */}
        <section className="space-y-3 pt-2">
          <ProfileOption 
            icon={<Package size={18} />} 
            label="Histórico de Reservas" 
            onClick={() => setSubView('history')}
          />
          <ProfileOption 
            icon={<Settings size={18} />} 
            label="Definições da Conta" 
            onClick={() => setSubView('settings')}
          />
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-5 bg-red-50/50 text-red-600 rounded-2xl mt-6 active:bg-red-50 transition-colors border border-red-100"
          >
            <div className="flex items-center gap-4">
              <LogOut size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Sair da Conta</span>
            </div>
          </button>
        </section>

        <div className="p-8 bg-[#FDFBF7] border border-[#F1E9E0] rounded-[32px] text-center space-y-3 mb-10 shadow-sm">
           <Heart size={20} className="mx-auto text-[#C8B6A6]" fill="currentColor" />
           <p className="text-xs text-[#A4907C] italic leading-relaxed">"O barro recorda as tuas mãos, a cor recorda a tua alma."</p>
        </div>
      </div>
    </div>
  );

  const renderUserGallery = () => (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
      <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-[#A4907C] mb-4">
        <ChevronLeft size={20} /> <span className="text-sm uppercase font-bold tracking-widest">Voltar</span>
      </button>
      <header>
        <h2 className="serif text-3xl text-[#8D7B68]">A Minha Galeria</h2>
        <p className="text-sm text-[#A4907C]">Teus momentos criativos capturados.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {userPhotos.map(photo => (
          <div key={photo.id} className="relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-sm border border-[#F1E9E0] bg-white">
            <img src={photo.url} className="w-full h-full object-cover" alt="Postada por mim" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/85 backdrop-blur-sm rounded-xl flex justify-between items-center shadow-sm border border-white/40">
              <div className="flex items-center gap-1">
                <Heart size={12} className="text-red-500 fill-current" />
                <span className="text-[10px] font-bold text-[#8D7B68]">{photo.likes} curtidas</span>
              </div>
              <span className="text-[8px] uppercase tracking-widest text-[#A4907C] font-bold">Publicado</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
      <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-[#A4907C] mb-4">
        <ChevronLeft size={20} /> <span className="text-sm uppercase font-bold tracking-widest">Voltar</span>
      </button>
      <header>
        <h2 className="serif text-3xl text-[#8D7B68]">Histórico</h2>
        <p className="text-sm text-[#A4907C]">Tuas criações eternizadas.</p>
      </header>

      <div className="space-y-4">
        {MOCK_HISTORY.map(item => {
          const piece = PIECES.find(p => p.id === item.pieceId);
          return (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#F1E9E0] flex items-center justify-between shadow-sm">
              <div className="flex gap-4 items-center">
                <img src={piece?.image} className="w-16 h-16 rounded-xl object-cover grayscale opacity-80" alt={piece?.name} />
                <div>
                  <h4 className="font-semibold text-[#8D7B68]">{piece?.name}</h4>
                  <p className="text-[10px] text-[#A4907C] uppercase font-bold tracking-wider">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#8D7B68]">{item.price} MT</p>
                <div className="flex items-center gap-1 text-[9px] text-green-600 uppercase font-bold">
                  <Check size={10} /> Concluída
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300">
      <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-[#A4907C] mb-4">
        <ChevronLeft size={20} /> <span className="text-sm uppercase font-bold tracking-widest">Voltar</span>
      </button>
      <header>
        <h2 className="serif text-3xl text-[#8D7B68]">Definições</h2>
        <p className="text-sm text-[#A4907C]">Personaliza a tua experiência.</p>
      </header>

      <div className="space-y-2">
        <div className="bg-white rounded-3xl border border-[#F1E9E0] overflow-hidden divide-y divide-[#F1E9E0]">
          <div className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <UserIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#8D7B68]">Perfil Pessoal</p>
                <p className="text-[10px] text-[#A4907C]">Maria, maria@bubbles.com</p>
              </div>
            </div>
            <ChevronLeft size={16} className="rotate-180 text-[#C8B6A6]" />
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <Shield size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#8D7B68]">Privacidade & Segurança</p>
                <p className="text-[10px] text-[#A4907C]">Controla os teus dados</p>
              </div>
            </div>
            <ChevronLeft size={16} className="rotate-180 text-[#C8B6A6]" />
          </div>
        </div>
      </div>
    </div>
  );

  switch (subView) {
    case 'history': return renderHistory();
    case 'settings': return renderSettings();
    case 'user-gallery': return renderUserGallery();
    default: return renderMain();
  }
};

const ProfileOption: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 bg-white border border-[#F1E9E0] rounded-2xl hover:bg-[#FBF9F4] active:bg-[#F1E9E0] transition-colors shadow-sm"
  >
    <div className="flex items-center gap-4 text-[#8D7B68]">
      <div className="w-8 h-8 rounded-lg bg-[#F1E9E0]/50 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className="w-6 h-6 rounded-full bg-[#F1E9E0]/50 flex items-center justify-center text-[#8D7B68]">
      <ChevronLeft size={14} className="rotate-180" />
    </div>
  </button>
);

export default ProfileView;
