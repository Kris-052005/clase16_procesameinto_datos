import { useState } from 'react';
import axios from 'axios';
import '../styles/FormularioParqueo.css';

export default function FormularioParqueo() {
  const [formData, setFormData] = useState({
    placa: '',
    tipo: 'carro',
    horas: 0,
    minutos: 0,
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'horas' || name === 'minutos' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResultado(null);
    setCargando(true);

    try {
      const response = await axios.post(
        'http://localhost:4000/api/parqueo/calcular',
        {
          placa: formData.placa,
          tipo: formData.tipo,
          horas: formData.horas,
          minutos: formData.minutos,
        }
      );

      setResultado(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-container">
      <div className="formulario-card">
        <h2>Cálculo de Cobro de Parqueo</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="placa">Placa del Vehículo:</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              placeholder="Ej: ABC123"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Vehículo:</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="horas">Horas:</label>
              <input
                type="number"
                id="horas"
                name="horas"
                value={formData.horas}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="minutos">Minutos:</label>
              <input
                type="number"
                id="minutos"
                name="minutos"
                value={formData.minutos}
                onChange={handleChange}
                min="0"
                max="59"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Calculando...' : 'Calcular Cobro'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {resultado && (
          <div className="resultado">
            <h3>Resultado del Cálculo</h3>
            <div className="resultado-item">
              <span className="label">Placa:</span>
              <span className="value">{resultado.placa}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Tipo de Vehículo:</span>
              <span className="value">{resultado.tipo}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Tiempo de Uso:</span>
              <span className="value">{resultado.tiempoUso}</span>
            </div>
            <div className="resultado-item">
              <span className="label">Horas Cobradas:</span>
              <span className="value">{resultado.horasCobradas}h</span>
            </div>
            <div className="resultado-item">
              <span className="label">Tarifa por Hora:</span>
              <span className="value">${resultado.tarifa.toLocaleString()}</span>
            </div>
            <div className="resultado-item total">
              <span className="label">Total a Pagar:</span>
              <span className="value">${resultado.total.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}