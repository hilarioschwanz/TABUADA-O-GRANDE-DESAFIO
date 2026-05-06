import React, { useState } from 'react';
import { PainelAdmin } from './components/PainelAdmin';
import { JogoTabuada } from './pages/JogoTabuada';
import { LayoutDashboard, Gamepad2, Trophy, Users, Settings } from 'lucide-react';

function App() {
  const [modo, setModo] = useState<'admin' | 'jogo'>('jogo');
  
  return (
    <div>
      {/* Menu flutuante */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-black/20 backdrop-blur-md rounded-full p-1">
        <button 
          onClick={() => setModo('jogo')} 
          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${
            modo === 'jogo' 
              ? 'bg-white text-primary-600 shadow-lg' 
              : 'text-white hover:bg-white/20'
          }`}
        >
          <Gamepad2 size={18} /> Jogar
        </button>
        <button 
          onClick={() => setModo('admin')} 
          className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${
            modo === 'admin' 
              ? 'bg-white text-primary-600 shadow-lg' 
              : 'text-white hover:bg-white/20'
          }`}
        >
          <LayoutDashboard size={18} /> Admin
        </button>
      </div>
      
      {modo === 'admin' ? (
        <PainelAdmin />
      ) : (
        <JogoTabuada onVoltar={() => setModo('admin')} />
      )}
    </div>
  );
}

export default App;
