package br.edu.backend.entity;

import br.edu.backend.entity.enums.TipoAviso;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "aviso")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(length = 500)
    private String descricao;

    private Enum<TipoAviso> tipo;

    private LocalDate dataInicio;

    private LocalDate dataFim;

    @Column(name = "local_evento")
    private String local;

    private boolean ativo = true;

}
