package br.edu.backend.dto.conteudo;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ProgramacaoAvisoCreateDTO(

        @NotNull
        LocalDate data,

        @NotNull
        LocalTime horario
) {}
