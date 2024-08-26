import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './UserTable.module.css';

function PDOGTModal({ isOpen, onClose, pdogtData }) {
  if (!isOpen || !pdogtData) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>RESULTADO PDOGT</h2>
        <p>Plasticidad: {pdogtData.plasticidad}</p>
        <p>Permeabilidad: {pdogtData.permeabilidad}</p>
        <p>Densidad: {pdogtData.densidad}</p>
        <p>Porosidad: {pdogtData.porosidad}</p>
        <p>Oleosidad: {pdogtData.oleosidad}</p>
        <p>Hebra: {pdogtData.hebra}</p>
        <p>Textura: {pdogtData.textura}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}


function UserTable() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [nuevoCliente, setNuevoCliente] = useState({
    phone: '',
    first_name: '',
    textura: '',
    compras: ''
  });
  const [clienteEditando, setClienteEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [totalClientes, setTotalClientes] = useState(0);
  const [startIndex, setStartIndex] = useState(1);
  const formularioRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPDOGT, setSelectedPDOGT] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchTotalClients();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTotalClients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/clientes/count');
      setTotalClientes(response.data.total_clientes);
    } catch (error) {
      console.error('Error fetching total clients:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (clienteEditando) {
        await axios.put(`http://127.0.0.1:8000/clientes/${clienteEditando.unique_id}`, nuevoCliente);
      } else {
        await axios.post('http://127.0.0.1:8000/clientes', nuevoCliente);
      }
      fetchUsers();
      fetchTotalClients();
      setNuevoCliente({ phone: '', first_name: '', textura: '', compras: '' });
      setClienteEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error submitting client:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/clientes/${id}`);
        fetchUsers();
        fetchTotalClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setNuevoCliente(cliente);
    setMostrarFormulario(true);
    if (formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setClienteEditando(null);
    setNuevoCliente({ phone: '', first_name: '', textura: '', compras: '' });
    setMostrarFormulario(false);
  };
  const handleOpenModal = (cliente) => {
    setSelectedPDOGT(cliente);
    setModalOpen(true);
  };
  const clientesFiltrados = clientes.filter(cliente =>
    Object.values(cliente).some(value =>
      value.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <div className={styles.userTableContainer}>
      <header>
        <div className={styles.logo}>
          <img src="LogoRizos2.png" alt="Rizos Logo" />
          <span className={styles.logoFull}>RIZOS FELICES ONLINE</span>
        </div>
        <div className={styles.unicornioLogo}>
          <img src="LogoUnicornio.png" alt="Unicornio Logo" />
        </div>
      </header>
      <h1 className={styles.totalUsers}>TOTAL USUARIOS: {totalClientes}</h1>

      <div className={styles.searchAndNewContainer}>
        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.searchInput}
        />
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className={styles.newClientButton}
        >
          {mostrarFormulario ? 'Cancelar' : 'Agregar nuevo cliente'}
        </button>
      </div>
      {mostrarFormulario && (
        <form ref={formularioRef} onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            name="phone"
            value={nuevoCliente.phone}
            onChange={handleInputChange}
            placeholder="WhatsApp"
          />
          <input
            name="first_name"
            value={nuevoCliente.first_name}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <input
            name="textura"
            value={nuevoCliente.textura}
            onChange={handleInputChange}
            placeholder="PDOGT"
          />
          <input
            name="compras"
            value={nuevoCliente.compras}
            onChange={handleInputChange}
            placeholder="Compras"
          />
          <button type="submit">
            {clienteEditando ? 'Actualizar' : 'Crear'}
          </button>
          {clienteEditando && (
            <button type="button" onClick={handleCancelEdit}>Cancelar edición</button>
          )}
        </form>
      )}

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th>WHATSAPP</th>
            <th>NOMBRE</th>
            <th>PDOGT</th>
            <th>COMPRAS</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente, index) => (
            <tr key={cliente.unique_id}>
              <td>{index + 1}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.first_name}</td>
              <td>
                <button className={styles.viewButton} onClick={() => handleOpenModal(cliente)}>
                  Ver
                </button>
              </td>
              <td>{cliente.compras}</td>
              <td>
                <div className={styles.actionButtonContainer}>
                  <button className={styles.actionButton} onClick={() => handleEdit(cliente)}>Editar</button>
                  <button className={styles.actionButton} onClick={() => handleDelete(cliente.unique_id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PDOGTModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdogtData={selectedPDOGT}
      />
    </div>
  );
}

export default UserTable;
