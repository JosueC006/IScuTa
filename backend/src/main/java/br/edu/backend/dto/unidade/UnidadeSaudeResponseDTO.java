package br.edu.backend.dto.unidade;

import br.edu.backend.entity.UnidadeSaude;

public record UnidadeSaudeResponseDTO(

        String id,

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

        Double latitude,

        Double longitude
) {
    public UnidadeSaudeResponseDTO(UnidadeSaude unidade){
        this(
                unidade.getId().toString(),
                unidade.getNome(),
                unidade.getNumero(),
                unidade.getLogradouro(),
                unidade.getBairro(),
                unidade.getCidade(),
                unidade.getEstado(),
                unidade.getTelefone(),
                unidade.getHorarioFuncionamento(),
                unidade.getRealizaTesteRapido(),
                unidade.getOferecePrep(),
                unidade.getOferecePep(),
                unidade.getLatitude(),
                unidade.getLongitude()
                );
    }
}
