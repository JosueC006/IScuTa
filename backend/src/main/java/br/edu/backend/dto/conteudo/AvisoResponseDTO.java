package br.edu.backend.dto.conteudo;

import br.edu.backend.entity.enums.TipoAviso;

import java.time.LocalDate;

public record AvisoResponseDTO(

        Long id,

        String titulo,

        String descricao,

        Enum<TipoAviso> tipo,

        LocalDate dataInicio,

        LocalDate dataFim,

        String local
) {}
