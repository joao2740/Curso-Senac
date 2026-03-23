import React from 'react';

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Buscar paciente, prontuário..." />
      </div>

      <div className="user-profile">
        <div className="user-info" style={{ textAlign: 'right' }}>
          <div className="name">Dr(a). Roberto Nunes</div>
          <div className="role">Cardiologista</div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop" 
          alt="Perfil" 
        />
      </div>
    </header>
  );
};

export default TopHeader;
