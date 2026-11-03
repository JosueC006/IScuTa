package br.edu.backend.dto.unidade;

public record UnidadeSaudeUpdateDTO(

        String nome,

        String numero,

        String cep,

        String telefone,

        String horarioFuncionamento,

        Boolean realizaTesteRapido,

        Boolean oferecePrep,

        Boolean oferecePep,

        Boolean ativa

) {}
