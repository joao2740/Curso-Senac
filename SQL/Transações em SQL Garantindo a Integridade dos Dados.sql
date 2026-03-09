-- Cenário: Compra segura

START TRANSACTION;

-- Verificar estoque, bloqueando a linha para evitar concorrência
SELECT estoque
  FROM produtos
 WHERE id = 1
   FOR UPDATE;

-- (Aqui sua aplicação pode checar se estoque >= quantidade desejada, senão ROLLBACK)

INSERT INTO pedidos (cliente_id, data_pedido, status, total)
VALUES (1, NOW(), 'Pago', 360.00);

-- Capturar o id automaticamente gerado
SET @pedido_id = LAST_INSERT_ID();

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (@pedido_id, 1, 2, 180.00);

UPDATE produtos
   SET estoque = estoque - 2
 WHERE id = 1;

COMMIT;


-- Cenário: Cancelamento do pedido

START TRANSACTION;

UPDATE pedidos
   SET status = 'Cancelado'
 WHERE id = @pedido_id;

UPDATE produtos
   SET estoque = estoque + 2
 WHERE id = 1;

COMMIT;


-- Cenário: Alteração em massa com possibilidade de desfazer

START TRANSACTION;

UPDATE produtos
   SET preco = 900.00
 WHERE categoria_id = 1;

SELECT nome, preco
  FROM produtos
 WHERE categoria_id = 1;

-- Se quiser desfazer
ROLLBACK;

-- Verificar que volta ao estado original
SELECT nome, preco
  FROM produtos
 WHERE categoria_id = 1;
