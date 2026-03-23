import React from 'react';

const Dashboard = ({ setActiveTab }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Visão Geral</h1>
        <p className="page-subtitle">Acompanhe os indicadores da sua clínica</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon blue">👤</div>
          <div className="stat-details">
            <div className="value">1,204</div>
            <div className="label">Total de Pacientes</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon green">📅</div>
          <div className="stat-details">
            <div className="value">42</div>
            <div className="label">Consultas Hoje</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon orange">⏰</div>
          <div className="stat-details">
            <div className="value">8</div>
            <div className="label">Em Espera</div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Próximos Atendimentos</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Horário</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ana Souza</strong><br/><small style={{ color: 'var(--text-light)' }}>111.222.333-44</small></td>
                <td>09:00</td>
                <td>Retorno Especialista</td>
                <td><span className="badge success">Aguardando</span></td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => setActiveTab('historico')}
                  >
                    Iniciar
                  </button>
                </td>
              </tr>
              <tr>
                <td><strong>Carlos Oliveira</strong><br/><small style={{ color: 'var(--text-light)' }}>222.333.444-55</small></td>
                <td>09:30</td>
                <td>Primeira Consulta</td>
                <td><span className="badge warning">Atrasado</span></td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => setActiveTab('historico')}
                  >
                    Iniciar
                  </button>
                </td>
              </tr>
              <tr>
                <td><strong>Mariana Costa</strong><br/><small style={{ color: 'var(--text-light)' }}>333.444.555-66</small></td>
                <td>10:00</td>
                <td>Exame de Rotina</td>
                <td><span className="badge">Agendado</span></td>
                <td>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => setActiveTab('pacientes')}
                  >
                    Ver Ficha
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
