import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.module.css'; // Asegúrate de crear este archivo CSS

function Login() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    // Lógica para redirigir a la página de usuarios
    navigate('/users'); // Redirige a la página de usuarios
  };

  const handleBusinessLogin = () => {
    // Redirige al dashboard de Business Intelligence servido por FastAPI y Dash
    window.location.href = 'http://localhost:8050/dashboard'; // Cambia el URL según la configuración de tu backend
  };

  return (
    <div className="login-container">
      <header>
        <div className="logo">
          <img src="LogoRizos2.png" alt="Rizos Felices Logo" />
          <span className="logo-full">RIZOS FELICES ONLINE</span>
        </div>
        <div className="unicornio-logo">
          <img src="LogoUnicornio.png" alt="Unicornio Logo" />
        </div>
      </header>
      <main>
        <button className="login-button" onClick={handleUserLogin}>
          USUARIOS
        </button>
        <button className="login-button" onClick={handleBusinessLogin}>
          BUSINESS INTELLIGENCE
        </button>
      </main>
    </div>
  );
}

export default Login;
