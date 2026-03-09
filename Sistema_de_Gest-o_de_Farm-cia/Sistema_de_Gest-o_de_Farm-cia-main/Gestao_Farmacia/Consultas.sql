-- -----------------------------------
-- ===Consultas Básicas de Listagem===
-- -----------------------------------

-- Listar todos os medicamentos disponíveis:
SELECT * FROM medicamento;

-- Listar todos os clientes cadastrados:
SELECT * FROM cliente;

-- Listar todos os funcionários que trabalham no turno da manhã:
SELECT * FROM funcionario WHERE turno = 'Manhã';

-- Listar todos os fornecedores com seus respectivos CNPJs:
SELECT raz_social, cnpj FROM fornecedor;

-- Listar todas as receitas médicas válidas (validade futura):
SELECT * FROM receita WHERE validade >= CURDATE();

-- ---------------------------------------
-- ===Consultas com Filtros e Condições===
-- ---------------------------------------

-- Buscar medicamentos que vencem neste mês:
SELECT * FROM medicamento
WHERE MONTH(validade) = MONTH(CURDATE()) AND YEAR(validade) = YEAR(CURDATE());

-- Listar medicamentos com preço maior que R$ 50,00:
SELECT * FROM medicamento WHERE preco > 50;

-- Listar os clientes com CPF que começa com '123':
SELECT * FROM cliente WHERE cpf LIKE '123%';

-- Buscar estoques com quantidade inferior a 60 unidades:
SELECT * FROM estoque WHERE quantidade < 60;

-- Buscar vendas realizadas por um atendente específico:
SELECT * FROM venda WHERE atendente = 'Juliana Alves';

-- ---------------------------------------------------------
-- ===Consultas com JOINs (Relacionamentos entre tabelas)===
-- ---------------------------------------------------------

-- Listar todas as vendas com o nome do cliente:
SELECT v.id_venda, c.nome AS cliente, v.nome_medic, v.qtd, v.valor, v.data
FROM venda v
JOIN cliente c ON v.id_cliente = c.id_cliente;

-- Listar receitas com nome do medicamento e nome do cliente:
SELECT r.id_receita, c.nome AS cliente, m.nome AS medicamento, r.validade
FROM receita r
JOIN cliente c ON r.id_cliente = c.id_cliente
JOIN medicamento m ON r.id_medicamento = m.id_medicamento;

-- Listar todos os pagamentos com status 'Pendente' e valor da venda:
SELECT p.id_pagamento, v.valor, p.forma, p.status
FROM pagamento p
JOIN venda v ON p.id_venda = v.id_venda
WHERE p.status = 'Pendente';

-- Verificar quais medicamentos estão no estoque com quantidade e validade:
SELECT m.nome, e.quantidade, e.validade
FROM estoque e
JOIN medicamento m ON e.id_medicamento = m.id_medicamento;


-- Listar medicamentos vendidos por um cliente específico:
SELECT c.nome AS cliente, v.nome_medic, v.qtd, v.data
FROM venda v
JOIN cliente c ON v.id_cliente = c.id_cliente
WHERE c.nome = 'Juliana Alves';

-- -----------------------------------------------------------
-- ===Consultas com Agregações (Soma, Contagem, Média etc.)===
-- -----------------------------------------------------------

-- Total de vendas realizadas no mês 02:
SELECT SUM(valor) AS total_mes
FROM venda
WHERE data like '2025-02%';

 -- Quantidade total de medicamentos vendidos:
SELECT SUM(qtd) AS total_vendidos FROM venda;

-- Número de clientes que realizaram compras:
SELECT COUNT(DISTINCT id_cliente) AS clientes_compraram FROM venda;

-- Medicamento mais caro no sistema:
SELECT nome, preco FROM medicamento ORDER BY preco DESC LIMIT 1;
select * from medicamento;

-- Quantidade de vendas por atendente:
SELECT atendente, COUNT(*) AS total_vendas
FROM venda
GROUP BY atendente;