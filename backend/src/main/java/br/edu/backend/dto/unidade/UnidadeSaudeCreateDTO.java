package br.edu.backend.dto.unidade;

import jakarta.validation.constraints.NotBlank;

public record UnidadeSaudeCreateDTO(

        @NotBlank
        String nome,

        @NotBlank
        String numero,

        @NotBlank
        String logradouro,

        @NotBlank
        String bairro,

        @NotBlank
        String cidade,

        @NotBlank
        String estado,

        @NotBlank
        String telefone,

        @NotBlank
        String horarioFuncionamento,

        Boolean realizaTesteRapido,

        Boolean oferecePrep,

        Boolean oferecePep
) {}
