import api from './api';
import type {
  UnidadeSaude,
  UnidadeSaudeCreateDTO,
  UnidadeSaudeMapDTO,
  UnidadeSaudeUpdateDTO,
  ViaCepResponse,
} from '@/types';

export const unidadeService = {
  /**
   * Retorna listagem com coordenadas para o mapa interativo
   */
  async getMapa(): Promise<UnidadeSaudeMapDTO[]> {
    const { data } = await api.get<UnidadeSaudeMapDTO[]>('/unidade/mapa');
    return data;
  },

  /**
   * Busca detalhes completos de uma unidade de saúde pelo ID
   */
  async getById(id: string): Promise<UnidadeSaude> {
    const { data } = await api.get<UnidadeSaude>(`/unidade/${id}`);
    return data;
  },

  /**
   * Cadastra uma nova unidade de saúde
   */
  async create(dto: UnidadeSaudeCreateDTO): Promise<UnidadeSaude> {
    const { data } = await api.post<UnidadeSaude>('/unidade', dto);
    return data;
  },

  /**
   * Atualiza dados de uma unidade de saúde existente
   */
  async update(id: string, dto: UnidadeSaudeUpdateDTO): Promise<UnidadeSaude> {
    const { data } = await api.put<UnidadeSaude>(`/unidade/${id}`, dto);
    return data;
  },

  /**
   * Executa a exclusão lógica (soft delete) da unidade de saúde
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/unidade/${id}`);
  },

  /**
   * Envia foto da unidade via Multipart Form-Data
   */
  async uploadFoto(id: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('foto', file);
    await api.post(`/unidade/${id}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Retorna a URL direta para visualização da foto da unidade
   */
  getFotoUrl(id: string): string {
    return `http://localhost:8080/api/unidade/${id}/foto`;
  },

  /**
   * Consulta pública ao ViaCEP para preenchimento automático no front-end
   */
  async buscarEnderecoPorCep(cep: string): Promise<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) {
      throw new Error('CEP não encontrado.');
    }
    return data;
  },
};

export default unidadeService;
