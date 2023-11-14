import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'
import "../styles/Publicaciones.css"

const Publicaciones = () => {

  const [publicaciones, setPublicaciones] = useState([]);
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}` // Agrega el token a los encabezados
  };
  

  useEffect(() => {
    const obtenerPublicaciones = () => {
      axios.get('http://localhost:3001/api/publicaciones', {headers })
        .then((response) => {
          setPublicaciones(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener las publicaciones:', error.message);
        });
    };

    obtenerPublicaciones();
  }, []);

  const handleLike = async (publicacionId) => {
    try {
      // Realiza una solicitud a tu API para dar/quitar like
      await axios.post('http://localhost:3001/api/likes', { publicacionId },{ headers});
      // Actualiza la lista de publicaciones para reflejar el cambio de "like"
      setPublicaciones((prevPublicaciones) => {
        return prevPublicaciones.map((publicacion) => {
          if (publicacion._id === publicacionId) {
            return { ...publicacion, liked: !publicacion.liked };
          }
          return publicacion;
        });
      });
    } catch (error) {
      console.error('Error al dar/quitar like:', error.message);
    }
  };

  return (
    <div>
      <h1>Publicaciones</h1>
      <ul>
        {publicaciones.map((publicacion) => (
          <li className='marc' key={publicacion._id}>
            <p>Usuario: {publicacion.usuario}</p>
            <p>Contenido: {publicacion.contenido}</p>
            <p>Publicado: {formatDistanceToNow(new Date(publicacion.fecha_publicacion), { addSuffix: true })}</p>
            <img className="ima"src={publicacion.imagen} alt="Imagen de la publicación" />
            <button onClick={() => handleLike(publicacion._id)}>
              {publicacion.liked ? 'Quitar Like' : 'Dar Like'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Publicaciones;