import React, { useState } from 'react';

const HistoricoClinico = () => {
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Prontuário e Histórico</h1>
          <p className="page-subtitle">Atendimento em Andamento</p>
        </div>
        <button className="btn btn-primary" style={{ backgroundColor: 'var(--success)' }}>
          ✓ Finalizar Consulta
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: '24px', backgroundColor: 'rgba(37, 99, 235, 0.05)' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--primary-color)' }}>Paciente Atual</h2>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div><strong>Nome:</strong> Ana Souza</div>
          <div><strong>Idade:</strong> 39 anos</div>
          <div><strong>Convênio:</strong> Unimed</div>
          <div><strong>Última Visita:</strong> 10/03/2026</div>
        </div>
      </div>

      <div className="glass-card">
        <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Anotações da Consulta</h2>
        
        <div className="form-group">
          <label className="form-label">Queixa Principal (Anamnese)</label>
          <textarea 
            className="form-control" 
            rows="4" 
            placeholder="Descreva o motivo da consulta e os sintomas relatados..."
            defaultValue="Paciente relata dores frequentes na região do peito e cansaço ao realizar esforços moderados nos últimos 15 dias."
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Exame Físico</label>
          <textarea 
            className="form-control" 
            rows="3" 
            placeholder="Anotações do exame físico..."
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Diagnóstico (CID-10)</label>
            <input type="text" className="form-control" placeholder="Buscar CID..." />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Prescrição e Conduta</label>
          <textarea 
            className="form-control" 
            rows="4" 
            placeholder="Medicamentos e orientações..."
          ></textarea>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary">Imprimir Receita</button>
          <button className="btn btn-secondary">Solicitar Exames</button>
          <button className="btn btn-primary">Salvar Evolução</button>
        </div>
      </div>
    </div>
  );
};

export default HistoricoClinico;
