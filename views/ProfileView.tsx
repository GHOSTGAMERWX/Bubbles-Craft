
import React, { useState } from 'react';
import { MOCK_RESERVATIONS, PIECES, MOCK_HISTORY } from '../constants.tsx';
import { ReservationStatus } from '../types';
import { Bell, Package, LogOut, Settings, Camera, ChevronLeft, User as UserIcon, Shield, Heart, Hash, Tag, Info, MoreVertical, Trash2, ImageIcon, AlertTriangle, X } from 'lucide-react';

type ProfileSubView = 'main' | 'history' | 'settings' | 'user-gallery';

interface ProfileViewProps {
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [subView, setSubView] = useState<ProfileSubView>('main');
  const [notifications, setNotifications] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const [userPhotos, setUserPhotos] = useState([
    { id: 'up1', url: 'https://images.unsplash.com/photo-1525974738370-013ae11ca9c1?auto=format&fit=crop&q=80&w=400', likes: 84 },
    { id: 'up2', url: 'https://images.unsplash.com/photo-1563240381-5ccf7690ca08?auto=format&fit=crop&q=80&w=400', likes: 126 },
    { id: 'up3', url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400', likes: 45 },
    { id: 'up4', url: 'https://images.unsplash.com/photo-1473186578172-c141e6798ee4?auto=format&fit=crop&q=80&w=400', likes: 210 },
  ]);

  const handleDeletePhoto = () => {
    if (photoToDelete) {
      setUserPhotos(prev => prev.filter(p => p.id !== photoToDelete));
      setPhotoToDelete(null);
      setActiveMenu(null);
    }
  };

  const renderPhotoItem = (photo: any, isLarge: boolean = false) => (
    <div key={photo.id} className={`relative rounded-xl overflow-hidden shadow-sm border border-[#F1E9E0] group animate-in zoom-in-95 duration-300 ${isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
      <img src={photo.url} className="w-full h-full object-cover" alt="Obra" />
      
      {/* Menu Trigger - Now consistently visible with a subtle background */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setActiveMenu(activeMenu === photo.id ? null : photo.id);
        }}
        className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md text-white rounded-full transition-all active:scale-90 z-10"
      >
        <MoreVertical size={14} />
      </button>

      {/* Menu Dropdown */}
      {activeMenu === photo.id && (
        <div className="absolute top-10 right-2 bg-white border border-[#F1E9E0] rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 min-w-[140px]">
          <button 
            onClick={() => {
              setPhotoToDelete(photo.id);
              setActiveMenu(null);
            }}
            className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-colors text-left"
          >
            <Trash2 size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Eliminar Obra</span>
          </button>
        </div>
      )}

      {/* Confirmation Overlay */}
      {photoToDelete === photo.id && (
        <div className="absolute inset-0 bg-[#8D7B68]/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in duration-300">
          <AlertTriangle size={24} className="text-white mb-1" />
          <p className="text-[10px] text-white font-bold uppercase tracking-widest leading-tight">Eliminar permanentemente?</p>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => setPhotoToDelete(null)}
              className="flex-1 bg-white/20 text-white py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/30"
            >
              Não
            </button>
            <button 
              onClick={handleDeletePhoto}
              className="flex-1 bg-white text-red-600 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg"
            >
              Sim
            </button>
          </div>
        </div>
      )}

      {isLarge && !photoToDelete && (
        <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-xl flex items-center gap-1 shadow-sm border border-white/40">
          <Heart size={10} className="text-red-500 fill-current" />
          <span className="text-[10px] font-bold text-[#8D7B68]">{photo.likes}</span>
        </div>
      )}
    </div>
  );

  const renderMain = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12" onClick={() => { setActiveMenu(null); setPhotoToDelete(null); }}>
      <header className="flex items-center gap-6 p-6 pb-0">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" alt="User avatar" />
          <button className="absolute bottom-0 right-0 bg-[#8D7B68] text-white p-1.5 rounded-full border-2 border-white shadow-sm active:scale-90 transition-transform">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <h2 className="serif text-2xl text-[#8D7B68]">Olá, Maria</h2>
        </div>
      </header>

      <div className="px-6 space-y-8">
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-[#F1E9E0] pb-2">
            <h3 className="serif text-xl text-[#8D7B68]">Rastreio de Obras</h3>
            <button onClick={() => setNotifications(!notifications)} className="relative p-1">
               <Bell size={20} className={notifications ? 'text-[#8D7B68]' : 'text-[#C8B6A6]'} />
               {notifications && <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-white" />}
            </button>
          </div>
          
          <div className="space-y-6">
            {MOCK_RESERVATIONS.map(res => (
              <div key={res.id} className="bg-white p-5 rounded-[32px] border border-[#F1E9E0] space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#F1E9E0]/50 rounded-xl text-[#8D7B68]"><Hash size={16} /></div>
                    <span className="text-sm font-bold text-[#8D7B68]">{res.id}</span>
                  </div>
                  <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest ${
                    res.status === ReservationStatus.READY ? 'bg-green-50 text-green-700 border border-green-100' : 
                    res.status === ReservationStatus.DRYING ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-gray-50 text-gray-700 border border-gray-100'
                  }`}>
                    {res.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#A4907C] font-black pl-1">Peças em Processo</p>
                  {res.pieceIds.map((pid, idx) => (
                    <div key={pid} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#F1E9E0]/50 rounded-xl overflow-hidden flex items-center justify-center border border-[#F1E9E0]">
                           <ImageIcon size={14} className="text-[#C8B6A6]" />
                        </div>
                        <div>
                          <p className="text-[11px] font-mono font-bold text-[#8D7B68] leading-none">{pid}</p>
                          <p className="text-[10px] text-[#A4907C] leading-none mt-1">{res.pieceNames[idx]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] uppercase tracking-widest text-[#A4907C] font-bold mb-1">Status</p>
                         <div className="h-1.5 w-16 bg-[#F1E9E0] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#8D7B68]" 
                              style={{ width: res.status === ReservationStatus.READY ? '100%' : '40%' }} 
                            />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#FDFBF7] bg-[#FDFBF7]/50 -mx-5 -mb-5 p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[9px] text-[#A4907C]">
                    <Info size={10} />
                    <span>Referência Visual: <b>Pintada pelo Cliente</b></span>
                  </div>
                  <p className="text-[9px] text-[#C8B6A6] italic uppercase tracking-wider">
                    Agendado para: {res.date} • {res.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="serif text-xl text-[#8D7B68]">Meu Portfólio</h3>
            <button onClick={() => setSubView('user-gallery')} className="text-[10px] uppercase font-bold text-[#A4907C] tracking-widest">
              Ver Tudo
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {userPhotos.slice(0, 4).map(photo => renderPhotoItem(photo))}
          </div>
        </section>

        <section className="space-y-3 pt-2">
          <ProfileOption icon={<Package size={18} />} label="Histórico de Criações" onClick={() => setSubView('history')} />
          <ProfileOption icon={<Settings size={18} />} label="Definições & Privacidade" onClick={() => setSubView('settings')} />
          <button onClick={onLogout} className="w-full flex items-center justify-between p-5 bg-red-50/30 text-red-600 rounded-2xl mt-6 border border-red-100 transition-colors">
            <div className="flex items-center gap-4">
              <LogOut size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Sair</span>
            </div>
          </button>
        </section>
      </div>
    </div>
  );

  const renderUserGallery = () => (
    <div className="p-6 space-y-6 animate-in slide-in-from-right duration-300" onClick={() => { setActiveMenu(null); setPhotoToDelete(null); }}>
      <button onClick={() => setSubView('main')} className="flex items-center gap-2 text-[#A4907C] mb-4">
        <ChevronLeft size={20} /> <span className="text-sm uppercase font-bold tracking-widest">Voltar</span>
      </button>
      <header>
        <h2 className="serif text-3xl text-[#8D7B68]">Meu Portfólio</h2>
        <p className="text-sm text-[#A4907C]">O teu traço eterno no Bubbles & Craft.</p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {userPhotos.map(photo => renderPhotoItem(photo, true))}
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
      </header>
      <div className="space-y-4">
        {MOCK_HISTORY.map(item => {
          const piece = PIECES.find(p => p.id === item.pieceId);
          return (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-[#F1E9E0] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img src={piece?.image} className="w-14 h-14 rounded-xl object-cover grayscale opacity-60" alt={piece?.name} />
                <div>
                  <h4 className="font-semibold text-[#8D7B68] text-sm">{piece?.name}</h4>
                  <p className="text-[9px] text-[#A4907C] uppercase font-bold">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#8D7B68]">{item.price} MT</p>
                <div className="flex items-center gap-1 text-[8px] text-green-600 font-black uppercase">Finalizado</div>
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
      </header>
      <div className="bg-white rounded-3xl border border-[#F1E9E0] overflow-hidden divide-y divide-[#F1E9E0]">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UserIcon size={18} className="text-[#8D7B68]" />
              <div>
                <p className="text-sm font-semibold text-[#8D7B68]">Perfil Pessoal</p>
                <p className="text-[10px] text-[#A4907C]">Maria Silva</p>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield size={18} className="text-[#8D7B68]" />
              <div>
                <p className="text-sm font-semibold text-[#8D7B68]">Segurança</p>
                <p className="text-[10px] text-[#A4907C]">Privacidade & Dados</p>
              </div>
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
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-white border border-[#F1E9E0] rounded-2xl active:bg-[#F1E9E0]/30 transition-colors shadow-sm">
    <div className="flex items-center gap-4 text-[#8D7B68]">
      <div className="w-8 h-8 rounded-lg bg-[#F1E9E0]/50 flex items-center justify-center">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
    <ChevronLeft size={14} className="rotate-180 text-[#C8B6A6]" />
  </button>
);

export default ProfileView;
