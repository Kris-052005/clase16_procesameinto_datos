import { useState } from 'react';
import FormularioParqueo from './components/FormularioParqueo';
import FormularioVehiculos from './components/FormularioVehiculos';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('parqueo');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Parqueo</h1>
        <p>Bienvenido al sistema integrado de parqueo y registro de vehículos</p>
      </header>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'parqueo' ? 'active' : ''}`}
            onClick={() => setActiveTab('parqueo')}
          >
            Cálculo de Cobro
          </button>
          <button
            className={`tab-button ${activeTab === 'vehiculos' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehiculos')}
          >
            Registro de Vehículos
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'parqueo' && <FormularioParqueo />}
          {activeTab === 'vehiculos' && <FormularioVehiculos />}
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; 2024 Sistema de Gestión de Parqueo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
