import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Trophy, Clock, Target, ArrowRight, RotateCcw, Home } from 'lucide-react';

interface Pergunta {
  pergunta: string;
  resposta: number;
  num1: number;
  num2: number;
}

export const JogoTabuada: React.FC<{ onVoltar?: () => void }> = ({ onVoltar }) => {
  const [codigo, setCodigo] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [aluno, setAluno] = useState<any>(null);
  const [nivel, setNivel] = useState(1);
  const [perguntaAtual, setPerguntaAtual] = useState<Pergunta | null>(null);
  const [resposta, setResposta] = useState('');
  const [pontuacao, setPontuacao] = useState(0);
  const [tempo, setTempo] = useState(30);
  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [totalPerguntas, setTotalPerguntas] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  
  const { alunos, addPontuacao, pontuacoes } = useAppStore();
  
  const temposPorNivel: { [key: number]: number } = {
    1: 30,
    2: 28,
    3: 25,
    4: 22,
    5: 20,
  };
  
  const gerarPergunta = (nivelAtual: number): Pergunta => {
    const maxTabuada = Math.min(nivelAtual + 4, 10);
    const num1 = Math.floor(Math.random() * maxTabuada) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      pergunta: `${num1} × ${num2} = ?`,
      resposta: num1 * num2,
      num1,
      num2,
    };
  };
  
  const handleLogin = () => {
    const found = alunos.find(a => a.codigo === codigo.toUpperCase());
    if (found) {
      setAluno(found);
      setAutenticado(true);
      setMensagem(`✨ Bem-vindo, ${found.nome}! ✨`);
    } else {
      setMensagem('❌ Código inválido! Verifique com seu professor.');
    }
  };
  
  const iniciarJogo = () => {
    setJogoAtivo(true);
    setJogoFinalizado(false);
    setPontuacao(0);
    setAcertos(0);
    setTotalPerguntas(0);
    setTempo(temposPorNivel[nivel]);
    setPerguntaAtual(gerarPergunta(nivel));
    setMensagem('🎮 Jogo iniciado! Boa sorte! 🎮');
    setFeedback(null);
  };
  
  const verificarResposta = () => {
    if (!perguntaAtual || !jogoAtivo) return;
    
    const acertou = parseInt(resposta) === perguntaAtual.resposta;
    
    if (acertou) {
      setAcertos(acertos + 1);
      const pontosGanhos = 10 + Math.floor(tempo / 3);
      setPontuacao(pontuacao + pontosGanhos);
      setMensagem(`✅ Correto! +${pontosGanhos} pontos`);
      setFeedback('correct');
    } else {
      setMensagem(`❌ Errado! A resposta era ${perguntaAtual.resposta}`);
      setFeedback('wrong');
    }
    
    setTotalPerguntas(totalPerguntas + 1);
    setResposta('');
    
    setTimeout(() => setFeedback(null), 500);
    
    if (totalPerguntas + 1 >= 10) {
      finalizarJogo();
    } else {
      setPerguntaAtual(gerarPergunta(nivel));
    }
  };
  
  const finalizarJogo = () => {
    setJogoAtivo(false);
    setJogoFinalizado(true);
    const eficiencia = Math.floor((acertos / 10) * 100);
    
    const melhorPontuacaoAnterior = pontuacoes.find(p => p.codigo === aluno.codigo);
    const isRecord = !melhorPontuacaoAnterior || eficiencia > melhorPontuacaoAnterior.eficiencia;
    
    const novaPontuacao = {
      codigo: aluno.codigo,
      turma: '',
      nivel: nivel,
      eficiencia: eficiencia,
      data: new Date().toISOString(),
      acertos: acertos,
      tempo: temposPorNivel[nivel] - tempo,
    };
    
    addPontuacao(novaPontuacao);
    
    if (isRecord) {
      setMensagem(`🏆 RECORDE! 🏆\nEficiência: ${eficiencia}%`);
    } else {
      setMensagem(`🎉 Jogo finalizado! Eficiência: ${eficiencia}%`);
    }
  };
  
  const reiniciarJogo = () => {
    setJogoAtivo(false);
    setJogoFinalizado(false);
    setAcertos(0);
    setTotalPerguntas(0);
    setPontuacao(0);
    setTempo(temposPorNivel[nivel]);
    setMensagem('');
  };
  
  useEffect(() => {
    if (jogoAtivo && tempo > 0) {
      const timer = setTimeout(() => setTempo(tempo - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tempo === 0 && jogoAtivo) {
      finalizarJogo();
    }
  }, [tempo, jogoAtivo]);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && jogoAtivo && perguntaAtual) {
      verificarResposta();
    }
  };
  
  // Tela de Login
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
        <div className="card max-w-md w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-white mb-2">Desafio da Tabuada</h1>
            <p className="text-white/70">Digite seu código para começar</p>
          </div>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Ex: CA6A2601" 
              className="input text-center text-lg uppercase" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value.toUpperCase())} 
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <button onClick={handleLogin} className="btn-primary w-full">
              Entrar no Jogo
            </button>
            {mensagem && (
              <p className={`text-center ${mensagem.includes('inválido') ? 'text-red-300' : 'text-green-300'} animate-pulse`}>
                {mensagem}
              </p>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/50 text-sm">Não tem código? Peça ao seu professor!</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Tela de seleção de nível
  if (!jogoAtivo && !jogoFinalizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="text-2xl font-bold text-white">Olá, {aluno.nome}!</h2>
            <p className="text-white/70">Escolha seu desafio</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2 font-semibold">📊 Nível de Dificuldade</label>
              <select className="input" value={nivel} onChange={(e) => setNivel(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>
                    Nível {n} - {temposPorNivel[n]} segundos - Tabuada até {Math.min(n + 4, 10)}×
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">📖 Como jogar:</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• 10 perguntas de tabuada</li>
                <li>• Quanto mais rápido, mais pontos!</li>
                <li>• Acertos consecutivos dão bônus</li>
                <li>• Busque a maior eficiência!</li>
              </ul>
            </div>
            
            <button onClick={iniciarJogo} className="btn-primary w-full">
              🚀 Iniciar Jogo
            </button>
            {onVoltar && (
              <button onClick={onVoltar} className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all">
                ← Voltar
              </button>
            )}
            {mensagem && <p className="text-center text-green-300">{mensagem}</p>}
          </div>
        </div>
      </div>
    );
  }
  
  // Tela do jogo ativo
  if (jogoAtivo && perguntaAtual) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
        <div className="card max-w-2xl w-full">
          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <Trophy className="inline text-yellow-400 mb-2" size={28} />
              <p className="text-white text-sm">Pontos</p>
              <p className="text-white text-2xl font-bold">{pontuacao}</p>
            </div>
            <div className="text-center">
              <Target className="inline text-green-400 mb-2" size={28} />
              <p className="text-white text-sm">Progresso</p>
              <p className="text-white text-2xl font-bold">{acertos}/10</p>
            </div>
            <div className="text-center">
              <Clock className="inline text-blue-400 mb-2" size={28} />
              <p className="text-white text-sm">Tempo</p>
              <p className={`text-2xl font-bold ${tempo <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {tempo}s
              </p>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300" 
                 style={{ width: `${(acertos / 10) * 100}%` }} />
          </div>
          
          {/* Pergunta */}
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm mb-2">Pergunta {totalPerguntas + 1}/10</p>
            <p className="text-white text-6xl md:text-7xl font-bold mb-8">{perguntaAtual.pergunta}</p>
            
            <div className="flex gap-4">
              <input 
                type="number" 
                placeholder="Digite sua resposta"
                className="input flex-1 text-center text-2xl" 
                value={resposta} 
                onChange={(e) => setResposta(e.target.value)} 
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button onClick={verificarResposta} className="btn-primary px-8">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Feedback */}
          {feedback === 'correct' && (
            <div className="text-center animate-bounce">
              <p className="text-green-400 text-xl font-bold">✅ Muito bem! ✅</p>
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="text-center animate-shake">
              <p className="text-red-400 text-xl font-bold">❌ Tente na próxima! ❌</p>
            </div>
          )}
          
          {mensagem && !feedback && (
            <p className="text-center text-white/70 mt-4">{mensagem}</p>
          )}
        </div>
      </div>
    );
  }
  
  // Tela de resultado final
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-white mb-4">Jogo Finalizado!</h2>
        
        <div className="space-y-3 mb-6">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/70 text-sm">Sua pontuação</p>
            <p className="text-white text-3xl font-bold">{pontuacao} pontos</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/70 text-sm">Acertos</p>
            <p className="text-white text-2xl font-bold">{acertos}/10</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/70 text-sm">Eficiência</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {Math.floor((acertos / 10) * 100)}%
            </p>
          </div>
        </div>
        
        {mensagem && (
          <div className="bg-yellow-500/20 rounded-lg p-3 mb-6">
            <p className="text-yellow-300 whitespace-pre-line">{mensagem}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <button onClick={reiniciarJogo} className="btn-primary w-full flex items-center justify-center gap-2">
            <RotateCcw size={20} /> Jogar Novamente
          </button>
          <button onClick={() => {
            setAutenticado(false);
            setJogoFinalizado(false);
            setCodigo('');
          }} className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
            <Home size={20} /> Trocar Aluno
          </button>
        </div>
      </div>
    </div>
  );
};
