package br.edu.backend.dto.unidade;

import jakarta.validation.constraints.NotBlank;

public record UnidadeSaudeCreateDTO(

        @NotBlank
        String nome,

        @NotBlank
        String numero,

        @NotBlank
        String cep,

        @NotBlank
        String telefone,

        @NotBlank
        String horarioFuncionamento,

        Boolean realizaTesteRapido,

        Boolean oferecePrep,

        Boolean oferecePep
) {}
