import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import './App.css'
import { useAuth, AuthProvider } from './components/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import AdminPanel from './components/AdminPanel'
import QuizPlayer from './components/QuizPlayer'

function Home() {
  const { user, logout, quizzes } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortedQuizzes, setSortedQuizzes] = useState([])

  useEffect(() => {
    const categorized = {}
    quizzes.forEach(q => {
      const cat = q.category || 'Ogólne'
      if (!categorized[cat]) {
        categorized[cat] = []
      }
      categorized[cat].push(q)
    })
    setSortedQuizzes(categorized)
  }, [quizzes])

  const categories = Object.keys(sortedQuizzes).sort()
  const displayedQuizzes = selectedCategory ? sortedQuizzes[selectedCategory] : quizzes

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Quiz Advanced</h1>
          <p className="hero-subtitle">Rozwijaj swoją wiedzę z interaktywnymi quizami</p>
        </div>
      </section>

      {user ? (
        <section className="dashboard-section">
          <div className="dashboard-card">
            <div className="dashboard-header">
              <div>
                <h2>Witaj, {user.name}!</h2>
                <p className="dashboard-email">{user.email}</p>
              </div>
              {user.isAdmin && <span className="admin-badge">Admin</span>}
            </div>
            <div className="dashboard-actions">
              {user.isAdmin && (
                <Link to="/admin" className="action-btn admin-btn">
                  <span className="btn-icon">⚙️</span> Panel Administratora
                </Link>
              )}
              <button onClick={logout} className="action-btn logout-btn">
                <span className="btn-icon">🚪</span> Wyloguj się
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="auth-prompt">
          <div className="auth-card">
            <h2>Zaloguj się lub załóż konto</h2>
            <p>Aby rozwiązywać quizy, musisz być zalogowany</p>
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">Zaloguj się</Link>
              <Link to="/register" className="auth-btn register-btn">Załóż konto</Link>
            </div>
          </div>
        </section>
      )}

      {quizzes && quizzes.length > 0 && (
        <section className="quizzes-section">
          <div className="section-header">
            <h2>Dostępne Quizy</h2>
            <p className="section-subtitle">Wybierz quiz i sprawdź swoją wiedzę</p>
          </div>
          
          {categories.length > 0 && (
            <div className="categories-filter">
              <button 
                className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                Wszystkie ({quizzes.length})
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} ({sortedQuizzes[cat].length})
                </button>
              ))}
            </div>
          )}
          
          <div className="quiz-grid">
            {displayedQuizzes.map(q => (
              <div key={q.id} className="quiz-card-new">
                <div className="card-category">
                  <span className="category-tag">{q.category || 'Ogólne'}</span>
                </div>
                <h3 className="card-title">{q.title}</h3>
                <div className="card-meta">
                  <span className={`difficulty-badge difficulty-${q.difficulty?.toLowerCase() || 'średni'}`}>
                    {q.difficulty || 'Średni'}
                  </span>
                  <span className="questions-count">
                    {q.questions?.length || 0} pytań
                  </span>
                </div>
                <Link to={`/quiz/${q.id}`} className="play-button">
                  Rozwiąż Quiz <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <nav className="navbar">
            <Link to="/" className="navbar-brand">
              <span className="brand-icon">🎯</span>
              <span className="brand-text">Quiz Advanced</span>
            </Link>
            <div className="navbar-nav">
              <AuthLink />
            </div>
          </nav>

          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/quiz/:id" element={<QuizPlayer />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          <footer className="app-footer">
            <div className="footer-content">
              <p>&copy; 2026 Quiz Advanced. Wszystkie prawa zastrzeżone.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  )
}

function AuthLink() {
  const { user, logout } = useAuth();
  if (user && user.isAdmin) {
    return (
      <div className="auth-links">
        <span className="user-name">{user.name}</span>
        <Link to="/admin" className="nav-link nav-link-secondary">Admin</Link>
        <button onClick={logout} className="nav-link nav-btn">Wyloguj</button>
      </div>
    );
  }
  if (user) {
    return (
      <div className="auth-links">
        <span className="user-name">{user.name}</span>
        <button onClick={logout} className="nav-link nav-btn">Wyloguj</button>
      </div>
    );
  }
  return (
    <div className="auth-links">
      <Link to="/login" className="nav-link">Zaloguj się</Link>
      <Link to="/register" className="nav-link nav-link-primary">Załóż konto</Link>
    </div>
  );
}

export default App
