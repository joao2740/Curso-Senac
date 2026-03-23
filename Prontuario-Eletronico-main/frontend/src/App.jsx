import { useState } from 'react'
import "./style/global.css"
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import Dashboard from './components/Dashboard'
import PatientList from './components/PatientList'
import Configuracoes from './components/Configuracoes'
import HistoricoClinico from './components/HistoricoClinico'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'pacientes':
        return <PatientList />;
      case 'historico':
        return <HistoricoClinico />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return (
          <div className="page-container">
            <h1 className="page-title">Em Construção</h1>
            <p className="page-subtitle">A tela "{activeTab}" será implementada em breve.</p>
          </div>
        );
    }
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <TopHeader />
        {renderContent()}
      </main>
    </div>
  )
}

export default App
