package br.edu.backend.dto.unidade;

import br.edu.backend.entity.UnidadeSaude;

public record UnidadeSaudeMapDTO(

        String id,

        String nome,

        Double latitude,

        Double longitude
) {
    public UnidadeSaudeMapDTO(UnidadeSaude unidade) {
        this(
                unidade.getId().toString(),
                unidade.getNome(),
                unidade.getLatitude(),
                unidade.getLongitude()
        );
    }
}
