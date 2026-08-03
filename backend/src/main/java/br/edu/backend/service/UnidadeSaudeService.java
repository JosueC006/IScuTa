package br.edu.backend.service;

import br.edu.backend.dto.CoordenadaDTO;
import br.edu.backend.dto.ViaCepResponseDTO;
import br.edu.backend.repository.UnidadeSaudeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import br.edu.backend.dto.unidade.*;
import br.edu.backend.entity.UnidadeSaude;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class UnidadeSaudeService {

    private final UnidadeSaudeRepository unidadeSaudeRepository;
    private final GeocodingService geocodingService;
    private final ViaCepService viaCepService;

    public UnidadeSaudeService(UnidadeSaudeRepository unidadeRepository, GeocodingService geocodingService, ViaCepService viaCepService){
        this.unidadeSaudeRepository = unidadeRepository;
        this.geocodingService = geocodingService;
        this.viaCepService = viaCepService;
    }

    @Transactional
    public List<UnidadeSaudeMapDTO> listarMapa(){
        return unidadeSaudeRepository.findByAtivaTrue()
                .stream()
                .map(UnidadeSaudeMapDTO::new)
        .toList();
    }

    @Transactional
    public UnidadeSaudeResponseDTO buscarId(UUID id){
        UnidadeSaude unidadeSaude = unidadeSaudeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unidade de Saúde não encontrada"));

        return new UnidadeSaudeResponseDTO(unidadeSaude);
    }

    @Transactional
    public UnidadeSaudeResponseDTO cadastrar(UnidadeSaudeCreateDTO dto){

        UnidadeSaude unidade = new UnidadeSaude();

        ViaCepResponseDTO endereco =
                viaCepService.buscar(dto.cep());

        CoordenadaDTO coordenada =
                geocodingService.buscar(
                        endereco.logradouro(),
                        dto.numero(),
                        endereco.bairro(),
                        endereco.localidade(),
                        endereco.uf()
                );

        unidade.setNome(dto.nome());
        unidade.setNumero(dto.numero());
        unidade.setCep(dto.cep());
        unidade.setLogradouro(endereco.logradouro());
        unidade.setBairro(endereco.bairro());
        unidade.setCidade(endereco.localidade());
        unidade.setUf(endereco.uf());

        unidade.setLatitude(coordenada.latitude());
        unidade.setLongitude(coordenada.longitude());
        unidade.setTelefone(dto.telefone());
        unidade.setHorarioFuncionamento(dto.horarioFuncionamento());
        unidade.setRealizaTesteRapido(dto.realizaTesteRapido());
        unidade.setOferecePep(dto.oferecePep());
        unidade.setOferecePrep(dto.oferecePrep());

        unidade = unidadeSaudeRepository.save(unidade);

        return toResponse(unidade);
    }

    @Transactional
    public UnidadeSaudeResponseDTO atualizarUnidade(UUID id, UnidadeSaudeUpdateDTO dto){

        UnidadeSaude unidade = unidadeSaudeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Unidade não encontrada"));

        ViaCepResponseDTO endereco =
                viaCepService.buscar(dto.cep());

        CoordenadaDTO coordenada =
                geocodingService.buscar(
                        dto.numero(),
                        endereco.logradouro(),
                        endereco.bairro(),
                        endereco.localidade(),
                        endereco.uf()
                );

        unidade.setNumero(dto.numero());
        unidade.setCep(dto.cep());

        unidade.setLogradouro(endereco.logradouro());
        unidade.setBairro(endereco.bairro());
        unidade.setCidade(endereco.localidade());
        unidade.setUf(endereco.uf());

        unidade.setTelefone(dto.telefone());
        unidade.setHorarioFuncionamento(dto.horarioFuncionamento());

        unidade.setRealizaTesteRapido(dto.realizaTesteRapido());
        unidade.setOferecePrep(dto.oferecePrep());
        unidade.setOferecePep(dto.oferecePep());

        unidade.setAtiva(dto.ativa());

        unidade.setLatitude(coordenada.latitude());
        unidade.setLongitude(coordenada.longitude());

        return toResponse(unidade);
    }

    @Transactional
    public void deletarUnidade(UUID id){
        UnidadeSaude unidadeSaude = unidadeSaudeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Unidade não encontrada"));

        unidadeSaude.setAtiva(false);
        unidadeSaudeRepository.save(unidadeSaude);
    }

    @Transactional
    public UnidadeSaudeFotoDTO buscarFoto(UUID id) {

        UnidadeSaude unidade = unidadeSaudeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Unidade não encontrada."));

        if (unidade.getFoto() == null || unidade.getFoto().length == 0) {
            throw new RuntimeException("A unidade não possui foto cadastrada.");
        }

        return new UnidadeSaudeFotoDTO(
                unidade.getFoto(),
                unidade.getFotoContentType()
        );
    }

    @Transactional
    public void uploadFoto(UUID id, MultipartFile foto){
        UnidadeSaude unidade =
                unidadeSaudeRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Unidade não encontrada"));

        try {
            unidade.setFoto(foto.getBytes());
            unidade.setFotoContentType(foto.getContentType());

            unidadeSaudeRepository.save(unidade);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar a foto.", e);
        }
    }

    private UnidadeSaudeResponseDTO toResponse(UnidadeSaude unidade){
        return new UnidadeSaudeResponseDTO(unidade);
    }

}
