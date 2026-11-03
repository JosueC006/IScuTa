package br.edu.backend.dto.geocoding;

public record ViaCepResponseDTO(

        String cep,

        String logradouro,

        String bairro,

        String localidade,

        String uf,

        Boolean erro
) {}
