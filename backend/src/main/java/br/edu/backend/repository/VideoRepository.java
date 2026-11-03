package br.edu.backend.repository;

import br.edu.backend.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    List<Video> findByPublicadoTrueOrderByIdDesc();

}
