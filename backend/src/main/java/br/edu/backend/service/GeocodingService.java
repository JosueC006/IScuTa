package br.edu.backend.service;

import br.edu.backend.dto.CoordenadaDTO;
import org.springframework.stereotype.Service;

@Service
public class GeocodingService {
    public CoordenadaDTO buscar(
            String numero,
            String logradouro,
            String bairro,
            String cidade,
            String estado
    ) {

        // aqui faremos a chamada para a API

        return new CoordenadaDTO(-8.0472, -34.8849);

    }
}
