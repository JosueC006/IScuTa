package br.edu.backend.dto.conteudo;

import br.edu.backend.entity.ProgramacaoAviso;
import br.edu.backend.entity.enums.TipoAviso;

import java.time.LocalDate;
import java.util.List;

public record AvisoResponseDTO(

        Long id,

        String titulo,

        String descricao,

        TipoAviso tipo,

        List<ProgramacaoAvisoCreateDTO> programacoes

) {}
