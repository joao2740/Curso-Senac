-- Vamos criar tabelas de exemplo para testar
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS itens_pedido;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_pedido DATETIME NOT NULL,
    total DECIMAL(12,2) NOT NULL
);

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Inserir dados de exemplo
INSERT INTO categorias (nome) VALUES ('Eletrônicos'), ('Livros'), ('Roupas');
INSERT INTO produtos (nome, preco, estoque, categoria_id)
VALUES
  ('Smartphone', 1200.00, 10, 1),
  ('Notebook', 3500.00, 5, 1),
  ('Livro de SQL', 80.00, 20, 2),
  ('Camiseta', 50.00, 30, 3);

-- ===========================================
-- Procedure: listando produtos por categoria
-- ===========================================

DELIMITER //

DROP PROCEDURE IF EXISTS listar_produtos_por_categoria;
CREATE PROCEDURE listar_produtos_por_categoria(
    IN p_categoria_id INT
)
BEGIN
    SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria
    FROM produtos AS p
    JOIN categorias AS c ON p.categoria_id = c.id
    WHERE p.categoria_id = p_categoria_id;
END //

DELIMITER ;

-- Teste
CALL listar_produtos_por_categoria(1);

-- ===========================================
-- Procedure: atualizar preço de categoria
-- ===========================================

DELIMITER //

DROP PROCEDURE IF EXISTS atualizar_preco_categoria;
CREATE PROCEDURE atualizar_preco_categoria(
    IN p_categoria_id INT,
    IN p_novo_preco DECIMAL(10,2),
    OUT p_status VARCHAR(50),
    OUT p_mensagem VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status = 'ERRO';
        -- capturar informação de erro
        GET DIAGNOSTICS CONDITION 1
            @sqlstate = RETURNED_SQLSTATE,
            @msg_text = MESSAGE_TEXT;
        SET p_mensagem = CONCAT('Falha ao atualizar preços: ', @msg_text, ' (SQLSTATE=', @sqlstate, ')');
    END;

    START TRANSACTION;

    UPDATE produtos
    SET preco = p_novo_preco
    WHERE categoria_id = p_categoria_id;

    COMMIT;
    SET p_status = 'OK';
    SET p_mensagem = CONCAT('Preços da categoria ', p_categoria_id, ' atualizados para ', p_novo_preco);
END //

DELIMITER ;

-- Teste
-- SET @stat = ''; SET @msg = '';
-- CALL atualizar_preco_categoria(1, 2000.00, @stat, @msg);
-- SELECT @stat AS status, @msg AS mensagem;

-- ===========================================
-- Procedure: processar novo pedido completo
-- ===========================================

DELIMITER //

DROP PROCEDURE IF EXISTS processar_novo_pedido;
CREATE PROCEDURE processar_novo_pedido(
    IN p_cliente_id INT,
    IN p_produto_id INT,
    IN p_quantidade INT,
    OUT p_status VARCHAR(50),
    OUT p_mensagem VARCHAR(255)
)
BEGIN
    DECLARE v_preco_unitario DECIMAL(10,2);
    DECLARE v_estoque_atual INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status = 'ERRO';
        GET DIAGNOSTICS CONDITION 1
            @sqlstate = RETURNED_SQLSTATE,
            @msg_text = MESSAGE_TEXT;
        SET p_mensagem = CONCAT('Erro ao processar pedido: ', @msg_text, ' (SQLSTATE=', @sqlstate, ')');
    END;

    START TRANSACTION;

    -- Verificar estoque atual, bloqueando linha para evitar concorrência
    SELECT estoque INTO v_estoque_atual
    FROM produtos
    WHERE id = p_produto_id
    FOR UPDATE;

    IF v_estoque_atual < p_quantidade THEN
        ROLLBACK;
        SET p_status = 'ERRO';
        SET p_mensagem = 'Estoque insuficiente';
    ELSE
        -- obter preço unitário
        SELECT preco INTO v_preco_unitario
        FROM produtos
        WHERE id = p_produto_id;

        -- inserir na tabela pedidos
        INSERT INTO pedidos(cliente_id, data_pedido, total)
        VALUES (p_cliente_id, NOW(), v_preco_unitario * p_quantidade);

        -- inserir item do pedido
        INSERT INTO itens_pedido(pedido_id, produto_id, quantidade, preco_unitario)
        VALUES (LAST_INSERT_ID(), p_produto_id, p_quantidade, v_preco_unitario);

        -- reduzir estoque
        UPDATE produtos
        SET estoque = estoque - p_quantidade
        WHERE id = p_produto_id;

        COMMIT;
        SET p_status = 'OK';
        SET p_mensagem = 'Pedido processado com sucesso';
    END IF;

END //

DELIMITER ;



