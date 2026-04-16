import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.user) {
    navigate('/');
    return null;
  }

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
    }
  };

  return (
    <div className="auth-form">
      <h2>Zaloguj się</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Twój email" required />
        </div>
        <div>
          <label>Hasło</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Twoje hasło" required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logowanie...' : 'Zaloguj się'}</button>
      </form>
    </div>
  );
}
