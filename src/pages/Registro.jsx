import React from 'react'
import '../styles/Login.css';
import FormularioRegistro from '../components/FormularioRegistro';

const Registro = () => {
  return (
    <div className="main">
      <div className="card_main">
        <FormularioRegistro />
      </div>
    </div>
  )
}

export default Registro