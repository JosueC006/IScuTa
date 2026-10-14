package br.edu.backend.dto.conteudo;

public record CartilhaDetalheDTO(

        Long id,

        String titulo,

        String slug,

        String resumo,

        String conteudo,

        String categoria
) {
}
