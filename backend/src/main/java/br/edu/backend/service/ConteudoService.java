package br.edu.backend.service;

import br.edu.backend.dto.conteudo.*;
import br.edu.backend.entity.Aviso;
import br.edu.backend.repository.AvisoRepository;
import br.edu.backend.repository.CartilhaRepository;
import br.edu.backend.repository.VideoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ConteudoService {

    private final CartilhaRepository cartilhas;
    private final VideoRepository videos;
    private final AvisoRepository avisos;

    public ConteudoService(CartilhaRepository cartilha, VideoRepository video, AvisoRepository aviso) {
        this.cartilhas = cartilha; this.videos = video; this.avisos = aviso;
    }

    public List<CartilhaResumoDTO> listarCartilhas() {
        return cartilhas.findByPublicadoTrueOrderByTituloAsc().stream()
                .map(c -> new CartilhaResumoDTO(c.getId(),
                        c.getTitulo(),
                        c.getSlug(),
                        c.getResumo(),
                        c.getCategoria()))
                .toList();
    }

    public CartilhaDetalheDTO buscarCartilha(String slug) {
        var c = cartilhas.findBySlugAndPublicadoTrue(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cartilha não encontrada"));
        return new CartilhaDetalheDTO(
                c.getId(),
                c.getTitulo(),
                c.getSlug(),
                c.getResumo(),
                c.getConteudo(),
                c.getCategoria()
        );
    }

    public List<VideoResponseDTO> listarVideos() {
        return videos.findByPublicadoTrueOrderByIdDesc().stream()
                .map(v -> new VideoResponseDTO(v.getId(),
                        v.getTitulo(),
                        v.getDescricao(),
                        v.getUrlEmbed(),
                        v.getCategoria()))
                .toList();
    }

    public List<AvisoResponseDTO> listarAvisos() {
        return avisos.findVigentes().stream().map(this::toDto).toList();
    }

    public AvisoResponseDTO criarAviso(AvisoCreateDTO dto) {

        var a = new Aviso();

        a.setTitulo(dto.titulo());
        a.setDescricao(dto.descricao());
        a.setTipo(dto.tipo());
        a.setDataInicio(dto.dataInicio());
        a.setDataFim(dto.dataFim());
        a.setLocal(dto.local());

        return toDto(avisos.save(a));
    }

    private AvisoResponseDTO toDto(Aviso a) {
        return new AvisoResponseDTO(
                a.getId(),
                a.getTitulo(),
                a.getDescricao(),
                a.getTipo(),
                a.getDataInicio(),
                a.getDataFim(),
                a.getLocal()
        );
    }

}
