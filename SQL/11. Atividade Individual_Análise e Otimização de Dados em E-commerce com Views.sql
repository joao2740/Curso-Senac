-- Criação da View para Clientes Ativos
CREATE VIEW clientes_ativos AS
SELECT u.id, u.nome, u.email
FROM usuarios u
WHERE EXISTS (
    SELECT 1
    FROM pedidos p
    WHERE p.id = u.id
);
SELECT * FROM clientes_ativos;