import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings, School, Users, UserPlus, BookOpen, Trash2, ChevronRight } from 'lucide-react';

export const PainelAdmin: React.FC = () => {
  const [aba, setAba] = useState<'escolas' | 'professores' | 'turmas' | 'alunos' | 'config'>('escolas');
  const { 
    escolas, professores, turmas, alunos, config, 
    addEscola, addProfessor, addTurma, addAluno, setConfig,
    removerEscola, removerProfessor, removerTurma, removerAluno
  } = useAppStore();
  
  const [novaEscola, setNovaEscola] = useState({ nome: '', cnpj: '', endereco: '', telefone: '', email: '' });
  const [novoProfessor, setNovoProfessor] = useState({ nome: '', email: '', escolaId: '' });
  const [novaTurma, setNovaTurma] = useState({ nome: '', professorId: '' });
  const [novoAluno, setNovoAluno] = useState({ nome: '', turmaId: '' });
  
  const handleAddEscola = () => {
    if (novaEscola.nome) {
      addEscola(novaEscola);
      setNovaEscola({ nome: '', cnpj: '', endereco: '', telefone: '', email: '' });
    }
  };
  
  const handleAddProfessor = () => {
    if (novoProfessor.nome && novoProfessor.escolaId) {
      addProfessor(novoProfessor);
      setNovoProfessor({ nome: '', email: '', escolaId: '' });
    }
  };
  
  const handleAddTurma = () => {
    if (novaTurma.nome && novaTurma.professorId) {
      addTurma(novaTurma);
      setNovaTurma({ nome: '', professorId: '' });
    }
  };
  
  const handleAddAluno = () => {
    if (novoAluno.nome && novoAluno.turmaId) {
      addAluno(novoAluno);
      setNovoAluno({ nome: '', turmaId: '' });
    }
  };
  
  const handleSaveConfig = () => {
    const url = (document.getElementById('google-url') as HTMLInputElement).value;
    setConfig({ googleScriptsUrl: url });
    alert('✅ Configuração salva com sucesso!');
  };
  
  const handleLimparDados = () => {
    if (confirm('⚠️ Tem certeza? Isso irá apagar TODOS os dados cadastrados!')) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🎮 Painel de Controle</h1>
          <p className="text-white/80">Gerencie escolas, professores, turmas e alunos</p>
        </div>
        
        <div className="flex gap-2 md:gap-4 mb-8 flex-wrap justify-center">
          <button 
            onClick={() => setAba('escolas')} 
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${aba === 'escolas' ? 'bg-white text-primary-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <School className="inline mr-2" size={18} /> Escolas
          </button>
          <button 
            onClick={() => setAba('professores')} 
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${aba === 'professores' ? 'bg-white text-primary-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <Users className="inline mr-2" size={18} /> Professores
          </button>
          <button 
            onClick={() => setAba('turmas')} 
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${aba === 'turmas' ? 'bg-white text-primary-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <BookOpen className="inline mr-2" size={18} /> Turmas
          </button>
          <button 
            onClick={() => setAba('alunos')} 
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${aba === 'alunos' ? 'bg-white text-primary-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <UserPlus className="inline mr-2" size={18} /> Alunos
          </button>
          <button 
            onClick={() => setAba('config')} 
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${aba === 'config' ? 'bg-white text-primary-600 shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}
          >
            <Settings className="inline mr-2" size={18} /> Config
          </button>
        </div>
        
        <div className="card">
          {/* ESCOLAS */}
          {aba === 'escolas' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">🏫 Cadastrar Escola</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input type="text" placeholder="Nome da Escola *" className="input" value={novaEscola.nome} onChange={(e) => setNovaEscola({ ...novaEscola, nome: e.target.value })} />
                <input type="text" placeholder="CNPJ" className="input" value={novaEscola.cnpj} onChange={(e) => setNovaEscola({ ...novaEscola, cnpj: e.target.value })} />
                <input type="text" placeholder="Endereço" className="input" value={novaEscola.endereco} onChange={(e) => setNovaEscola({ ...novaEscola, endereco: e.target.value })} />
                <input type="text" placeholder="Telefone" className="input" value={novaEscola.telefone} onChange={(e) => setNovaEscola({ ...novaEscola, telefone: e.target.value })} />
                <input type="email" placeholder="Email" className="input md:col-span-2" value={novaEscola.email} onChange={(e) => setNovaEscola({ ...novaEscola, email: e.target.value })} />
              </div>
              <button onClick={handleAddEscola} className="btn-primary w-full mb-8">📚 Cadastrar Escola</button>
              
              <h3 className="text-xl font-bold text-white mb-4">📋 Escolas Cadastradas ({escolas.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {escolas.length === 0 ? (
                  <p className="text-white/50 text-center py-8">Nenhuma escola cadastrada ainda</p>
                ) : (
                  escolas.map(escola => (
                    <div key={escola.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{escola.nome}</p>
                          <p className="text-white/60 text-sm">{escola.cnpj}</p>
                          <p className="text-white/40 text-xs">{escola.email}</p>
                        </div>
                        <button onClick={() => removerEscola(escola.id)} className="text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* PROFESSORES */}
          {aba === 'professores' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">👨‍🏫 Cadastrar Professor</h2>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Nome do Professor *" className="input" value={novoProfessor.nome} onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })} />
                <input type="email" placeholder="Email" className="input" value={novoProfessor.email} onChange={(e) => setNovoProfessor({ ...novoProfessor, email: e.target.value })} />
                <select className="input" value={novoProfessor.escolaId} onChange={(e) => setNovoProfessor({ ...novoProfessor, escolaId: e.target.value })}>
                  <option value="">Selecione a Escola *</option>
                  {escolas.map(escola => (
                    <option key={escola.id} value={escola.id}>{escola.nome}</option>
                  ))}
                </select>
                <button onClick={handleAddProfessor} className="btn-primary w-full">👨‍🏫 Cadastrar Professor</button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">📋 Professores Cadastrados ({professores.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {professores.length === 0 ? (
                  <p className="text-white/50 text-center py-8">Nenhum professor cadastrado ainda</p>
                ) : (
                  professores.map(professor => {
                    const escola = escolas.find(e => e.id === professor.escolaId);
                    return (
                      <div key={professor.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-semibold">{professor.nome}</p>
                            <p className="text-white/60 text-sm">{professor.email}</p>
                            <p className="text-white/40 text-xs">🏫 {escola?.nome || 'Escola não encontrada'}</p>
                          </div>
                          <button onClick={() => removerProfessor(professor.id)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          
          {/* TURMAS */}
          {aba === 'turmas' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">📚 Criar Turma</h2>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Nome da Turma *" className="input" value={novaTurma.nome} onChange={(e) => setNovaTurma({ ...novaTurma, nome: e.target.value })} />
                <select className="input" value={novaTurma.professorId} onChange={(e) => setNovaTurma({ ...novaTurma, professorId: e.target.value })}>
                  <option value="">Selecione o Professor *</option>
                  {professores.map(professor => (
                    <option key={professor.id} value={professor.id}>{professor.nome}</option>
                  ))}
                </select>
                <button onClick={handleAddTurma} className="btn-primary w-full">📚 Criar Turma</button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">📋 Turmas Criadas ({turmas.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {turmas.length === 0 ? (
                  <p className="text-white/50 text-center py-8">Nenhuma turma criada ainda</p>
                ) : (
                  turmas.map(turma => {
                    const professor = professores.find(p => p.id === turma.professorId);
                    return (
                      <div key={turma.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-semibold">{turma.nome}</p>
                            <p className="text-white/60 text-sm">Código: {turma.codigo}</p>
                            <p className="text-white/40 text-xs">👨‍🏫 {professor?.nome || 'Professor não encontrado'}</p>
                          </div>
                          <button onClick={() => removerTurma(turma.id)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          
          {/* ALUNOS */}
          {aba === 'alunos' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">👨‍🎓 Cadastrar Aluno</h2>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Nome do Aluno *" className="input" value={novoAluno.nome} onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })} />
                <select className="input" value={novoAluno.turmaId} onChange={(e) => setNovoAluno({ ...novoAluno, turmaId: e.target.value })}>
                  <option value="">Selecione a Turma *</option>
                  {turmas.map(turma => (
                    <option key={turma.id} value={turma.id}>{turma.nome}</option>
                  ))}
                </select>
                <button onClick={handleAddAluno} className="btn-primary w-full">👨‍🎓 Cadastrar Aluno</button>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">📋 Alunos Cadastrados ({alunos.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {alunos.length === 0 ? (
                  <p className="text-white/50 text-center py-8">Nenhum aluno cadastrado ainda</p>
                ) : (
                  alunos.map(aluno => {
                    const turma = turmas.find(t => t.id === aluno.turmaId);
                    return (
                      <div key={aluno.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-semibold">{aluno.nome}</p>
                            <p className="text-white/70 text-sm font-mono">🎫 Código: {aluno.codigo}</p>
                            <p className="text-white/40 text-xs">📚 {turma?.nome || 'Turma não encontrada'}</p>
                          </div>
                          <button onClick={() => removerAluno(aluno.id)} className="text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          
          {/* CONFIGURAÇÕES */}
          {aba === 'config' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">⚙️ Configurações</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-white block mb-2 font-semibold">🔗 URL do Google Apps Script</label>
                  <input type="text" id="google-url" defaultValue={config.googleScriptsUrl} className="input" placeholder="https://script.google.com/macros/s/.../exec" />
                  <p className="text-white/50 text-sm mt-2">Configure para salvar pontuações na nuvem</p>
                </div>
                <button onClick={handleSaveConfig} className="btn-primary w-full">💾 Salvar Configurações</button>
                
                <div className="border-t border-white/20 pt-6 mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">⚠️ Área de Risco</h3>
                  <button onClick={handleLimparDados} className="w-full px-6 py-3 bg-red-500/80 hover:bg-red-600 text-white font-semibold rounded-lg transition-all">
                    🗑️ Limpar Todos os Dados
                  </button>
                  <p className="text-white/50 text-sm mt-2">Isso irá apagar todas as escolas, professores, turmas e alunos!</p>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Estatísticas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-white">{escolas.length}</p>
                      <p className="text-white/70 text-sm">Escolas</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-white">{professores.length}</p>
                      <p className="text-white/70 text-sm">Professores</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-white">{turmas.length}</p>
                      <p className="text-white/70 text-sm">Turmas</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-white">{alunos.length}</p>
                      <p className="text-white/70 text-sm">Alunos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
