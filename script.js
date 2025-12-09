// script.js (FINAL REVISADO - Versão Síncrona)

// --- Constantes Globais de Marcadores (Compartilhados entre configs) ---
const sharedMarkerMaterial = "DOENCA_MATERIAL_VALOR";
const sharedMarkerMoral = "DOENCA_MORAL_VALOR";

// ---------------------------------------------------------------------------------
// CONFIGURAÇÃO MESTRA (Frontend UI)
// Mapeia o nome do tópico para os inputs de valor (R$) e informação (Texto) que o GAS espera.
// ---------------------------------------------------------------------------------
const CONFIGS = {
    // --- CONFIGURAÇÃO 1: FAXINEIRO ---
    "Faxineiro": {
        checkboxTitle: "Tópicos Faxineiro",
        topicUI: {
            "DA AUSÊNCIA DE INTERVALO INTRAJORNADA": { 
                name: "Valor estimado DO INTERVALO INTRAJORNADA", 
                label: "Valor Intervalo Intrajornada (R$)",
                infoFields: [
                    { name: "tempo de intervalo intrajornada", label: "Tempo de intervalo intrajornada em minutos (ex.30)" }
                ]
            },
            "DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL": { name: "VALOR DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL", label: "Valor da Ausência dos Interjornada e Intersemanal (R$)" },
            "DAS HORAS EXTRAS 100% - FERIADO E DOMINGO": { name: "VALOR DAS HORAS EXTRAS 100% - FERIADO E DOMINGO", label: "Valor das Horas Extras 100% (R$)" },
            "DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS": { name: "Valor estimado DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS", label: "Valor estimado do Adicional Noturno (R$)" },
            "DAS HORAS DE SOBREAVISO": { name: "Valor estimado DAS HORAS DE SOBREAVISO", label: "Valor estimado das Horas de Sobreaviso (R$)" },
            "DO ADICIONAL DE INSALUBRIDADE": { name: "Valor estimado DO ADICIONAL DE INSALUBRIDADE", label: "Valor estimado do Adicional de Insalubridade (R$)" },
            "DO ADICIONAL DE PERICULOSIDADE": { name: "Valor estimado DO ADICIONAL DE PERICULOSIDADE", label: "Valor estimado do Adicional de Periculosidade (R$)" },
            "DO ACÚMULO DE FUNÇÃO": { 
                name: "Valor estimado DO ACÚMULO DE FUNÇÃO", 
                label: "Valor estimado do Acúmulo de Função (R$)",
                infoFields: [
                    { name: "OUTRA OU OUTRAS FUNÇÕES EXERCIDAS", label: "Outras Funções Exercidas" }
                ]
            },
            "DO DANO MORAL DECORRENTE DE CONDIÇÕES DEGRADANTES DE TRABALHO": { name: "Valor estimado   DO DANO MORAL DECORRENTE DE CONDIÇÕES DEGRADANTES DE TRABALHO", label: "Valor estimado do Dano Moral (R$)" },
            
            "DO ASSÉDIO MORAL": { 
                name: "Valor estimado DO ASSÉDIO MORAL", 
                label: "Valor estimado do Assédio Moral (R$)",
                infoFields: [
                    { name: "CARGO DE QUEM PRATICAVA O ASSÉDIO", label: "Cargo do Assediador" },
                    { name: "NOME DE QUEM PRATICAVA O ASSÉDIO", label: "Nome do Assediador" }
                ]
            },
            "DA EQUIPARAÇÃO SALARIAL": { 
                name: "Valor estimado DA EQUIPARAÇÃO SALARIAL", 
                label: "Valor estimado da Equiparação Salarial (R$)",
                infoFields: [
                    { name: "NOME DO PARADIGMA", label: "Nome do Paradigma" },
                    { name: "DIFERENÇA SALARIAL MENSAL COM O PARADIGMA", label: "Diferença Salarial Mensal" }
                ]
            },
            "DO SALÁRIO SUBSTITUIÇÃO": { 
                name: "Valor estimado DO SALÁRIO SUBSTITUIÇÃO", 
                label: "Valor estimado do Salário Substituição (R$)",
                infoFields: [
                    { name: "CARGO DO SUBSTITUÍDO", label: "Cargo do Substituído" },
                    { name: "NOME DO SUBSTITUÍDO", label: "Nome do Substituído" }
                ]
            },
            "DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO": { name: "Valor estimado DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO", label: "Valor estimado de Prêmios e Incorporação (R$)" },
            "DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL": { name: "Valor estimado DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL", label: "Valor estimado dos Descontos Indevidos (R$)" },
            "DO VALE ALIMENTAÇÃO/VALE CESTA": { name: "Valor estimado DO VALE ALIMENTAÇÃO/VALE CESTA", label: "Valor estimado do Vale Alimentação/Cesta (R$)" },
            "DA MULTA DO ART. 477 DA CLT": { name: "Valor estimado DA MULTA DO ART. 477 DA CLT", label: "Valor estimado da Multa Art. 477 (R$)" },
            
            "DA MULTA CONVENCIONAL": {
                name: "Valor estimado DA MULTA CONVENCIONAL", 
                label: "Valor estimado da Multa Convencional (R$)",
                infoFields: [
                   { name: "clausulas desrepeitadas", label: "Cláusulas desrespeitadas" },
                   { name: "clausula da multa convencional", label: "Cláusula da multa convencional" },
                   { name: "valor da multa convencional", label: "Valor da multa por cláusula desrespeitada" }
                ]
            },

// 🚨 TÓPICOS INDIVIDUAIS DE DOENÇA (CHAVES ÚNICAS: NOME DO TÓPICO É A CHAVE)
            "DA DOENÇA OCUPACIONAL, DEPRESSÃO/ANSIEDADE": { 
                name: "Valor estimado Danos Materiais - T14", // Chave única para o primeiro valor (Material)
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T14", label: "Danos Morais (R$)" }, // Segundo valor (Moral)
                    { name: "DOENÇA OCUPACIONAL ADQUIRIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER CONTRAÍDO A DOENÇA", label: "Motivo da Doença" }
                ]
            },
            "DA DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T15", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T15", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA", label: "Motivo da Doença" }
                ]
            },
            "DA ANSIEDADE/DEPRESSÃO - DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T16", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T16", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },

            // Tópicos Sem Valor Próprio
            "DA MULTA DO ART. 467 DA CLT": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA PARADIGMA": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA SALÁRIO SUBSTITUIÇÃO": { name: "" }
        },
        valorMap: {
            "DAS HORAS EXTRAS": "Valor estimado DAS HORAS EXTRAS (R$)",
            "Valor estimado do PLR": "Valor estimado do PLR (R$)",
            "Valor estimado DO FGTS": "Valor estimado DO FGTS (R$)",
            "Valor estimado DOS REFLEXOS EVENTUALMENTE PAGOS": "Valor estimado dos Reflexos Eventualmente Pagos (R$)"
        }
    }, // <-- Vírgula adicionada

    // --- CONFIGURAÇÃO 2: TRABALHADOR RURAL ---
    "Trabalhador Rural": {
        checkboxTitle: "Tópicos Trabalhador Rural",
        topicUI: {
            // Tópicos com Valor Simples
            "DA JORNADA DE TRABALHO": { name: "" },
            "DA JORNADA DE TRABALHO EM TURNO DE REVEZAMENTO": { name: "Valor estimado DAS DIFERENÇAS SALARIAIS DECORRENTES DO LABOR EM REGIME DE REVEZAMENTO DE TURNOS", label: "Valor estimado Turno de Revezamento (R$)" },
            "DA AUSÊNCIA DE INTERVALO INTRAJORNADA": { 
                name: "Valor estimado DO INTERVALO INTRAJORNADA", 
                label: "Valor Intervalo Intrajornada (R$)",
                infoFields: [
                    { name: "tempo de intervalo intrajornada", label: "Tempo de intervalo intrajornada em minutos (ex.30)" }
                ]
            },
            "DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL": { name: "VALOR DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL", label: "Valor Interjornada e Intersemanal (R$)" },
            "DAS HORAS EXTRAS 100% - FERIADO E DOMINGO": { name: "VALOR DAS HORAS EXTRAS 100% - FERIADO E DOMINGO", label: "Valor Horas Extras 100% (R$)" },
            "DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS": { name: "Valor estimado DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS", label: "Valor Adicional Noturno (R$)" },
            "DAS HORAS DE SOBREAVISO": { name: "Valor estimado DAS HORAS DE SOBREAVISO", label: "Valor Horas de Sobreaviso (R$)" },
            "DA RECUPERAÇÃO TÉRMICA": { name: "Valor estimado DA RECUPERAÇÃO TÉRMICA", label: "Valor Recuperação Térmica (R$)" },
            "DA AUSÊNCIA DE PAUSAS": { name: "Valor estimado DA AUSÊNCIA DE PAUSAS", label: "Valor Ausência de Pausas (R$)" },
            "DO ADICIONAL DE INSALUBRIDADE": { name: "Valor estimado DO ADICIONAL DE INSALUBRIDADE", label: "Valor Adicional de Insalubridade (R$)" },
            "DO ADICIONAL DE PERICULOSIDADE": { name: "Valor estimado DO ADICIONAL DE PERICULOSIDADE", label: "Valor Adicional de Periculosidade (R$)" },
            "DO ACÚMULO DE FUNÇÃO": { 
                name: "Valor estimado DO ACÚMULO DE FUNÇÃO", 
                label: "Valor estimado do Acúmulo de Função (R$)",
                infoFields: [
                    { name: "OUTRA OU OUTRAS FUNÇÕES EXERCIDAS", label: "Outras Funções Exercidas" }
                ]
            },
            "DO DANO MORAL - MEIOS INADEQUADOS À HIGIENE, SAÚDE, DESCANSO, E CONDIÇÕES DEGRADANTES DE TRABALHO": { name: "Valor estimado DO DANO MORAL - MEIOS INADEQUADOS À HIGIENE, SAÚDE, DESCANSO, E CONDIÇÕES DEGRADANTES DE TRABALHO", label: "Valor Dano Moral - Degradação (R$)" },
            
            // Tópicos com InfoFields
            "DO ASSÉDIO MORAL": { 
                name: "Valor estimado DO ASSÉDIO MORAL", 
                label: "Valor Assédio Moral (R$)",
                infoFields: [
                    { name: "CARGO DE QUEM PRATICAVA O ASSÉDIO", label: "Cargo do Assediador" },
                    { name: "NOME DE QUEM PRATICAVA O ASSÉDIO", label: "Nome do Assediador" }
                ]
            },
            "DO ADICIONAL DE PRODUÇÃO": { name: "Valor estimado DO ADICIONAL DE PRODUÇÃO", label: "Valor Adicional de Produção (R$)" },
            "DA EQUIPARAÇÃO SALARIAL": { 
                name: "Valor estimado DA EQUIPARAÇÃO SALARIAL", 
                label: "Valor Equiparação Salarial (R$)",
                infoFields: [
                    { name: "NOME DO PARADIGMA", label: "Nome do Paradigma" },
                    { name: "DIFERENÇA SALARIAL MENSAL COM O PARADIGMA", label: "Diferença Salarial Mensal" }
                ]
            },
            "DO SALÁRIO SUBSTITUIÇÃO": { 
                name: "Valor estimado DO SALÁRIO SUBSTITUIÇÃO", 
                label: "Valor Salário Substituição (R$)",
                infoFields: [
                    { name: "CARGO DO SUBSTITUÍDO", label: "Cargo do Substituído" },
                    { name: "NOME DO SUBSTITUÍDO", label: "Nome do Substituído" }
                ]
            },
            "DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO": { name: "Valor estimado DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO", label: "Valor Prêmios e Incorporação (R$)" },
            "DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL": { name: "Valor estimado DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL", label: "Valor Descontos Indevidos (R$)" },
            "DO VALE ALIMENTAÇÃO/VALE CESTA": { name: "Valor estimado DO VALE ALIMENTAÇÃO/VALE CESTA", label: "Valor Vale Alimentação/Cesta (R$)" },
            "DA MULTA DO ART. 477 DA CLT": { name: "Valor estimado DA MULTA DO ART. 477 DA CLT", label: "Valor Multa Art. 477 (R$)" },

            "DA MULTA CONVENCIONAL": {
                name: "Valor estimado DA MULTA CONVENCIONAL", 
                label: "Valor Multa Convencional (R$)",
                infoFields: [
                   { name: "clausulas desrepeitadas", label: "Cláusulas desrespeitadas" },
                   { name: "clausula da multa convencional", label: "Cláusula da multa convencional" }
                ]
            },

// 🚨 TÓPICOS INDIVIDUAIS DE DOENÇA (CHAVES ÚNICAS - T19, T20, T21)
            "DA DOENÇA OCUPACIONAL, DEPRESSÃO/ANSIEDADE": { 
                name: "Valor estimado Danos Materiais - T19", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T19", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL ADQUIRIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },
            "DA DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T20", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T20", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },
            "DA ANSIEDADE/DEPRESSÃO - DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T21", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T21", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },            

            // Tópicos Sem Valor Próprio
            "DA MULTA DO ART. 467 DA CLT": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA PARADIGMA": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA SALÁRIO SUBSTITUIÇÃO": { name: "" }
        },
        valorMap: {
            "DAS HORAS EXTRAS": "Valor estimado DAS HORAS EXTRAS (R$)",
            "Valor estimado do PLR": "Valor estimado do PLR (R$)",
            "Valor estimado DO FGTS": "Valor estimado DO FGTS (R$)",
            "Valor estimado DOS REFLEXOS EVENTUALMENTE PAGOS": "Valor estimado dos Reflexos Eventualmente Pagos (R$)"
        }
    }, // <-- Vírgula adicionada

    // --- CONFIGURAÇÃO 3: CARRETEIRO ---
    "Carreteiro": {
        checkboxTitle: "Tópicos Carreteiro",
        topicUI: {
            "DA NULIDADE DO PEDIDO DE DEMISSÃO E DO MOTIVO PARA RESCISÃO INDIRETA": { name: "Valor estimado DA NULIDADE DO PEDIDO DE DEMISSÃO E DO MOTIVO PARA RESCISÃO INDIRETA", label: "Valor Nulidade/Rescisão Indireta (R$)" },
            "DA AUSÊNCIA DE INTERVALO INTRAJORNADA": { 
                name: "Valor estimado DO INTERVALO INTRAJORNADA", 
                label: "Valor Intervalo Intrajornada (R$)",
                infoFields: [
                    { name: "tempo de intervalo intrajornada", label: "Tempo de intervalo intrajornada em minutos (ex.30)" }
                ]
            },
            "DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL": { name: "VALOR DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL", label: "Valor Interjornada e Intersemanal (R$)" },
            "DAS HORAS EXTRAS 100% - FERIADO E DOMINGO": { name: "VALOR DAS HORAS EXTRAS 100% - FERIADO E DOMINGO", label: "Valor Horas Extras 100% (R$)" },
            "DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS": { name: "Valor estimado DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS", label: "Valor Adicional Noturno (R$)" },
            "DAS HORAS DE SOBREAVISO": { name: "Valor estimado DAS HORAS DE SOBREAVISO", label: "Valor Horas de Sobreaviso (R$)" },
            "DO TEMPO DE ESPERA": { name: "Valor estimado DO TEMPO DE ESPERA", label: "Valor Tempo de Espera (R$)" },
            "DA AUSÊNCIA DE PAUSAS": { name: "Valor estimado DA AUSÊNCIA DE PAUSAS", label: "Valor Ausência de Pausas (R$)" },
            "DO ADICIONAL DE INSALUBRIDADE": { name: "Valor estimado DO ADICIONAL DE INSALUBRIDADE", label: "Valor Adicional de Insalubridade (R$)" },
            "DO ADICIONAL DE PERICULOSIDADE": { name: "Valor estimado DO ADICIONAL DE PERICULOSIDADE", label: "Valor Adicional de Periculosidade (R$)" },
            "DO ACÚMULO DE FUNÇÃO": { 
                name: "Valor estimado DO ACÚMULO DE FUNÇÃO", 
                label: "Valor estimado do Acúmulo de Função (R$)",
                infoFields: [
                    { name: "OUTRA OU OUTRAS FUNÇÕES EXERCIDAS", label: "Outras Funções Exercidas" }
                ]
            },
            "DO DANO EXISTENCIAL – A JORNADA EXAUSTIVA E A SUPRESSÃO DO DIREITO À VIDA": { name: "Valor estimado DA INDENIZAÇÃO POR DANO EXISTENCIAL", label: "Valor Dano Existencial (R$)" },
            "DO DANO MORAL - EXCESSO DE CARGA": { name: "Valor estimado DO DANO MORAL POR EXCESSO DE CARGA", label: "Valor Dano Moral - Excesso de Carga (R$)" },
            "DO DANO MORAL MEIOS INADEQUADOS À HIGIENE, SAÚDE, DESCANSO, E CONDIÇÕES DEGRADANTES DE TRABALHO": { name: "Valor estimado DO DANO MORAL POR CONDIÇÕES DEGRADANTES DE TRABALHO", label: "Valor Dano Moral - Degradação (R$)" },
            
            "DO ASSÉDIO MORAL - COBRANÇA EXCESSIVA E EXPOSIÇÃO DE METAS": { 
                name: "Valor estimado DO DANO MORAL POR EXPOSIÇÃO DE METAS E COBRANÇAS ABUSIVAS", 
                label: "Valor Dano Moral - Assédio (R$)",
                infoFields: [
                    { name: "CARGO DE QUEM PRATICAVA O ASSÉDIO", label: "Cargo do Assediador" },
                    { name: "NOME DE QUEM PRATICAVA O ASSÉDIO", label: "Nome do Assediador" }
                ]
            },
            "DA DIFERENÇA DE DIÁRIAS E DA INTEGRAÇÃO": { name: "Valor estimado DA DIFERENÇA DE DIÁRIAS E DA INTEGRAÇÃO", label: "Valor Diferença de Diárias e Integração (R$)" },
            
            "DA INTEGRAÇÃO DAS COMISSÕES PAGAS POR FORA E SEUS REFLEXOS": { 
                name: "Valor estimado DA INTEGRAÇÃO DAS COMISSÕES PAGAS POR FORA E SEUS REFLEXOS", 
                label: "Valor Integração de Comissões (R$)",
                infoFields: [
                    { name: "Valor médio das comissões pagas por fora", label: "Valor médio das comissões pagas por fora (R$ ou texto)" }
                ]
            },
            "DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO": { name: "Valor estimado DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO", label: "Valor Prêmios e Incorporação (R$)" },
            
            "DOS DESCONTOS INDEVIDOS – AVARIAS VEÍCULO": { 
                name: "valor estimado DOS DESCONTOS DE AVARIAS", 
                label: "Valor Descontos de Avarias (R$)",
                infoFields: [
                    { name: "mês do desconto indevido de avarias", label: "Mês do Desconto" },
                    { name: "detalhe da avaria descontada", label: "Detalhe da Avaria" },
                    { name: "discriminação do desconto de avarias no holerite", label: "Discriminação no Holerite" }
                ]
            },
            
            "DO RESSARCIMENTO DE DESPESAS": { 
                name: "Valor do estimado DO RESSARCIMENTO DE DESPESAS COM DADOS", 
                label: "Valor Ressarcimento de Despesas (R$)",
                infoFields: [
                    { name: "Valor mensal das despesas com dados", label: "Valor mensal das despesas com dados (R$)" }
                ]
            },
            "DO VALE ALIMENTAÇÃO/VALE CESTA": { name: "Valor estimado DO VALE ALIMENTAÇÃO/VALE CESTA", label: "Valor Vale Alimentação/Cesta (R$)" },
            "DA MULTA DO ART. 477 DA CLT": { name: "Valor estimado DA MULTA DO ART. 477 DA CLT", label: "Valor Multa Art. 477 (R$)" },

            "DA MULTA CONVENCIONAL": {
                name: "Valor estimado DA MULTA CONVENCIONAL", 
                label: "Valor Multa Convencional (R$)",
                infoFields: [
                   { name: "clausulas desrepeitadas", label: "Cláusulas desrespeitadas" },
                   { name: "clausula da multa convencional", label: "Cláusula da multa convencional" }
                ]
            },

            // Tópicos Sem Valor Próprio
            "DA MULTA DO ART. 467 DA CLT": { name: "" }
        },
        valorMap: {
            "DAS HORAS EXTRAS": "Valor estimado DAS HORAS EXTRAS (R$)",
            "DIFERENÇAS SALARIAIS DECORRENTES DO LABOR EM REGIME DE REVEZAMENTO DE TURNOS": "Valor estimado Diferenças Turno Revezamento (R$)",
            "Valor estimado do PLR": "Valor estimado do PLR (R$)",
            "Valor estimado DO FGTS": "Valor estimado DO FGTS (R$)",
            "Valor estimado DOS REFLEXOS EVENTUALMENTE PAGOS": "Valor estimado dos Reflexos Eventualmente Pagos (R$)"
        }
    }, // <-- Vírgula adicionada

    // --- CONFIGURAÇÃO 4: GERAL ---
    "Geral": {
        checkboxTitle: "Tópicos Inicial Geral",
        topicUI: {
            "DA JORNADA DE TRABALHO": { name: "" },
            "DA JORNADA DE TRABALHO EM TURNO DE REVEZAMENTO": { name: "Valor estimado DAS DIFERENÇAS SALARIAIS DECORRENTES DO LABOR EM REGIME DE REVEZAMENTO DE TURNOS", label: "Valor Turno de Revezamento (R$)" },
            "DA AUSÊNCIA DE INTERVALO INTRAJORNADA": { 
                name: "Valor estimado DO INTERVALO INTRAJORNADA", 
                label: "Valor Intervalo Intrajornada (R$)",
                infoFields: [
                    { name: "tempo de intervalo intrajornada", label: "Tempo de intervalo intrajornada em minutos (ex.30)" }
                ]
            },
            "DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL": { name: "VALOR DA AUSÊNCIA DOS INTERVALOS INTERJORNADA E INTERSEMANAL", label: "Valor Interjornada e Intersemanal (R$)" },
            "DAS HORAS EXTRAS 100% - FERIADO E DOMINGO": { name: "VALOR DAS HORAS EXTRAS 100% - FERIADO E DOMINGO", label: "Valor Horas Extras 100% (R$)" },
            "DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS": { name: "Valor estimado DO ADICIONAL NOTURNO, PRORROGAÇÃO E REDUÇÃO DE HORAS NOTURNAS", label: "Valor Adicional Noturno (R$)" },
            "DAS HORAS DE SOBREAVISO": { name: "Valor estimado DAS HORAS DE SOBREAVISO", label: "Valor Horas de Sobreaviso (R$)" },
            "DO ADICIONAL DE INSALUBRIDADE": { name: "Valor estimado DO ADICIONAL DE INSALUBRIDADE", label: "Valor Adicional de Insalubridade (R$)" },
            "DO ADICIONAL DE PERICULOSIDADE": { name: "Valor estimado DO ADICIONAL DE PERICULOSIDADE", label: "Valor Adicional de Periculosidade (R$)" },
            "DO ACÚMULO DE FUNÇÃO": { 
                name: "Valor estimado DO ACÚMULO DE FUNÇÃO", 
                label: "Valor estimado do Acúmulo de Função (R$)",
                infoFields: [
                    { name: "OUTRA OU OUTRAS FUNÇÕES EXERCIDAS", label: "Outras Funções Exercidas" }
                ]
            },
            
            "DO ASSÉDIO MORAL": { 
                name: "Valor estimado DO ASSÉDIO MORAL", 
                label: "Valor Assédio Moral (R$)",
                infoFields: [
                    { name: "CARGO DE QUEM PRATICAVA O ASSÉDIO", label: "Cargo do Assediador" },
                    { name: "NOME DE QUEM PRATICAVA O ASSÉDIO", label: "Nome do Assediador" }
                ]
            },
            "DA EQUIPARAÇÃO SALARIAL": { 
                name: "Valor estimado DA EQUIPARAÇÃO SALARIAL", 
                label: "Valor Equiparação Salarial (R$)",
                infoFields: [
                    { name: "NOME DO PARADIGMA", label: "Nome do Paradigma" },
                    { name: "DIFERENÇA SALARIAL MENSAL COM O PARADIGMA", label: "Diferença Salarial Mensal" }
                ]
            },
            "DO SALÁRIO SUBSTITUIÇÃO": { 
                name: "Valor estimado DO SALÁRIO SUBSTITUIÇÃO", 
                label: "Valor Salário Substituição (R$)",
                infoFields: [
                    { name: "CARGO DO SUBSTITUÍDO", label: "Cargo do Substituído" },
                    { name: "NOME DO SUBSTITUÍDO", label: "Nome do Substituído" }
                ]
            },
            "DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO": { name: "Valor estimado DOS VALORES PAGOS A TÍTULO DE PRÊMIO E PEDIDO DE INCORPORAÇÃO", label: "Valor Prêmios e Incorporação (R$)" },
            "DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL": { name: "Valor estimado DOS DESCONTOS INDEVIDOS DA VERBA SALARIAL", label: "Valor Descontos Indevidos (R$)" },
            "DO VALE ALIMENTAÇÃO/VALE CESTA": { name: "Valor estimado DO VALE ALIMENTAÇÃO/VALE CESTA", label: "Valor Vale Alimentação/Cesta (R$)" },
            "DA MULTA DO ART. 477 DA CLT": { name: "Valor estimado DA MULTA DO ART. 477 DA CLT", label: "Valor Multa Art. 477 (R$)" },

            "DA MULTA CONVENCIONAL": {
                name: "Valor estimado DA MULTA CONVENCIONAL", 
                label: "Valor Multa Convencional (R$)",
                infoFields: [
                   { name: "clausulas desrepeitadas", label: "Cláusulas desrespeitadas" },
                   { name: "clausula da multa convencional", label: "Cláusula da multa convencional" }
                ]
            },


// 🚨 TÓPICOS INDIVIDUAIS DE DOENÇA (CHAVES ÚNICAS - T15, T16, T17)
            "DA DOENÇA OCUPACIONAL, DEPRESSÃO/ANSIEDADE": { 
                name: "Valor estimado Danos Materiais - T15", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T15", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },
            "DA DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T16", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T16", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },
            "DA ANSIEDADE/DEPRESSÃO - DOENÇA OCUPACIONAL": { 
                name: "Valor estimado Danos Materiais - T17", 
                label: "Danos Materiais (R$)",
                infoFields: [
                    { name: "Valor estimado Danos Morais - T17", label: "Danos Morais (R$)" },
                    { name: "DOENÇA OCUPACIONAL DESENVOLVIDA", label: "Doença Ocupacional Desenvolvida" },
                    { name: "MOTIVO DE TER DESENVOLVIDO A DOENÇA OCUPACIONAL", label: "Motivo da Doença" }
                ]
            },            

            // Tópicos Sem Valor Próprio
            "DA MULTA DO ART. 467 DA CLT": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA PARADIGMA": { name: "" },
            "INVERSÃO DO ÔNUS DA PROVA SALÁRIO SUBSTITUIÇÃO": { name: "" }
        },

        valorMap: {
            "DAS HORAS EXTRAS": "Valor estimado DAS HORAS EXTRAS (R$)",
            "Valor estimado do PLR": "Valor estimado do PLR (R$)",
            "Valor estimado DO FGTS": "Valor estimado DO FGTS (R$)",
            "Valor estimado DOS REFLEXOS EVENTUALMENTE PAGOS": "Valor estimado dos Reflexos Eventualmente Pagos (R$)"
        }
    }
};

// =================================================================================
// INÍCIO DAS FUNÇÕES DE DOM
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Popula as opções da Petição Principal
    const triagemSelect = document.getElementById('triagem-peticao');
    if (CONFIGS && typeof CONFIGS === 'object') {
        Object.keys(CONFIGS).forEach(key => {
            const option = new Option(key, key);
            triagemSelect.add(option);
        });
    }

    // 2. Adiciona os listeners para as mudanças
    triagemSelect.addEventListener('change', updateFormUI);
    document.getElementById('genero-reclamante').addEventListener('change', updateFormUI);
    // Adiciona o listener para o formulário
    document.getElementById('peticao-form').addEventListener('submit', handleSubmit);
    
    // Chamar uma vez para configurar a UI inicial (usando o primeiro item)
    updateFormUI();
});

// ---------------------------------------------------------------------------------
// FUNÇÕES DE MANIPULAÇÃO DA INTERFACE (DOM)
// ---------------------------------------------------------------------------------

/**
 * Atualiza a UI quando a Petição ou Gênero é alterado.
 */
function updateFormUI() {
    const selectedType = document.getElementById('triagem-peticao').value;
    const topicsContainer = document.getElementById('topics-container');
    const complementosContainer = document.getElementById('complementos-container');
    
    // Limpar conteúdos anteriores
    topicsContainer.innerHTML = '';
    complementosContainer.innerHTML = '';

    // Limpar e Adicionar campos fixos que devem estar sempre visíveis (ex: FGTS, PLR)
    renderFixedFields(selectedType, complementosContainer);

    if (!selectedType || !CONFIGS[selectedType]) {
        return;
    }

    const currentConfig = CONFIGS[selectedType];

    // --- 1. Exibir Checkboxes de Tópicos ---
    const topicsTitle = document.createElement('h3');
    topicsTitle.textContent = currentConfig.checkboxTitle;
    topicsContainer.appendChild(topicsTitle);
    
    // Mapeamento de Tópicos (Ex: "DA AUSÊNCIA DE INTERVALO INTRAJORNADA")
    for (const topicName in currentConfig.topicUI) {
        
        const div = document.createElement('div');
        div.className = 'form-group-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // Usamos o NOME COMPLETO como ID e VALUE, pois o GAS espera o nome no array 'topicos'
        checkbox.id = topicName.replace(/\s/g, '_').replace(/[\(\)]/g, ''); 
        checkbox.name = 'topicos';
        checkbox.value = topicName;
        checkbox.addEventListener('change', () => updateComplementosUI(currentConfig, topicName));
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = topicName;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        topicsContainer.appendChild(div);
    }
}

/**
 * Renderiza campos de valor fixos (PLR, FGTS) que não são ligados a um checkbox específico.
 */
function renderFixedFields(selectedType, container) {
    if (!CONFIGS[selectedType]) return;
    const currentConfig = CONFIGS[selectedType];
    const fixedTitle = container.querySelector('h3.fixed-title');

    if (!fixedTitle) {
        const compTitle = document.createElement('h3');
        compTitle.textContent = 'Valores Fixos e Outros Complementos';
        compTitle.className = 'fixed-title';
        container.appendChild(compTitle);
    }
    
    // Adiciona campos fixos (Horas Extras, PLR, FGTS, Reflexos)
    for (const marker in currentConfig.valorMap) {
        if (marker.includes(sharedMarkerMaterial) || marker.includes(sharedMarkerMoral)) continue; // Ignora marcadores compartilhados
        
        const labelText = currentConfig.valorMap[marker];
        // O ID/NAME é o próprio marcador do GAS
        if (!document.getElementById(marker)) {
             renderComplementoField(container, marker, labelText, 'number', 'fixed');
        }
    }
}

/**
 * Atualiza a UI de Complementos quando um checkbox é marcado/desmarcado.
 */
function updateComplementosUI(config, topicName) {
    const checkboxId = topicName.replace(/\s/g, '_').replace(/[\(\)]/g, ''); 
    const checkbox = document.getElementById(checkboxId);
    const complementosContainer = document.getElementById('complementos-container');
    const topicConfig = config.topicUI[topicName];

    if (!topicConfig) return; 

    const existingGroup = document.getElementById(`complemento-group-${checkboxId}`);
    
    if (checkbox.checked) {
        const complementoGroup = document.createElement('div');
        complementoGroup.id = `complemento-group-${checkboxId}`;
        complementoGroup.className = 'complemento-group';

        // --- 1. Lógica para Tópicos Compartilhados (Valores R$) ---
        if (topicConfig.shared) {
            topicConfig.shared.forEach(marker => {
                if (!document.getElementById(marker)) {
                    const labelText = config.valorMap[marker];
                    renderComplementoField(complementoGroup, marker, labelText, 'number', 'shared');
                }
            });
        }
        
        // --- 2. Lógica para Tópicos Simples (Valor R$) ---
        else if (topicConfig.name && topicConfig.name !== "") {
             renderComplementoField(complementoGroup, topicConfig.name, topicConfig.label, 'number', 'dynamic');
        }

        // --- 3. Lógica para Complementos de INFORMAÇÃO (Texto/Outros) ---
        if (topicConfig.infoFields && topicConfig.infoFields.length > 0) {
             topicConfig.infoFields.forEach(field => {
                 // Usa o nome do campo como ID/NAME. Assume type: 'text' por padrão
                 renderComplementoField(complementoGroup, field.name, field.label, field.type || 'text', 'info');
             });
        }
        
        if (complementoGroup.hasChildNodes()) {
            complementosContainer.appendChild(complementoGroup);
        }

    } else if (existingGroup) {
        // --- REMOÇÃO ---
        existingGroup.remove();
        
        // Lógica de remoção para campos compartilhados
        if (topicConfig.shared) {
             const sharedMarkers = topicConfig.shared;
             
             const otherCheckedTopicsUseMarker = Object.keys(config.topicUI).some(otherTopicName => {
                 if (otherTopicName === topicName) return false; 
                 const otherCheckboxId = otherTopicName.replace(/\s/g, '_').replace(/[\(\)]/g, '');
                 const otherCheckbox = document.getElementById(otherCheckboxId);
                 const otherTopicConfig = config.topicUI[otherTopicName];
                 
                 if (otherCheckbox && otherCheckbox.checked && otherTopicConfig && otherTopicConfig.shared) {
                      return otherTopicConfig.shared.some(m => sharedMarkers.includes(m));
                 }
                 return false;
             });

             if (!otherCheckedTopicsUseMarker) {
                sharedMarkers.forEach(marker => {
                    const fieldToRemove = document.getElementById(marker);
                    if(fieldToRemove) fieldToRemove.closest('.form-group').remove();
                });
             }
        }
    }
}

/**
 * Função utilitária para renderizar um campo de complemento.
 * * Esta função foi revisada para forçar 'type="text"' em valores monetários, 
 * permitindo a entrada no padrão brasileiro (vírgula).
 */
function renderComplementoField(container, nameAttribute, labelText, inputType, groupType) {
    const formGroup = document.createElement('div');
    formGroup.className = `form-group ${groupType}-field`;
    formGroup.id = nameAttribute; 

    const label = document.createElement('label');
    label.htmlFor = nameAttribute;
    label.textContent = labelText;

    // 🚨 CORREÇÃO: Força type="text" para todos os valores monetários (inputType === 'number')
    if (inputType === 'number') {
        inputType = 'text'; 
    }
    
    // Cria o elemento de input
    const input = document.createElement('input');
    input.type = inputType; 
    input.id = nameAttribute;
    input.name = nameAttribute; // CRUCIAL: O NOME É A CHAVE ESPERADA PELO GAS
    
    // Define a obrigatoriedade
    if (inputType === 'text' || inputType === 'date') { 
        input.required = true;
    }
    
    // Formatação de Placeholders e Campos
    if (nameAttribute.includes("Valor estimado") || nameAttribute.includes("VALOR DA AUSÊNCIA")) {
        // Se for campo de valor (monetário), usa o placeholder PT-BR
        input.placeholder = "0.000,00"; 
    }
    
    // Para campos longos de texto (descrições/cláusulas), usa textarea
    if (nameAttribute.includes("clausulas") || nameAttribute.includes("detalhe da avaria")) {
        const textarea = document.createElement('textarea');
        textarea.name = nameAttribute;
        textarea.id = nameAttribute;
        textarea.rows = 2;
        
        formGroup.appendChild(label);
        formGroup.appendChild(textarea);
    } else {
        formGroup.appendChild(label);
        formGroup.appendChild(input);
    }
    
    container.appendChild(formGroup);
}

// ---------------------------------------------------------------------------------
// FUNÇÃO DE INTEGRAÇÃO COM O BACKEND GAS (SÍNCRONA)
// ---------------------------------------------------------------------------------

/**
 * Lida com a submissão do formulário, coletando os dados e enviando-os ao GAS.
 */
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // ... (Definição de GAS_WEB_APP_URL e verificação de URL) ...
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyOC223ogz4JFp8T7Di3O5Joie1T6QRQENxWRbGVydNAkxKxmxt58yS7Q0xGqT5E08/exec'; 
    const outputArea = document.getElementById('output-area');

    if (GAS_WEB_APP_URL === 'SEU_URL_DE_DEPLOY_AQUI') {
        outputArea.innerHTML = '<p class="error">⚠️ **ERRO:** Substitua o placeholder do URL do GAS.</p>';
        return;
    }
    
    // 1. Coletar Payload (Item Responses)
    const itemResponses = {};
    const formData = new FormData(form);
    const selectedTopicsArray = [];
    
    for (let [key, value] of formData.entries()) {
        if (key === 'topicos') {
            selectedTopicsArray.push(value); 
        } else {
            itemResponses[key] = value;
        }
    }
    
    itemResponses['topicos'] = selectedTopicsArray; 
    const payload = { responses: itemResponses };

    outputArea.innerHTML = '<p class="loading">⏳ Processando... Enviando dados para o Google Apps Script...</p>';

    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', 
            },
            body: JSON.stringify(payload)
        });

        // 🚨 MUDANÇA CRÍTICA: Leia a resposta como texto, não JSON
        const responseText = await response.text();
        let result = null;

        try {
            // Tenta parsear o texto como JSON
            result = JSON.parse(responseText);
        } catch (e) {
            // Se o parsing falhar (porque recebeu HTML de erro ou resposta vazia)
            console.error("Erro ao parsear JSON. Resposta bruta:", responseText);
            // Simula um erro interno do GAS para feedback ao usuário
            result = { status: "ERROR", message: "Falha de comunicação ou resposta inválida do servidor GAS.", detail: responseText };
        }
        
        // 2. Trata o Resultado
        if (result && result.status === "SUCCESS") {
            outputArea.innerHTML = `
                <h2>✅ Documento Gerado e Enviado!</h2>
                <p>O processo foi concluído com sucesso e o documento foi criado no Google Drive.</p>
                <p class="success">Por favor, verifique seu e-mail (${itemResponses["E-mail"] || 'fornecido'}) para acessar o link do arquivo.</p>
            `;
            form.reset(); 
        } else {
            // Trata o status "ERROR" ou o erro de parse (se cair no catch interno)
            outputArea.innerHTML = `
                <h2>❌ Falha no Processamento</h2>
                <p>A geração falhou, mas a comunicação foi registrada. ${result.message || 'Verifique o console para detalhes.'}</p>
                <p>Detalhe técnico: ${result.detail || 'Resposta Inválida (Consulte F12)'}</p>
            `;
        }

    } catch (error) {
        console.error("Erro fatal de rede ou CORS:", error);
        outputArea.innerHTML = `
            <h2>❌ Erro de Rede</h2>
            <p>Não foi possível conectar ao serviço. Verifique a URL do GAS e a conexão de rede.</p>
        `;
    }
}