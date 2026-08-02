package br.edu.backend.controller;

import br.edu.backend.dto.unidade.*;
import br.edu.backend.service.UnidadeSaudeService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/unidade")
public class UnidadeSaudeController {

    private final UnidadeSaudeService unidadeSaudeService;

    public UnidadeSaudeController(UnidadeSaudeService unidadeSaudeService){
        this.unidadeSaudeService = unidadeSaudeService;
    }

    @PostMapping
    public ResponseEntity<UnidadeSaudeResponseDTO> cadastrar(
            @Valid
            @RequestBody UnidadeSaudeCreateDTO dto){

        return ResponseEntity.ok(
                unidadeSaudeService.cadastrar(dto)
        );
    }

    @GetMapping("/mapa")
    public ResponseEntity<List<UnidadeSaudeMapDTO>> listarMapa(){

        return ResponseEntity.ok(
                unidadeSaudeService.listarMapa()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UnidadeSaudeResponseDTO> buscarId(@PathVariable UUID id){
        return ResponseEntity.ok(unidadeSaudeService.buscarId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UnidadeSaudeResponseDTO> atualizarUnidade(@PathVariable UUID id,
                                                                    @Valid
                                                                    @RequestBody UnidadeSaudeUpdateDTO dto){

        return ResponseEntity.ok(unidadeSaudeService.atualizarUnidade(id,dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUnidade(@PathVariable UUID id){
        unidadeSaudeService.deletarUnidade(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/foto")
    public ResponseEntity<byte[]> buscarFoto(@PathVariable UUID id) {

        UnidadeSaudeFotoDTO foto = unidadeSaudeService.buscarFoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(foto.fotoContentType()))
                .body(foto.foto());
    }

    @PostMapping("/{id}/foto")
    public ResponseEntity<?> uploadFoto(
            @PathVariable UUID id,
            @RequestParam("foto") MultipartFile foto
    ){
        unidadeSaudeService.uploadFoto(id, foto);

        return ResponseEntity.ok().build();
    }
}
