package br.edu.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "unidade_saude")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UnidadeSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String uf;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String horarioFuncionamento;

    @Column(nullable = false)
    private Boolean ativa = true;

    //verificar depois sobre essses atributos
    private Boolean realizaTesteRapido;

    private Boolean oferecePrep;

    private Boolean oferecePep;

    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(columnDefinition = "BYTEA")
    private byte[] foto;

    private String fotoContentType;

    private Double latitude;

    private Double longitude;

}
