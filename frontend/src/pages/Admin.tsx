import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ShieldAlert,
  PlusCircle,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  LogOut,
  Building2,
  CalendarPlus,
  Lock,
  X,
  MapPin,
} from 'lucide-react';
import { useAuthStore } from '@/context/useAuthStore';
import {
  useCreateUnidade,
  useCreateAviso,
  useUnidadesMapa,
  useDeleteUnidade,
  useUploadFotoUnidade,
} from '@/hooks/useQueries';
import { unidadeService } from '@/services/unidadeService';
import type { TipoAviso, ViaCepResponse } from '@/types';


// Schema Unidade
const unidadeSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  numero: z.string().min(1, 'Número é obrigatório (ou S/N)'),
  cep: z.string().regex(/^\d{5}-?\d{3}$|^\d{8}$/, 'CEP deve ter 8 dígitos'),
  telefone: z.string().min(8, 'Telefone obrigatório'),
  horarioFuncionamento: z.string().min(3, 'Horário de funcionamento é obrigatório'),
  realizaTesteRapido: z.boolean().default(false),
  oferecePrep: z.boolean().default(false),
  oferecePep: z.boolean().default(false),
});

type UnidadeFormData = z.infer<typeof unidadeSchema>;

// Schema Aviso
const avisoSchema = z.object({
  titulo: z.string().min(3, 'Título é obrigatório').max(150, 'Máximo 150 caracteres'),
  descricao: z.string().max(500, 'Máximo 500 caracteres').optional(),
  tipo: z.enum(['CAMPANHA', 'EVENTO', 'AVISO']),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  local: z.string().optional(),
});

type AvisoFormData = z.infer<typeof avisoSchema>;

export const Admin: React.FC = () => {
  const { isAuthenticated, setAdminToken, logout } = useAuthStore();
  const [tokenInput, setTokenInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Controle do Modal de Cadastro de Aviso
  const [isAvisoModalOpen, setIsAvisoModalOpen] = useState(false);

  // Busca automática de endereço por CEP
  const [cepPreview, setCepPreview] = useState<ViaCepResponse | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);

  // Upload de Foto
  const [uploadUnitId, setUploadUnitId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Queries e Mutações
  const { data: unidades, isLoading: loadingUnidades } = useUnidadesMapa();
  const createUnidadeMutation = useCreateUnidade();
  const createAvisoMutation = useCreateAviso();
  const deleteUnidadeMutation = useDeleteUnidade();
  const uploadFotoMutation = useUploadFotoUnidade();

  // Form Unidade
  const {
    register: registerUnidade,
    handleSubmit: handleSubmitUnidade,
    watch: watchUnidade,
    reset: resetUnidade,
    formState: { errors: errorsUnidade, isSubmitting: isSubmittingUnidade },
  } = useForm<UnidadeFormData>({
    resolver: zodResolver(unidadeSchema),
    defaultValues: {
      realizaTesteRapido: false,
      oferecePrep: false,
      oferecePep: false,
    },
  });

  const cepValue = watchUnidade('cep');

  // Efeito para busca automática de endereço ao digitar 8 números no CEP
  useEffect(() => {
    if (!cepValue) {
      setCepPreview(null);
      return;
    }
    const clean = cepValue.replace(/\D/g, '');
    if (clean.length === 8) {
      setLoadingCep(true);
      unidadeService
        .buscarEnderecoPorCep(clean)
        .then((data) => {
          setCepPreview(data);
          setFeedbackMessage(null);
        })
        .catch(() => {
          setCepPreview(null);
        })
        .finally(() => setLoadingCep(false));
    } else {
      setCepPreview(null);
    }
  }, [cepValue]);

  // Form Aviso
  const {
    register: registerAviso,
    handleSubmit: handleSubmitAviso,
    reset: resetAviso,
    formState: { errors: errorsAviso, isSubmitting: isSubmittingAviso },
  } = useForm<AvisoFormData>({
    resolver: zodResolver(avisoSchema),
    defaultValues: {
      tipo: 'CAMPANHA',
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setAdminToken(tokenInput.trim());
    setFeedbackMessage({ type: 'success', text: 'Token administrativo registrado com sucesso.' });
  };

  const onSubmitUnidade = async (data: UnidadeFormData) => {
    try {
      setFeedbackMessage(null);
      const cleanCep = data.cep.replace(/\D/g, '');
      const novaUnidade = await createUnidadeMutation.mutateAsync({
        ...data,
        cep: cleanCep,
      });

      setFeedbackMessage({
        type: 'success',
        text: `Unidade "${novaUnidade.nome}" cadastrada com sucesso! Coordenadas e endereço geocodificados.`,
      });
      resetUnidade();
      setCepPreview(null);
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err?.response?.data?.message || 'Erro ao cadastrar unidade. Verifique o CEP ou a conexão com o backend.',
      });
    }
  };

  const onSubmitAviso = async (data: AvisoFormData) => {
    try {
      setFeedbackMessage(null);
      await createAvisoMutation.mutateAsync({
        titulo: data.titulo,
        descricao: data.descricao || undefined,
        tipo: data.tipo as TipoAviso,
        dataInicio: data.dataInicio || undefined,
        dataFim: data.dataFim || undefined,
        local: data.local || undefined,
      });

      setFeedbackMessage({
        type: 'success',
        text: 'Aviso cadastrado com sucesso no mural!',
      });
      resetAviso();
      setIsAvisoModalOpen(false);
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err?.response?.status === 401
          ? 'Token de administrador inválido ou não autorizado.'
          : 'Erro ao cadastrar aviso.',
      });
    }
  };

  const handleDeleteUnidade = async (id: string, nome: string) => {
    if (!confirm(`Deseja realmente desativar a unidade "${nome}"?`)) return;
    try {
      await deleteUnidadeMutation.mutateAsync(id);
      setFeedbackMessage({ type: 'success', text: `Unidade "${nome}" desativada (Soft Delete executado).` });
    } catch {
      setFeedbackMessage({ type: 'error', text: 'Erro ao desativar unidade.' });
    }
  };

  const handleUploadFoto = async (id: string) => {
    if (!selectedFile) return;
    try {
      await uploadFotoMutation.mutateAsync({ id, file: selectedFile });
      setFeedbackMessage({ type: 'success', text: 'Foto da fachada enviada com sucesso!' });
      setUploadUnitId(null);
      setSelectedFile(null);
    } catch {
      setFeedbackMessage({ type: 'error', text: 'Erro ao fazer upload da imagem.' });
    }
  };

  // Se não estiver autenticado, exibe formulário de token
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 text-center">
          <div className="w-12 h-12 bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-300 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Acesso do Administrador</h1>
            <p className="text-xs text-slate-500 mt-1">
              Insira o Token de Administrador configurado no backend para autenticar suas requisições.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="token" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Token de Acesso (X-Admin-Token)
              </label>
              <input
                id="token"
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Insira o token de admin"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow"
            >
              Autenticar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-0.5 rounded-full mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Gestão Operacional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Painel do Administrador
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAvisoModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Novo Comunicado / Aviso</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Alerta de Feedback */}
      {feedbackMessage && (
        <div
          role="alert"
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 font-medium ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-300'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Formulário de Cadastro de Unidade com Busca Automática por CEP */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-600" />
            <span>Cadastrar Nova Unidade de Saúde</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Digite o CEP para ver a busca instantânea do endereço e cadastre o posto na rede municipal.
          </p>
        </div>

        <form onSubmit={handleSubmitUnidade(onSubmitUnidade)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nome da Unidade *
              </label>
              <input
                {...registerUnidade('nome')}
                placeholder="Ex: Policlínica Professor Arnaldo Marques"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
              />
              {errorsUnidade.nome && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errorsUnidade.nome.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                CEP (8 dígitos) *
              </label>
              <div className="relative">
                <input
                  {...registerUnidade('cep')}
                  placeholder="Ex: 51230000"
                  maxLength={9}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
                />
                {loadingCep && (
                  <span className="absolute right-3 top-3 text-[10px] text-brand-600 animate-pulse font-bold">
                    Buscando CEP...
                  </span>
                )}
              </div>
              {errorsUnidade.cep && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errorsUnidade.cep.message}</span>
              )}
            </div>
          </div>

          {/* Card de Pré-visualização do CEP localizado */}
          {cepPreview && (
            <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Endereço identificado via ViaCEP:</strong>
                <span>
                  {cepPreview.logradouro || '(Sem logradouro específico)'} - {cepPreview.bairro},{' '}
                  {cepPreview.localidade} - {cepPreview.uf}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Número do Imóvel *
              </label>
              <input
                {...registerUnidade('numero')}
                placeholder="Ex: 108 ou S/N"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
              />
              {errorsUnidade.numero && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errorsUnidade.numero.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Telefone de Contato *
              </label>
              <input
                {...registerUnidade('telefone')}
                placeholder="Ex: (81) 93338-7768"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
              />
              {errorsUnidade.telefone && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errorsUnidade.telefone.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Horário de Atendimento *
              </label>
              <input
                {...registerUnidade('horarioFuncionamento')}
                placeholder="Ex: Aberto 24h ou 07:00 – 19:00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
              />
              {errorsUnidade.horarioFuncionamento && (
                <span className="text-[11px] text-rose-500 mt-1 block">{errorsUnidade.horarioFuncionamento.message}</span>
              )}
            </div>
          </div>

          {/* Serviços Disponíveis */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              Serviços de Saúde Sexual Oferecidos:
            </span>
            <div className="flex flex-wrap gap-5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  {...registerUnidade('oferecePrep')}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <span>Oferece PrEP (Profilaxia Pré-Exposição)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  {...registerUnidade('oferecePep')}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span>Oferece PEP (Profilaxia Pós-Exposição 72h)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  {...registerUnidade('realizaTesteRapido')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Realiza Testagem Rápida</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmittingUnidade}
            className="mt-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isSubmittingUnidade ? 'Geocodificando e salvando...' : 'Cadastrar Unidade'}</span>
          </button>
        </form>
      </section>

      {/* Tabela CRUD de Unidades Cadastradas */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tabela de Unidades</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gerencie a rede, visualize as coordenadas e envie imagens de fachada para a ficha do posto.
            </p>
          </div>
          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
            {unidades?.length || 0} postos ativos
          </span>
        </div>

        {loadingUnidades ? (
          <div className="p-12 text-center text-xs text-slate-500">Carregando unidades...</div>
        ) : !unidades || unidades.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">Nenhuma unidade cadastrada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-5">Nome do Posto</th>
                  <th className="py-3.5 px-5">Coordenadas</th>
                  <th className="py-3.5 px-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {unidades.map((unidade) => (
                  <tr key={unidade.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-5">
                      <strong className="block text-slate-900 dark:text-white text-sm">
                        {unidade.nome}
                      </strong>
                      <span className="text-[11px] text-slate-400 font-mono">ID: {unidade.id}</span>
                    </td>

                    <td className="py-4 px-5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      {unidade.latitude && unidade.longitude ? (
                        <span>
                          {unidade.latitude.toFixed(4)}, {unidade.longitude.toFixed(4)}
                        </span>
                      ) : (
                        <span className="text-amber-500 font-sans">Pendente</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right space-x-2">
                      {uploadUnitId === unidade.id ? (
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="text-[11px] text-slate-600 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:bg-brand-600 file:text-white"
                          />
                          <button
                            onClick={() => handleUploadFoto(unidade.id)}
                            disabled={!selectedFile}
                            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs px-2.5 py-1 rounded-lg font-bold"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setUploadUnitId(null)}
                            className="text-slate-400 hover:text-slate-600 text-xs px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setUploadUnitId(unidade.id)}
                          className="inline-flex items-center gap-1 text-xs text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Foto</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteUnidade(unidade.id, unidade.nome)}
                        className="inline-flex items-center gap-1 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 px-2.5 py-1.5 rounded-lg font-semibold transition-colors"
                        title="Desativar unidade"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Desativar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal de Cadastro de Aviso / Campanha */}
      {isAvisoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
              <div className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Publicar Novo Comunicado / Campanha
                </h3>
              </div>
              <button
                onClick={() => setIsAvisoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAviso(onSubmitAviso)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Título do Aviso *
                </label>
                <input
                  {...registerAviso('titulo')}
                  placeholder="Ex: Campanha de Testagem Rápida no Ibura"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
                />
                {errorsAviso.titulo && (
                  <span className="text-[11px] text-rose-500 mt-1 block">{errorsAviso.titulo.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo *
                  </label>
                  <select
                    {...registerAviso('tipo')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="CAMPANHA">CAMPANHA</option>
                    <option value="EVENTO">EVENTO</option>
                    <option value="AVISO">AVISO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Data Início
                  </label>
                  <input
                    type="date"
                    {...registerAviso('dataInicio')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Data Término
                  </label>
                  <input
                    type="date"
                    {...registerAviso('dataFim')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Local do Evento (Opcional)
                </label>
                <input
                  {...registerAviso('local')}
                  placeholder="Ex: Policlínica Albert Sabin ou Praça Central"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição
                </label>
                <textarea
                  {...registerAviso('descricao')}
                  rows={3}
                  placeholder="Instruções, horários e documentos necessários..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAvisoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAviso}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow flex items-center gap-1.5"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>{isSubmittingAviso ? 'Publicando...' : 'Publicar no Mural'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
