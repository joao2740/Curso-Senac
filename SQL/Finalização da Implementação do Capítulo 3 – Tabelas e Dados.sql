-- Tabela clientes
CREATE TABLE clientes (
  cliente_id INT NOT NULL AUTO_INCREMENT,
  codigo_cliente VARCHAR(10) NOT NULL,
  nome_cliente VARCHAR(100) NOT NULL,
  razao_cliente VARCHAR(100),
  data_cadastro DATE,
  cnpj_cliente VARCHAR(20),
  telefone_cliente VARCHAR(20),
  PRIMARY KEY (cliente_id)
);

-- Tabela produtos
CREATE TABLE produtos (
  produto_id INT NOT NULL AUTO_INCREMENT,
  codigo_produto VARCHAR(20) NOT NULL,
  nome_produto VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  estoque INT NOT NULL DEFAULT 0,
  PRIMARY KEY (produto_id)
);

-- Tabela vendas
CREATE TABLE vendas (
  venda_id INT NOT NULL AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  data_venda DATE NOT NULL,
  valor_total DECIMAL(12,2),
  PRIMARY KEY (venda_id)
);

-- Tabela itens_venda (itens de cada venda)
CREATE TABLE itens_venda (
  item_id INT NOT NULL AUTO_INCREMENT,
  venda_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (item_id)
);

-- Tabela contatos (por exemplo, contato de clientes)
CREATE TABLE contatos (
  contato_id INT NOT NULL AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  nome_contato VARCHAR(200),
  telefone_contato VARCHAR(30),
  cidade_contato VARCHAR(200),
  estado_contato VARCHAR(2),
  PRIMARY KEY (contato_id)
);

ALTER TABLE vendas
  ADD CONSTRAINT fk_vendas_clientes
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(cliente_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE itens_venda
  ADD CONSTRAINT fk_itens_venda_vendas
    FOREIGN KEY (venda_id)
    REFERENCES vendas(venda_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE itens_venda
  ADD CONSTRAINT fk_itens_venda_produtos
    FOREIGN KEY (produto_id)
    REFERENCES produtos(produto_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE contatos
  ADD CONSTRAINT fk_contatos_clientes
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(cliente_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE clientes
  ADD COLUMN email_cliente VARCHAR(100);

ALTER TABLE clientes
  MODIFY COLUMN telefone_cliente VARCHAR(30);
