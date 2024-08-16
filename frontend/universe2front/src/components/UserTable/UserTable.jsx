import React, { useState, useEffect } from 'react';
import './UserTable.module.css'; // Asumimos que crearás un archivo CSS para los estilos

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Aquí harías la llamada a tu API para obtener los datos de los usuarios
    // Por ahora, usaremos datos de ejemplo
    const fetchUsers = async () => {
      // const response = await fetch('tu-api-url/users');
      // const data = await response.json();
      // setUsers(data);
      
      // Datos de ejemplo:
      setUsers([
        { id: 1, whatsapp: '+1234567890', nombre: 'Juan Rivero', pdgot: 'Ejemplo', compras: 3 },
        { id: 2, whatsapp: '+0987654321', nombre: 'Esteban Roche', pdgot: 'Ejemplo', compras: 2 },
        // ... más usuarios
      ]);
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-table-container">
      <header>
        <div className="logo">
          <img src="LogoRizos2.png" alt="Unicornio Logo" />
          <span className="logo-full">RIZOS FELICES ONLINE</span>
        </div>
        <div className="unicornio-logo">
          <img src="LogoUnicornio.png" alt="Unicornio Logo" />
        </div>
      </header>
      <h1>TOTAL USUARIOS</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>WHATSAPP</th>
            <th>NOMBRE</th>
            <th>PDGOT</th>
            <th>COMPRAS</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.whatsapp}</td>
              <td>{user.nombre}</td>
              <td>{user.pdgot}</td>
              <td>{user.compras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;