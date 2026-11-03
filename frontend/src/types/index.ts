export type TipoAviso = 'CAMPANHA' | 'EVENTO' | 'AVISO';

export interface Aviso {
  id: number;
  titulo: string;
  descricao?: string;
  tipo?: TipoAviso;
  dataInicio?: string;
  dataFim?: string;
  local?: string;
}

export interface AvisoCreateDTO {
  titulo: string;
  descricao?: string;
  tipo?: TipoAviso;
  dataInicio?: string;
  dataFim?: string;
  local?: string;
}

export interface Cartilha {
  id: number;
  titulo: string;
  slug: string;
  resumo?: string;
  conteudo: string;
  categoria?: string;
  publicado?: boolean;
}

export type CartilhaResumoDTO = Pick<Cartilha, 'id' | 'titulo' | 'slug' | 'resumo' | 'categoria'>;
export type CartilhaDetalheDTO = Cartilha;

// Compatibilidade de nomes
export type CartilhaResumo = CartilhaResumoDTO;
export type CartilhaDetalhe = CartilhaDetalheDTO;

export interface Video {
  id: number;
  titulo: string;
  descricao?: string;
  urlEmbed: string;
  categoria?: string;
  publicado?: boolean;
}

export interface UnidadeSaudeMapDTO {
  id: string;
  nome: string;
  latitude?: number;
  longitude?: number;
}

// Alias de compatibilidade
export type UnidadeSaudeMap = UnidadeSaudeMapDTO;

export interface UnidadeSaude {
  id: string;
  nome: string;
  numero: string;
  cep: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  telefone: string;
  horarioFuncionamento: string;
  realizaTesteRapido?: boolean;
  oferecePrep?: boolean;
  oferecePep?: boolean;
  latitude?: number;
  longitude?: number;
  ativa?: boolean;
}

export interface UnidadeSaudeCreateDTO {
  nome: string;
  numero: string;
  cep: string;
  telefone: string;
  horarioFuncionamento: string;
  realizaTesteRapido?: boolean;
  oferecePrep?: boolean;
  oferecePep?: boolean;
}

export interface UnidadeSaudeUpdateDTO {
  nome?: string;
  numero?: string;
  cep?: string;
  telefone?: string;
  horarioFuncionamento?: string;
  realizaTesteRapido?: boolean;
  oferecePrep?: boolean;
  oferecePep?: boolean;
  ativa?: boolean;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}
