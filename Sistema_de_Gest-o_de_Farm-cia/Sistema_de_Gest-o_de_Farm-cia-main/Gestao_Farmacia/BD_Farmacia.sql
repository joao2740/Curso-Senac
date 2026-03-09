create database gestao_farmacia;
use gestao_farmacia;

-- Medicamentos (código, nome, princípio ativo, tipo, validade, preço).

create table medicamento(
	id_medicamento int not null auto_increment primary key,
    codigo varchar(100),
    nome varchar(100),
    princ_ativo varchar(100),
    tipo varchar(50),
    validade date,
    preco float(10,2)
);

-- Fornecedores (CNPJ, razão social, contato).

create table fornecedor(
	id_fornecedor int not null auto_increment primary key,
    cnpj varchar(18),
    raz_social varchar(100),
    contato varchar(20)
);

-- Estoque (ID, medicamento, quantidade, lote, validade).

create table estoque(
	id_estoque int not null auto_increment primary key,
    id_medicamento int, -- chave estrangeira
    quantidade int,
    lote varchar(100),
    validade date
);

-- Clientes (CPF, nome, telefone).

create table cliente(
	id_cliente int not null auto_increment primary key,
    cpf varchar(14),
    nome varchar(100),
    telefone varchar(20)
);

-- Receitas Médicas (ID, cliente, CRM, medicamento, validade).

create table receita(
	id_receita int not null auto_increment primary key,
    id_cliente int, -- chave estrangeira
    CRM varchar(100),
    id_medicamento int, -- chave estrangeira
    validade date
);

-- Vendas (ID, cliente, medicamento, quantidade, atendente, valor, data).

create table venda(
	id_venda int not null auto_increment primary key,
    id_cliente int, -- chave estrangeira
    nome_medic varchar(100), -- nome do medicamento
    qtd int,
    atendente varchar(100),
    valor float(10,2),
    data date
);

-- Pagamentos (ID, venda, forma, status).

create table pagamento(
	id_pagamento int not null auto_increment primary key,
    id_venda int, -- chave estrangeira
    forma varchar(20),
    status varchar(20)
);

-- Funcionários (matrícula, nome, cargo, turno).

create table funcionario(
	id_funcionario int not null auto_increment primary key,
    matricula varchar(50),
    nome varchar(100),
    cargo varchar(50),
	turno varchar(50)
);

-- adição de índices

create index idx_medicamento_nome on medicamento (nome);

create index idx_cliente_cpf on cliente (cpf);

create index idx_receita_crm on receita(crm);

-- adição de chaves estrangeiras

alter table estoque 
add constraint fk_estoque_id_medicamento foreign key (id_medicamento) references medicamento(id_medicamento);

alter table receita
add constraint fk_receita_id_cliente foreign key (id_cliente) references cliente(id_cliente);

alter table receita
add constraint fk_receita_id_medicamento foreign key (id_medicamento) references medicamento(id_medicamento);

alter table pagamento
add constraint fk_pagamento_id_venda foreign key (id_venda) references venda(id_venda);