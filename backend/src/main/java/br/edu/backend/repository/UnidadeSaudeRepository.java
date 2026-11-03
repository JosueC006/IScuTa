package br.edu.backend.repository;

import br.edu.backend.entity.UnidadeSaude;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UnidadeSaudeRepository extends JpaRepository<UnidadeSaude, UUID> {

        List<UnidadeSaude> findByAtivaTrue();

}
//por ora é o suficiente, mas verificar posteriormente a necessidade de criação de filtros findByServices