package br.edu.backend.service;

import br.edu.backend.dto.CoordenadaDTO;
import br.edu.backend.dto.NominatimResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GeocodingService {

    private final RestClient restClient;

    public GeocodingService(RestClient restClient){
        this.restClient = restClient;
    }

    private NominatimResponseDTO[] consultar(String endereco) {

        System.out.println("Buscando: " + endereco);

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("nominatim.openstreetmap.org")
                        .path("/search")
                        .queryParam("q", endereco)
                        .queryParam("format", "json")
                        .queryParam("limit", 1)
                        .build())
                .header("User-Agent", "ISCuTa")
                .retrieve()
                .body(NominatimResponseDTO[].class);
    }

    public CoordenadaDTO buscar(
            String numero,
            String logradouro,
            String bairro,
            String localidade,
            String uf
    ) {

        String[] tentativas = {
                numero + ", " + logradouro + ", " + bairro + ", " + localidade + ", " + uf,
                logradouro + ", " + bairro + ", " + localidade + ", " + uf,
                bairro + ", " + localidade + ", " + uf,
                localidade + ", " + uf
        };

        for (String endereco : tentativas) {

            NominatimResponseDTO[] resposta = consultar(endereco);

            if (resposta != null && resposta.length > 0) {

                return new CoordenadaDTO(
                        Double.parseDouble(resposta[0].lat()),
                        Double.parseDouble(resposta[0].lon())
                );

            }
        }
        throw new RuntimeException("Endereço não encontrado.");
    }

}
