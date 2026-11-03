package br.edu.backend.entity.enums;

public enum TipoAviso {

    MULTIRAO_TESTAGEM,      // -> [Campanhas locais de testagem rápida na comunidade]
    ACAO_INTINERANTE,       // -> [Unidades móveis (vans/ônibus da saúde) que levam insumos e atendimento
                            //     a locais específicos]
    PALESTRAS_WORKSHOP,     // -> [Eventos educativos, rodas de conversa ou treinamentos promovidos
                            //     pela agentes ou parceiros]
    ATUALIZACAO_SERVICO,    // -> [Informações sobre alterações no horário de funcionamento
                            //     ou novos endereços de CTAs e UBSs]
    ALERTA_EPIDEMIOLOGICO,  // -> [Notificações urgentes sobre o aumento de casos de uma IST
                            //     específica em determinada região]
    ATUALIZACAO_PROTOCOLO   // -> [Avisos sobre mudanças nas diretrizes de tratamento, inclusão
                            //     e novos medicamentos no SUS ou novas formas de acesso]
}
