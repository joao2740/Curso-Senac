CREATE DATABASE prontuario_eletronico;

USE prontuario_eletronico;

-- Tabela de Pacientes
CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo ENUM('M', 'F', 'O'),
    contato VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de Profissionais de Saúde
CREATE TABLE profissionais (
    id_profissional INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    registro_conselho VARCHAR(50) UNIQUE NOT NULL, 
    especialidade VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- Tabela de Atendimentos
CREATE TABLE atendimentos (
    id_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_profissional INT NOT NULL,
    data_hora_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_hora_fim DATETIME,
    status VARCHAR(20) DEFAULT 'Em Aberto',
    tipo_atendimento VARCHAR(50),
    CONSTRAINT fk_atendimento_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    CONSTRAINT fk_atendimento_profissional FOREIGN KEY (id_profissional) REFERENCES profissionais(id_profissional)
) ENGINE=InnoDB;

-- Tabela de Históricos Clínicos
CREATE TABLE historico_clinico (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_atendimento INT NOT NULL,
    queixa_principal TEXT,
    exame_fisico TEXT,
    diagnostico_cid VARCHAR(10),
    prescricao TEXT,
    notas_adicionais TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finalizado TINYINT(1) DEFAULT 0, -- 0 para falso, 1 para verdadeiro
    CONSTRAINT fk_historico_atendimento FOREIGN KEY (id_atendimento) REFERENCES atendimentos(id_atendimento)
) ENGINE=InnoDB;

-- Tabela de Logs
CREATE TABLE logs_acesso (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT NOT NULL,
    id_paciente INT NOT NULL,
    acao VARCHAR(100),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (data_hora), -- Índice para buscas rápidas por período
    CONSTRAINT fk_log_profissional FOREIGN KEY (id_profissional) REFERENCES profissionais(id_profissional),
    CONSTRAINT fk_log_paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
) ENGINE=InnoDB;