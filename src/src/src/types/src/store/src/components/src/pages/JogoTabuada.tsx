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
