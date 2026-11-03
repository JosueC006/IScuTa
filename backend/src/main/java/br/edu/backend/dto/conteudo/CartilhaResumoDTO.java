package br.edu.backend.dto.conteudo;

public record CartilhaResumoDTO(

        Long id,

        String titulo,

        String slug,

        String resumo,

        String categoria
) {}
