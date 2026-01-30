
import React, { useState } from 'react';
import { MOCK_RESERVATIONS } from '../constants.tsx';
import { Bell, Package, LogOut, Settings, Hash } from 'lucide-react';

interface ProfileViewProps {
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 relative">
      <header className="flex items-center gap-4">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" alt="User avatar" />
        <div>
          <h2 className="serif text-xl text-[#8D7B68]">Maria Silva</h2>
          <p className="text-[10px] text-[#A4907C] uppercase tracking-widest">Membro Artesão</p>
        </div>
      </header>

      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="serif text-lg text-[#8D7B68]">Obras Ativas</h3>
          <div className="space-y-4">
            {MOCK_RESERVATIONS.map(res => (
              <div key={res.id} className="bg-white p-4 rounded-2xl border border-[#F1E9E0] shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1 text-[#8D7B68] font-bold text-sm">
                    <Hash size={14} /> {res.id}
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-bold">{res.status}</span>
                </div>
                <p className="text-xs text-[#A4907C]">{res.pieceNames.join(', ')}</p>
                <p className="text-[10px] text-[#C8B6A6] mt-2 italic">{res.date} • {res.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <ProfileOption icon={<Package size={18} />} label="Histórico" />
          <ProfileOption icon={<Bell size={18} />} label="Notificações" />
          <ProfileOption icon={<Settings size={18} />} label="Definições" />
          
          <button 
            onClick={() => setShowLogoutConfirm(true)} 
            className="w-full flex items-center gap-4 p-4 text-red-500 bg-red-50/50 rounded-2xl mt-4 border border-red-100/50 active:scale-95 transition-transform"
          >
            <LogOut size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Sair</span>
          </button>
        </section>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#4A3F35]/40 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          
          <div className="relative bg-[#FDFBF7] w-full max-w-xs rounded-[32px] p-8 shadow-2xl border border-white animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                <LogOut size={28} />
              </div>
              
              <div className="space-y-2">
                <h3 className="serif text-2xl text-[#8D7B68]">Terminar Sessão?</h3>
                <p className="text-xs text-[#A4907C] leading-relaxed">
                  Tens a certeza que desejas sair? Terás de introduzir os teus dados novamente para ver as tuas obras.
                </p>
              </div>

              <div className="w-full space-y-3 pt-4">
                <button 
                  onClick={onLogout}
                  className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                >
                  Confirmar Saída
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full bg-white border border-[#F1E9E0] text-[#A4907C] py-4 rounded-2xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileOption: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="w-full flex items-center justify-between p-4 bg-white border border-[#F1E9E0] rounded-2xl shadow-sm">
    <div className="flex items-center gap-4 text-[#8D7B68]">
      {icon}
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  </div>
);

export default ProfileView;
