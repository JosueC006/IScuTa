import api from './api';
import type {
  Aviso,
  AvisoCreateDTO,
  CartilhaDetalheDTO,
  CartilhaResumoDTO,
  Video,
} from '@/types';

export const conteudoService = {
  /**
   * Retorna lista de cartilhas publicadas
   */
  async getCartilhas(): Promise<CartilhaResumoDTO[]> {
    const { data } = await api.get<CartilhaResumoDTO[]>('/cartilhas');
    return data;
  },

  /**
   * Retorna os detalhes de uma cartilha pelo seu slug amigável
   */
  async getCartilhaBySlug(slug: string): Promise<CartilhaDetalheDTO> {
    const { data } = await api.get<CartilhaDetalheDTO>(`/cartilhas/${slug}`);
    return data;
  },

  /**
   * Retorna lista de vídeos educativos (URLs embed)
   */
  async getVideos(): Promise<Video[]> {
    const { data } = await api.get<Video[]>('/videos');
    return data;
  },

  /**
   * Retorna avisos vigentes
   */
  async getAvisos(): Promise<Aviso[]> {
    const { data } = await api.get<Aviso[]>('/avisos');
    return data;
  },

  /**
   * Cria um novo aviso/campanha (Requer header X-Admin-Token via interceptor)
   */
  async createAviso(dto: AvisoCreateDTO): Promise<Aviso> {
    const { data } = await api.post<Aviso>('/admin/avisos', dto);
    return data;
  },
};

export default conteudoService;
