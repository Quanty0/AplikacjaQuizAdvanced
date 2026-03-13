import { useState } from 'react'
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

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to the Quiz Advanced App</h1>
        <p>Test your knowledge with our interactive quizzes!</p>
      </header>
      {user ? (
        <section className="user-dashboard">
          <div className="user-info">
            <h2>Dashboard</h2>
            <p>
              Signed in as <strong>{user.name}</strong> ({user.email}){' '}
              {user.isAdmin && <span className="admin-badge">[admin]</span>}
            </p>
            <button onClick={logout} className="logout-btn">Log out</button>
            {user.isAdmin && (
              <p>
                <Link to="/admin" className="admin-link">Go to Admin Panel</Link>
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="auth-section">
          <p>
            <Link to="/login" className="auth-link">Login</Link> or <Link to="/register" className="auth-link">Register</Link> to get started
          </p>
        </section>
      )}
      {quizzes && quizzes.length > 0 && (
        <section className="quiz-list">
          <h2>Available Quizzes</h2>
          <div className="quiz-grid">
            {quizzes.map(q => (
              <div key={q.id} className="quiz-card">
                <h3>{q.title}</h3>
                <p>{q.questions.length} questions</p>
                <Link to={`/quiz/${q.id}`} className="play-btn">Play Quiz</Link>
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
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>
          { /* show admin link only when user is admin */ }
          <AuthLink />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/quiz/:id" element={<QuizPlayer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
  // remove stray closing brace

function AuthLink() {
  const { user } = useAuth();
  if (user && user.isAdmin) {
    return (
      <>
        {' | '}
        <Link to="/admin">Admin</Link>
      </>
    );
  }
  return null;
}

export default App
