import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.module.css'; // Asegúrate de crear este archivo CSS

function Login() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    // Aquí iría la lógica para el login de usuarios regulares
    navigate('/users'); // Redirige a la página de usuarios
  };

  const handleBusinessLogin = () => {
    // Aquí iría la lógica para el login de Business Intelligence
    navigate('/business'); // Redirige a la página de Business Intelligence
  };

  return (
    <div className="login-container">
      <header>
        <div className="logo">
          <img src="LogoRizos2.png" alt="Unicornio Logo" />
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
          BUSINESS INTELIGENCE
        </button>
      </main>
    </div>
  );
}

export default Login;