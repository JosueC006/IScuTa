package br.edu.backend.service;

import br.edu.backend.dto.conteudo.*;
import br.edu.backend.entity.Aviso;
import br.edu.backend.entity.ProgramacaoAviso;
import br.edu.backend.repository.AvisoRepository;
import br.edu.backend.repository.CartilhaRepository;
import br.edu.backend.repository.VideoRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Transactional
    public List<CartilhaResumoDTO> listarCartilhas() {
        return cartilhas.findByPublicadoTrueOrderByTituloAsc().stream()
                .map(c -> new CartilhaResumoDTO(c.getId(),
                        c.getTitulo(),
                        c.getSlug(),
                        c.getResumo(),
                        c.getCategoria()))
                .toList();
    }

    @Transactional
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

    @Transactional
    public void deletarCartilha(Long id){
        var c = cartilhas.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cartilha não encontrada"));
        c.setPublicado(false);
        cartilhas.save(c);
    }

    @Transactional
    public List<VideoResponseDTO> listarVideos() {
        return videos.findByPublicadoTrueOrderByIdDesc().stream()
                .map(v -> new VideoResponseDTO(v.getId(),
                        v.getTitulo(),
                        v.getDescricao(),
                        v.getUrlEmbed(),
                        v.getCategoria()))
                .toList();
    }

    @Transactional
    public void deletarVideo(Long id){
        var c = videos.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video não encontrada"));
        c.setPublicado(false);
        videos.save(c);
    }

    @Transactional
    public List<AvisoResponseDTO> listarAvisos() {
        return avisos.findVigentes().stream().map(this::toDto).toList();
    }

    @Transactional
    public AvisoResponseDTO criarAviso(AvisoCreateDTO dto) {

        var a = new Aviso();

        a.setTitulo(dto.titulo());
        a.setDescricao(dto.descricao());
        a.setTipo(dto.tipo());

        if (dto.programacoes() != null) {
            for (var programacaoDTO : dto.programacoes()) {
                var programacao = new ProgramacaoAviso();

                programacao.setData(programacaoDTO.data());
                programacao.setHorarioInicio(programacaoDTO.horarioInicio());
                programacao.setHorarioFim(programacaoDTO.horarioFim());
                programacao.setLocal(programacaoDTO.local());

                a.addProgramacao(programacao);
            }
        }

        return toDto(avisos.save(a));
    }

    @Transactional
    public void deletarAviso(Long id){
        var c = avisos.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aviso não encontrada"));
        c.setAtivo(false);
        avisos.save(c);
    }

    private AvisoResponseDTO toDto(Aviso a) {
        return new AvisoResponseDTO(
                a.getId(),
                a.getTitulo(),
                a.getDescricao(),
                a.getTipo(),
                a.getProgramacoes().stream()
                        .map(p -> new ProgramacaoAvisoCreateDTO(
                                p.getData(),
                                p.getHorarioInicio(),
                                p.getHorarioFim(),
                                p.getLocal()
                        ))
                        .toList()
        );
    }
}