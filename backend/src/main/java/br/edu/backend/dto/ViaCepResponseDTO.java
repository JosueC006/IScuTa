package br.edu.backend.dto;

public record ViaCepResponseDTO(

        String cep,

        String logradouro,

        String bairro,

        String localidade,

        String uf,

        Boolean erro
) {}
