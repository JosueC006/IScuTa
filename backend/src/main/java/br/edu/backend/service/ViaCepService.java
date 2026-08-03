package br.edu.backend.service;

import br.edu.backend.dto.ViaCepResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ViaCepService {

    private final RestClient restClient;

    public ViaCepService(RestClient restClient) {
        this.restClient = restClient;
    }

    public ViaCepResponseDTO buscar(String cep) {

        cep = cep.replaceAll("\\D", "");

        ViaCepResponseDTO resposta =
                restClient.get()
                        .uri("https://viacep.com.br/ws/{cep}/json/", cep)
                        .retrieve()
                        .body(ViaCepResponseDTO.class);

        if (resposta == null) {
            throw new RuntimeException("Não foi possível consultar o CEP.");
        }

        if (resposta.erro() != null && resposta.erro()) {
            throw new RuntimeException("CEP não encontrado.");
        }

        return resposta;
    }
}
