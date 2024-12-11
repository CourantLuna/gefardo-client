import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario después de un login exitoso

function Login() {
  const [email, setEmail] = useState('');  // Estado para el correo electrónico
  const [password, setPassword] = useState('');  // Estado para la contraseña
  const navigate = useNavigate();  // Hook de React Router para redirigir

  // Manejar el cambio en los campos del formulario
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Aquí podríamos validar los datos, pero por ahora solo vamos a redirigir
    if (email && password) {
      console.log('Formulario enviado con éxito', { email, password });
      
      // Simulando una redirección exitosa al home después del login
      navigate('/');  // Redirigir a la página de inicio
    } else {
      alert('Por favor ingresa un correo electrónico y una contraseña válidos.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="login-form" style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Ingresa tu correo electrónico"
              style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px' }}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Ingresa tu contraseña"
              style={{ width: '100%', padding: '8px', margin: '10px 0', borderRadius: '4px' }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
