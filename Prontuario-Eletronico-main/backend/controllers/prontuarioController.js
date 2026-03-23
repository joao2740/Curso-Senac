import db from '../config/db.js';

// --- Atendimentos ---

// 1. Iniciar Atendimento
export const iniciarAtendimento = (req, res) => {
    const { id_paciente, id_profissional, tipo_atendimento } = req.body;

    if (!id_paciente || !id_profissional) {
        return res.status(400).json({ error: 'id_paciente e id_profissional são obrigatórios' });
    }

    const query = 'INSERT INTO atendimentos (id_paciente, id_profissional, tipo_atendimento) VALUES (?, ?, ?)';
    db.query(query, [id_paciente, id_profissional, tipo_atendimento || 'Consulta'], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao iniciar atendimento' });
        res.status(201).json({ id: results.insertId, message: 'Atendimento iniciado com sucesso' });
    });
};

// 2. Finalizar Atendimento e Registrar Histórico
export const salvarProntuario = (req, res) => {
    const { id_atendimento, queixa_principal, exame_fisico, diagnostico_cid, prescricao, notas_adicionais } = req.body;

    if (!id_atendimento) {
        return res.status(400).json({ error: 'id_atendimento é obrigatório' });
    }

    // Primeiro salvamos o histórico clínico
    const insertHistorico = 'INSERT INTO historico_clinico (id_atendimento, queixa_principal, exame_fisico, diagnostico_cid, prescricao, notas_adicionais, finalizado) VALUES (?, ?, ?, ?, ?, ?, 1)';
    
    db.query(insertHistorico, [id_atendimento, queixa_principal, exame_fisico, diagnostico_cid, prescricao, notas_adicionais], (err, resultsHistorico) => {
        if (err) return res.status(500).json({ error: 'Erro ao registrar histórico clínico' });

        // Segundo, atualizamos o atendimento para "Finalizado"
        const updateAtendimento = 'UPDATE atendimentos SET status = "Finalizado", data_hora_fim = CURRENT_TIMESTAMP WHERE id_atendimento = ?';
        db.query(updateAtendimento, [id_atendimento], (errUpdate) => {
            if (errUpdate) return res.status(500).json({ error: 'Erro ao finalizar atendimento' });
            res.json({ message: 'Prontuário salvo e atendimento finalizado!' });
        });
    });
};

// --- Consultas ---

// 3. Listar históricos clínicos de um Paciente
export const listarHistoricoPaciente = (req, res) => {
    const { id_paciente } = req.params;

    const query = `
        SELECT a.id_atendimento, a.data_hora_inicio, a.status, 
               h.queixa_principal, h.diagnostico_cid, h.prescricao, 
               p.nome_completo AS medico
        FROM atendimentos a
        JOIN historico_clinico h ON a.id_atendimento = h.id_atendimento
        JOIN profissionais p ON a.id_profissional = p.id_profissional
        WHERE a.id_paciente = ?
        ORDER BY a.data_hora_inicio DESC
    `;

    db.query(query, [id_paciente], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar histórico do paciente' });
        res.json(results);
    });
};

// 4. Buscar detalhes de um atendimento específico (incluindo histórico)
export const buscarAtendimentoDetalhado = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT a.*, h.*, prof.nome_completo as nome_medico, pac.nome_completo as nome_paciente
        FROM atendimentos a
        LEFT JOIN historico_clinico h ON a.id_atendimento = h.id_atendimento
        JOIN profissionais prof ON a.id_profissional = prof.id_profissional
        JOIN pacientes pac ON a.id_paciente = pac.id_paciente
        WHERE a.id_atendimento = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar detalhes do atendimento' });
        if (results.length === 0) return res.status(404).json({ error: 'Atendimento não encontrado' });
        res.json(results[0]);
    });
};
