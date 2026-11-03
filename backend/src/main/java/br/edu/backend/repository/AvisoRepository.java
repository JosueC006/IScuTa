package br.edu.backend.repository;

import br.edu.backend.entity.Aviso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvisoRepository extends JpaRepository<Aviso, Long> {

    @Query("""
    SELECT DISTINCT a
    FROM Aviso a
    LEFT JOIN a.programacoes p
    WHERE a.ativo = true
      AND (p.id IS NULL OR p.data >= CURRENT_DATE)
    ORDER BY a.id ASC
    """)
    List<Aviso> findVigentes();

}
