package br.edu.backend.dto.conteudo;

public record VideoResponseDTO(

        Long id,

        String titulo,

        String descricao,

        String urlEmbed,

        String categoria
) {}
