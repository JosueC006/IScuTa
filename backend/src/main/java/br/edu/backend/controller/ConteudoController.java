package br.edu.backend.controller;

import br.edu.backend.dto.conteudo.*;
import br.edu.backend.service.ConteudoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ConteudoController {

    private final ConteudoService service;
    private final String adminToken;

    public ConteudoController(ConteudoService service, @Value("${admin.token}") String adminToken) {
        this.service = service; this.adminToken = adminToken;
    }

    @GetMapping("/cartilhas") public List<CartilhaResumoDTO> cartilhas() { return service.listarCartilhas(); }

    @GetMapping("/cartilhas/{slug}") public CartilhaDetalheDTO cartilha(@PathVariable String slug) { return service.buscarCartilha(slug); }

    @GetMapping("/videos") public List<VideoResponseDTO> videos() { return service.listarVideos(); }

    @GetMapping("/avisos") public List<AvisoResponseDTO> avisos() { return service.listarAvisos(); }

    @PostMapping("/admin/avisos")
    public AvisoResponseDTO criarAviso(@RequestHeader("X-Admin-Token") String token,
                                       @Valid @RequestBody AvisoCreateDTO dto) {
        if (!adminToken.equals(token)) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return service.criarAviso(dto);
    }

}
