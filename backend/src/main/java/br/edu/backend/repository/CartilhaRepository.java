package br.edu.backend.repository;

import br.edu.backend.entity.Cartilha;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartilhaRepository extends JpaRepository<Cartilha, Long> {

    List<Cartilha> findByPublicadoTrueOrderByTituloAsc();

    Optional<Cartilha> findBySlugAndPublicadoTrue(String slug);

}
