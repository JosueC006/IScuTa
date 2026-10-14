package br.edu.backend.dto.conteudo;

import br.edu.backend.entity.enums.TipoAviso;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record AvisoCreateDTO(

        @NotBlank
        @Size(max = 150)
        String titulo,

        @Size(max = 500)
        String descricao,

        Enum<TipoAviso> tipo,

        LocalDate dataInicio,

        LocalDate dataFim,

        String local
) {}
