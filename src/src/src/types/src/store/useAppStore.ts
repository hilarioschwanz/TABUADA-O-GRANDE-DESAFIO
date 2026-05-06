import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Escola, Professor, Turma, Aluno, Pontuacao } from '../types';

const gerarCodigo = (): string => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letra1 = letras[Math.floor(Math.random() * letras.length)];
  const letra2 = letras[Math.floor(Math.random() * letras.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  return `CA${letra1}${letra2}26${num}`;
};

const gerarCodigoTurma = (): string => {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `TUR${num}`;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      escolas: [],
      professores: [],
      turmas: [],
      alunos: [],
      pontuacoes: [],
      config: {
        googleScriptsUrl: '',
      },
      
      addEscola: (escola) =>
        set((state) => ({
          escolas: [...state.escolas, { 
            ...escola, 
            id: Date.now().toString() 
          }],
        })),
      
      addProfessor: (professor) =>
        set((state) => ({
          professores: [...state.professores, { 
            ...professor, 
            id: Date.now().toString() 
          }],
        })),
      
      addTurma: (turma) =>
        set((state) => ({
          turmas: [...state.turmas, { 
            ...turma, 
            id: Date.now().toString(),
            codigo: gerarCodigoTurma()
          }],
        })),
      
      addAluno: (aluno) =>
        set((state) => ({
          alunos: [...state.alunos, { 
            ...aluno, 
            id: Date.now().toString(),
            codigo: gerarCodigo(),
            nivel: 1,
            eficiencia: 0,
            dataCadastro: new Date().toISOString()
          }],
        })),
      
      addPontuacao: (pontuacao) =>
        set((state) => {
          // Verifica se já existe pontuação melhor
          const existingIndex = state.pontuacoes.findIndex(p => p.codigo === pontuacao.codigo);
          if (existingIndex !== -1 && state.pontuacoes[existingIndex].eficiencia >= pontuacao.eficiencia) {
            return state;
          }
          
          if (existingIndex !== -1) {
            const novasPontuacoes = [...state.pontuacoes];
            novasPontuacoes[existingIndex] = pontuacao;
            return { pontuacoes: novasPontuacoes };
          }
          
          return { pontuacoes: [...state.pontuacoes, pontuacao] };
        }),
      
      setConfig: (config) =>
        set((state) => ({
          config: { ...state.config, ...config },
        })),
      
      removerEscola: (id) =>
        set((state) => ({
          escolas: state.escolas.filter(e => e.id !== id),
        })),
      
      removerProfessor: (id) =>
        set((state) => ({
          professores: state.professores.filter(p => p.id !== id),
        })),
      
      removerTurma: (id) =>
        set((state) => ({
          turmas: state.turmas.filter(t => t.id !== id),
        })),
      
      removerAluno: (id) =>
        set((state) => ({
          alunos: state.alunos.filter(a => a.id !== id),
        })),
    }),
    {
      name: 'desafio-tabuada-storage',
      version: 2,
    }
  )
);
