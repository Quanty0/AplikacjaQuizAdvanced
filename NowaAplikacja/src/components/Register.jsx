import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
=======
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.user) {
    navigate('/');
    return null;
  }

<<<<<<< HEAD
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.register({ name, email, password, isAdmin });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
=======
  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    try {
      auth.register({ name, email, password, isAdmin });
      navigate('/');
    } catch (err) {
      setError(err.message);
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
    }
  };

  return (
    <div className="auth-form">
<<<<<<< HEAD
      <h2>Załóż konto</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imię</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Twoje imię" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Twój email" required />
        </div>
        <div>
          <label>Hasło</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Twoje hasło" required />
=======
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            />
<<<<<<< HEAD
            Zarejestruj jako administrator
          </label>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Rejestrowanie...' : 'Załóż konto'}</button>
=======
            Register as admin
          </label>
        </div>
        <button type="submit">Register</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      </form>
    </div>
  );
}
