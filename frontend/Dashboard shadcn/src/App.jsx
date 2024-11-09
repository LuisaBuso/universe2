import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (email, password) => {
    // Aquí normalmente verificarías las credenciales con tu backend
    console.log('Login attempt', email, password);
    setIsAuthenticated(true);
  };

  const handleRegister = (name, email, password) => {
    // Aquí normalmente enviarías los datos de registro a tu backend
    console.log('Register attempt', name, email, password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login'); // Regresar a la vista de login
  };

  // Renderizar el Dashboard si el usuario está autenticado
  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Renderizar Login o Register dependiendo de la vista actual
  return (
    <>
      {currentView === 'login' ? (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      ) : (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
    </>
  );
}
