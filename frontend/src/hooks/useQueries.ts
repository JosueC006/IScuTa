import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unidadeService } from '@/services/unidadeService';
import { conteudoService } from '@/services/conteudoService';
import type {
  AvisoCreateDTO,
  UnidadeSaudeCreateDTO,
  UnidadeSaudeUpdateDTO,
} from '@/types';

export const QUERY_KEYS = {
  cartilhas: ['cartilhas'] as const,
  cartilha: (slug: string) => ['cartilha', slug] as const,
  videos: ['videos'] as const,
  avisos: ['avisos'] as const,
  unidadesMapa: ['unidades', 'mapa'] as const,
  unidade: (id: string) => ['unidade', id] as const,
};

// --- QUERIES PÚBLICAS (conteudoService) ---

export function useCartilhas() {
  return useQuery({
    queryKey: QUERY_KEYS.cartilhas,
    queryFn: () => conteudoService.getCartilhas(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCartilha(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.cartilha(slug),
    queryFn: () => conteudoService.getCartilhaBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 15,
  });
}

export function useVideos() {
  return useQuery({
    queryKey: QUERY_KEYS.videos,
    queryFn: () => conteudoService.getVideos(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useAvisos() {
  return useQuery({
    queryKey: QUERY_KEYS.avisos,
    queryFn: () => conteudoService.getAvisos(),
    staleTime: 1000 * 60 * 5,
  });
}

// --- QUERIES PÚBLICAS (unidadeService) ---

export function useUnidadesMapa() {
  return useQuery({
    queryKey: QUERY_KEYS.unidadesMapa,
    queryFn: () => unidadeService.getMapa(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useUnidade(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.unidade(id),
    queryFn: () => unidadeService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// --- MUTAÇÕES ADMIN ---

export function useCreateAviso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AvisoCreateDTO) => conteudoService.createAviso(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.avisos });
    },
  });
}

export function useCreateUnidade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UnidadeSaudeCreateDTO) => unidadeService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unidadesMapa });
    },
  });
}

export function useUpdateUnidade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UnidadeSaudeUpdateDTO }) =>
      unidadeService.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unidadesMapa });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unidade(variables.id) });
    },
  });
}

export function useDeleteUnidade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unidadeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unidadesMapa });
    },
  });
}

export function useUploadFotoUnidade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      unidadeService.uploadFoto(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unidade(variables.id) });
    },
  });
}
