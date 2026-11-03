package br.edu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cartilha")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cartilha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, unique = true)
    private String slug;

    private String resumo;

    @Column(nullable = false, columnDefinition = "text")
    private String conteudo;

    private String categoria;

    private boolean publicado = true;
}
