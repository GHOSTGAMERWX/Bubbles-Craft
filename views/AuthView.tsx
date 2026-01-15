
import React, { useState } from 'react';
import { Mail, Phone, Lock, User, ChevronRight, ArrowLeft, Send } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de delay de rede
    setTimeout(() => {
      setIsLoading(false);
      if (mode !== 'forgot') {
        onLogin();
      } else {
        setMode('login');
        alert("Enviámos as instruções para o seu contacto.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col max-w-md mx-auto p-8 animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col justify-center space-y-8">
        
        {/* Header Section */}
        <header className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#F1E9E0] text-[#8D7B68] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C8B6A6]/30">
             <span className="serif text-xl font-bold">B&C</span>
          </div>
          <h1 className="serif text-4xl text-[#8D7B68]">
            {mode === 'login' ? 'Bem-vindo de volta' : mode === 'signup' ? 'Cria a tua conta' : 'Recuperar Acesso'}
          </h1>
          <p className="text-xs text-[#A4907C] leading-relaxed max-w-[240px] mx-auto uppercase tracking-widest font-medium">
            {mode === 'login' 
              ? 'Entre para continuar sua jornada criativa.' 
              : mode === 'signup' 
              ? 'Junte-se à nossa comunidade de artesãos.'
              : 'Introduza o seu contacto para recuperar a sua senha.'}
          </p>
        </header>

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
              <input 
                required
                type="text" 
                placeholder="Nome Completo" 
                className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
            <input 
              required
              type="text" 
              placeholder="Email ou Telemóvel" 
              className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm transition-all"
            />
          </div>

          {mode === 'signup' && (
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
              <input 
                required
                type="tel" 
                placeholder="Número de Telemóvel" 
                className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm transition-all"
              />
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8B6A6]" size={18} />
              <input 
                required
                type="password" 
                placeholder="Palavra-passe" 
                className="w-full bg-white border border-[#F1E9E0] pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#8D7B68] text-sm transition-all"
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => setMode('forgot')}
                className="text-[10px] uppercase tracking-widest font-bold text-[#A4907C] hover:text-[#8D7B68]"
              >
                Esqueceu-se da senha?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#8D7B68] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#746455] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Registar' : 'Enviar Link'} 
                {mode === 'forgot' ? <Send size={16} /> : <ChevronRight size={18} />}
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-4">
          {mode === 'login' ? (
            <p className="text-xs text-[#A4907C]">
              Não tem uma conta?{' '}
              <button onClick={() => setMode('signup')} className="font-bold text-[#8D7B68] underline decoration-dotted underline-offset-4">
                Registe-se agora
              </button>
            </p>
          ) : (
            <button 
              onClick={() => setMode('login')} 
              className="flex items-center gap-2 mx-auto text-xs font-bold text-[#8D7B68] uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Voltar ao Login
            </button>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-8 text-center opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8D7B68] font-bold">Bubbles & Craft</p>
      </footer>
    </div>
  );
};

export default AuthView;
