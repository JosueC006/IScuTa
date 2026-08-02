package br.edu.backend.dto.unidade;

public record UnidadeSaudeUpdateDTO(

        String nome,

        String numero,

        String logradouro,

        String bairro,

        String cidade,

        String estado,

        String telefone,

        String horarioFuncionamento,

        Boolean realizaTesteRapido,

        Boolean oferecePrep,

        Boolean oferecePep,

        Boolean ativa

) {}
