package br.edu.backend.entity;

import br.edu.backend.entity.enums.TipoAviso;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAviso tipo;

    @OneToMany(mappedBy = "aviso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProgramacaoAviso> programacoes = new ArrayList<>();

    private boolean ativo = true;

    public void addProgramacao(ProgramacaoAviso programacao) {
        programacoes.add(programacao);
        programacao.setAviso(this);
    }

}
