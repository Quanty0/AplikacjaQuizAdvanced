import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await auth.login({ email, password });
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
      auth.login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message);
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
    }
  };

  return (
    <div className="auth-form">
<<<<<<< HEAD
      <h2>Zaloguj się</h2>
=======
      <h2>Login</h2>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
<<<<<<< HEAD
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Twój email" required />
        </div>
        <div>
          <label>Hasło</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Twoje hasło" required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logowanie...' : 'Zaloguj się'}</button>
=======
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      </form>
    </div>
  );
}
