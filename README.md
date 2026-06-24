# Sistema de Gestión de Parqueo

Una aplicación full-stack para gestionar el cobro de estacionamiento y registro de vehículos.

## Estructura del Proyecto

```
Procesamiento_datos/
├── backend/          # API REST con Express.js
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   │   └── parqueo.controller.js
│   │   └── routes/
│   │       └── parque.routes.js
│   └── package.json
└── frontend/         # Aplicación web con React + Vite
    ├── src/
    │   ├── components/
    │   │   ├── FormularioParqueo.jsx
    │   │   └── FormularioVehiculos.jsx
    │   ├── styles/
    │   │   ├── FormularioParqueo.css
    │   │   └── FormularioVehiculos.css
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## Características

### 1. Cálculo de Cobro de Parqueo
- Formulario para ingresar datos del vehículo (placa, tipo)
- Cálculo automático del cobro según tiempo de parqueo
- Soporte para carros ($1,200/hora) y motos ($500/hora)
- Visualización de resultados detallados

### 2. Registro de Vehículos
- Formulario completo para registrar vehículos
- Información del vehículo (placa, marca, modelo, color)
- Datos del propietario
- Tabla con historial de registros

## Requisitos

- Node.js 16+
- npm o yarn

## Instalación

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Uso

### 1. Iniciar Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### 2. Iniciar Frontend

En una nueva terminal:

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Endpoints API

### POST /api/parqueo/calcular

Calcula el cobro de parqueo según el tiempo de uso.

**Request body:**
```json
{
  "placa": "ABC123",
  "tipo": "carro",
  "horas": 2,
  "minutos": 30
}
```

**Response:**
```json
{
  "placa": "ABC123",
  "tipo": "carro",
  "horas": 2,
  "tarifa": 1200,
  "tiempoUso": "2:30",
  "horasCobradas": 3,
  "total": 3600
}
```

## Notas Técnicas

- **Backend**: Express.js con CORS habilitado
- **Frontend**: React 18 con Vite, Axios para HTTP
- **Estilos**: CSS puro con diseño responsive
- **Puerto Backend**: 4000
- **Puerto Frontend**: 5173

## Mejoras Futuras

- Integración con base de datos
- Autenticación de usuarios
- Historial de transacciones
- Reportes y estadísticas
- Sistema de pagos integrado
