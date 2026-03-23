import React, { useState, useEffect } from 'react';

const PatientForm = ({ isOpen, onClose, onSave, patientToEdit }) => {
  const initialState = {
    nome_completo: '',
    cpf: '',
    data_nascimento: '',
    sexo: 'O',
    contato: '',
  };

  const [formData, setFormData] = useState(initialState);

  // Preencher formulário se for edição
  useEffect(() => {
    if (patientToEdit) {
      setFormData(patientToEdit);
    } else {
      setFormData(initialState);
    }
  }, [patientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {patientToEdit ? 'Editar Paciente' : 'Novo Paciente'}
          </h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input 
              type="text" 
              className="form-control" 
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              placeholder="Ex: João da Silva"
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">CPF</label>
              <input 
                type="text" 
                className="form-control" 
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Data de Nascimento</label>
              <input 
                type="date" 
                className="form-control" 
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Sexo</label>
              <select 
                className="form-control" 
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Telefone / Contato</label>
              <input 
                type="text" 
                className="form-control" 
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {patientToEdit ? 'Atualizar' : 'Salvar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
