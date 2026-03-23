import React, { useState } from 'react';
import PatientForm from './PatientForm';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  // Estado que armazena a lista de pacientes
  const [pacientes, setPacientes] = useState([
    { id_paciente: 1, nome_completo: 'Ana Souza', cpf: '111.222.333-44', data_nascimento: '1985-04-15', sexo: 'F', contato: '(11) 98888-7777', status: 'Ativo' },
    { id_paciente: 2, nome_completo: 'Carlos Oliveira', cpf: '222.333.444-55', data_nascimento: '1990-08-22', sexo: 'M', contato: '(11) 97777-6666', status: 'Ativo' },
    { id_paciente: 3, nome_completo: 'Mariana Costa', cpf: '333.444.555-66', data_nascimento: '1978-11-30', sexo: 'F', contato: '(11) 96666-5555', status: 'Inativo' },
  ]);

  const filteredPacientes = pacientes.filter(p => 
    p.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.cpf.includes(searchTerm)
  );

  const handleOpenModal = (patient = null) => {
    setPatientToEdit(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPatientToEdit(null);
  };

  const handleSavePatient = (formData) => {
    if (patientToEdit) {
      // Atualizar paciente existente
      setPacientes(prev => 
        prev.map(p => p.id_paciente === patientToEdit.id_paciente ? { ...formData, id_paciente: p.id_paciente, status: p.status || 'Ativo' } : p)
      );
    } else {
      // Criar novo paciente
      const newPatient = {
        ...formData,
        id_paciente: Date.now(), // ID provisório (no backend será gerado pelo banco)
        status: 'Ativo'
      };
      setPacientes(prev => [...prev, newPatient]);
    }
    handleCloseModal();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Pacientes</h1>
          <p className="page-subtitle">Gerencie o cadastro de pacientes da clínica</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Novo Paciente
        </button>
      </div>

      <div className="glass-card">
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar por nome ou CPF..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary">Filtrar ⚙️</button>
            <button className="btn btn-secondary">Exportar 📥</button>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>Nascimento</th>
                <th>Contato</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPacientes.map(paciente => (
                <tr key={paciente.id_paciente}>
                  <td><strong>{paciente.nome_completo}</strong></td>
                  <td>{paciente.cpf}</td>
                  <td>{formatDate(paciente.data_nascimento)}</td>
                  <td>{paciente.contato}</td>
                  <td>
                    <span className={`badge ${paciente.status === 'Ativo' ? 'success' : 'danger'}`}>
                      {paciente.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', marginRight: '8px' }}>Abrir</button>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => handleOpenModal(paciente)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPacientes.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
              Nenhum paciente encontrado.
            </div>
          )}
        </div>
      </div>

      {/* Renderização Condicional do Modal */}
      <PatientForm 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSavePatient}
        patientToEdit={patientToEdit}
      />
    </div>
  );
};

export default PatientList;
