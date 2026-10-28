package br.edu.backend.repository;

import br.edu.backend.entity.Aviso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvisoRepository extends JpaRepository<Aviso, Long> {

    @Query("select distinct a from Aviso a left join a.programacoes p where a.ativo = true " +
            "and p.data >= current_date order by a.id asc")
    List<Aviso> findVigentes();

}
