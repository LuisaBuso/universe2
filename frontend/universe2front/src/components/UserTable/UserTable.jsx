import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserTable.module.css'; // Asumimos que creaste un archivo CSS para los estilos

function UserTable() {
  const [clientes, setclientes] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de los usuarios desde la API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clientes');
        setclientes(response.data); // Actualiza el estado con los datos de la API
      } catch (error) {
        console.error('Error fetching data:', error); // Manejo de errores
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.userTableContainer}>
      <header>
        <div className={styles.logo}>
          <img src="LogoRizos2.png" alt="Unicornio Logo" />
          <span className={styles.logoFull}>RIZOS FELICES ONLINE</span>
        </div>
        <div className={styles.unicornioLogo}>
          <img src="LogoUnicornio.png" alt="Unicornio Logo" />
        </div>
      </header>
      <h1>TOTAL USUARIOS</h1>
      <table className={styles.userTable}>
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
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.first_name}</td>
              <td>{cliente.textura}</td>
              <td>{cliente.compras}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;