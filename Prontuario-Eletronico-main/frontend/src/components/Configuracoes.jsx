import React from 'react';

const Configuracoes = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Configurações</h1>
        <p className="page-subtitle">Gerencie as preferências da sua clínica e do sistema</p>
      </div>

      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Perfil da Clínica</h2>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nome da Clínica</label>
            <input type="text" className="form-control" defaultValue="Clínica Saúde+" />
          </div>
          <div className="form-group">
            <label className="form-label">CNPJ</label>
            <input type="text" className="form-control" defaultValue="12.345.678/0001-90" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">E-mail de Contato</label>
            <input type="email" className="form-control" defaultValue="contato@saudemais.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Telefone Principal</label>
            <input type="text" className="form-control" defaultValue="(11) 3333-4444" />
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <button className="btn btn-primary">Salvar Perfil</button>
        </div>
      </div>

      <div className="glass-card">
        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Preferências do Sistema</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Receber notificações de novos agendamentos</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" defaultChecked />
            <span>Tema Escuro (Dark Mode) - Em breve</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" />
            <span>Autenticação em duas etapas (2FA)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
