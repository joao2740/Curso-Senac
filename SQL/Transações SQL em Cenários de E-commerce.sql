-- Supostas tabelas
CREATE TABLE produtos (
    produto_id     SERIAL PRIMARY KEY,
    nome           TEXT NOT NULL,
    categoria_id   INT NOT NULL,
    estoque        INT NOT NULL CHECK (estoque >= 0),
    preco          NUMERIC(10,2) NOT NULL
);

CREATE TABLE pedidos (
    pedido_id    SERIAL PRIMARY KEY,
    data         TIMESTAMP NOT NULL DEFAULT NOW(),
    cliente_id   INT NOT NULL
);

CREATE TABLE pedido_itens (
    pedido_item_id SERIAL PRIMARY KEY,
    pedido_id      INT NOT NULL REFERENCES pedidos(pedido_id),
    produto_id     INT NOT NULL REFERENCES produtos(produto_id),
    quantidade     INT NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE auditoria_estoque (
    auditoria_id     SERIAL PRIMARY KEY,
    produto_id       INT NOT NULL REFERENCES produtos(produto_id),
    data_hora        TIMESTAMP NOT NULL DEFAULT NOW(),
    quantidade_antiga INT NOT NULL,
    quantidade_nova   INT NOT NULL,
    motivo           TEXT
);

-- --- Cenário 1: Venda por lote ---
-- Supomos que vamos vender 5 unidades do produto 101 e 3 unidades do produto 202 para o cliente 12345

BEGIN;

-- Lock nos produtos para evitar concorrência
SELECT estoque INTO _estoque1 FROM produtos WHERE produto_id = 101 FOR UPDATE;
SELECT estoque INTO _estoque2 FROM produtos WHERE produto_id = 202 FOR UPDATE;

-- Verificar se estoque suficiente
IF _estoque1 < 5 OR _estoque2 < 3 THEN
    ROLLBACK;
    RAISE EXCEPTION 'Estoque insuficiente para um dos produtos';
END IF;

-- Diminuir estoques
UPDATE produtos SET estoque = estoque - 5 WHERE produto_id = 101;
UPDATE produtos SET estoque = estoque - 3 WHERE produto_id = 202;

-- Inserir pedido
INSERT INTO pedidos (cliente_id) VALUES (12345) RETURNING pedido_id INTO _pedido_id;

-- Inserir itens do pedido
INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario)
VALUES
    (_pedido_id, 101, 5, (SELECT preco FROM produtos WHERE produto_id = 101)),
    (_pedido_id, 202, 3, (SELECT preco FROM produtos WHERE produto_id = 202));

COMMIT;


-- --- Cenário 2: Auditoria de Estoque ---
-- Supomos ajustar +20 unidades no produto 303, motivo “Reabastecimento”

BEGIN;

-- Lock e leitura do estoque antigo
SELECT estoque INTO _estoque_antigo FROM produtos WHERE produto_id = 303 FOR UPDATE;

-- Atualiza estoque
UPDATE produtos
SET estoque = estoque + 20
WHERE produto_id = 303;

-- Registrar auditoria
INSERT INTO auditoria_estoque (produto_id, quantidade_antiga, quantidade_nova, motivo)
VALUES (303, _estoque_antigo, _estoque_antigo + 20, 'Reabastecimento');

COMMIT;


-- --- Cenário 3: Promoção‑Relâmpago ---
-- Supondo categoria_id = 10, desconto de 20%

BEGIN;

UPDATE produtos
SET preco = preco * 0.80
WHERE categoria_id = 10;

-- aqui poderia fazer verificações, por exemplo ver quantos produtos foram afetados,
-- ou testar se preços ficaram incorretos etc.

-- Como regra é desfazer tudo, fazemos rollback
ROLLBACK;


-- Fim dos cenários
