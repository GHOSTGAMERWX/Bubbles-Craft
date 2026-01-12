
import React, { useState } from 'react';
import { MOCK_RESERVATIONS, PIECES, MOCK_HISTORY } from '../constants.tsx';
import { ReservationStatus } from '../types';
// Added Heart to the imports from lucide-react
import { Bell, Package, LogOut, Settings, Camera, ChevronLeft, User as UserIcon, Shield, CreditCard, Check, Heart } from 'lucide-react';

type ProfileSubView = 'main' | 'history' | 'settings';

const ProfileView: React.FC = () => {
  const [subView, setSubView] = useState<ProfileSubView>('main');
  const [notifications, setNotifications] = useState(true);

  const renderMain = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-6">
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

      {/* Navigation Options */}
      <section className="space-y-3 pt-4">
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
        
        <button className="w-full flex items-center justify-between p-5 bg-red-50/50 text-red-600 rounded-2xl mt-6 active:bg-red-50 transition-colors">
          <div className="flex items-center gap-4">
            <LogOut size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">Sair da Conta</span>
          </div>
        </button>
      </section>

      <div className="p-8 bg-brand-surface/20 border border-[#F1E9E0] rounded-[32px] text-center space-y-3">
         <Heart size={20} className="mx-auto text-[#C8B6A6]" fill="currentColor" />
         <p className="text-xs text-[#A4907C] italic leading-relaxed">"O barro recorda as tuas mãos, a cor recorda a tua alma."</p>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
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
      
      <div className="bg-[#FDFBF7] p-6 border border-dashed border-[#C8B6A6] rounded-2xl text-center">
        <p className="text-xs text-[#A4907C]">Mais de 5 peças criadas. És um artista Bubbles oficial!</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
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

          <div className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#8D7B68]">Métodos de Pagamento</p>
                <p className="text-[10px] text-[#A4907C]">M-Pesa, Cartão Bancário</p>
              </div>
            </div>
            <ChevronLeft size={16} className="rotate-180 text-[#C8B6A6]" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[#F1E9E0] flex items-center justify-between mt-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <Bell size={18} />
            </div>
            <p className="text-sm font-semibold text-[#8D7B68]">Notificações Push</p>
          </div>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[#8D7B68]' : 'bg-[#F1E9E0]'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-[#C8B6A6] mt-8 uppercase tracking-widest font-bold">
        Bubbles & Craft App v1.0.4
      </p>
    </div>
  );

  return (subView === 'history' ? renderHistory() : subView === 'settings' ? renderSettings() : renderMain());
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
