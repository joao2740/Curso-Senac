import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⚡' },
    { id: 'pacientes', label: 'Pacientes', icon: '👤' },
    { id: 'atendimentos', label: 'Atendimentos', icon: '📅' },
    { id: 'historico', label: 'Histórico Clínico', icon: '📑' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="icon">✚</span>
        <span>Prontuário+</span>
      </div>

      <ul className="nav-menu">
        {menuItems.map(item => (
          <li 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
