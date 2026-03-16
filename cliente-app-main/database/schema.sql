CREATE DATABASE clientes_db;

USE clientes_db;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120),
    telefone VARCHAR(20),
    empresa VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);