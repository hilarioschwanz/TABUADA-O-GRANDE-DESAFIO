export interface Escola {
  id: string;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
}

export interface Professor {
  id: string;
  nome: string;
  email: string;
  escolaId: string;
}

export interface Turma {
  id: string;
  nome: string;
  professorId: string;
  codigo: string;
}

export interface Aluno {
  id: string;
  nome: string;
  codigo: string;
  turmaId: string;
  nivel: number;
  eficiencia: number;
  dataCadastro: string;
}

export interface Pontuacao {
  codigo: string;
  turma: string;
  nivel: number;
  eficiencia: number;
  data: string;
  acertos?: number;
  tempo?: number;
}

export interface AppState {
  escolas: Escola[];
  professores: Professor[];
  turmas: Turma[];
  alunos: Aluno[];
  pontuacoes: Pontuacao[];
  config: {
    googleScriptsUrl: string;
  };
  
  addEscola: (escola: Omit<Escola, 'id'>) => void;
  addProfessor: (professor: Omit<Professor, 'id'>) => void;
  addTurma: (turma: Omit<Turma, 'id' | 'codigo'>) => void;
  addAluno: (aluno: Omit<Aluno, 'id' | 'codigo' | 'nivel' | 'eficiencia' | 'dataCadastro'>) => void;
  addPontuacao: (pontuacao: Pontuacao) => void;
  setConfig: (config: { googleScriptsUrl: string }) => void;
  removerEscola: (id: string) => void;
  removerProfessor: (id: string) => void;
  removerTurma: (id: string) => void;
  removerAluno: (id: string) => void;
}
