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
                <div className="quiz-card-header">
                  <h3>{q.title}</h3>
                  <span className={`difficulty-badge difficulty-${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
                  </span>
                </div>
                <p className="quiz-category">{q.category}</p>
                <p className="quiz-questions">{q.questions.length} questions</p>
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
        <div className="app">
          <div className="app__header">
            <div>
              <h1>Quiz Advanced</h1>
              <p>Test your knowledge with interactive quizzes</p>
            </div>
            <div className="app__nav">
              <AuthLink />
            </div>
          </div>
          <div className="app__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/quiz/:id" element={<QuizPlayer />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div className="app__footer">
            <p>© 2026 Quiz Advanced. All rights reserved.</p>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}
  // remove stray closing brace

function AuthLink() {
  const { user, logout } = useAuth();
  if (user && user.isAdmin) {
    return (
      <>
        <div className="app__user">
          {user.name}
        </div>
        <Link to="/admin" className="button button--secondary">Admin Panel</Link>
        <button onClick={logout} className="button button--secondary">Log Out</button>
      </>
    );
  }
  if (user) {
    return (
      <>
        <div className="app__user">
          {user.name}
        </div>
        <button onClick={logout} className="button button--secondary">Log Out</button>
      </>
    );
  }
  return (
    <>
      <Link to="/login" className="button button--secondary">Login</Link>
      <Link to="/register" className="button button--secondary">Register</Link>
    </>
  );
}

export default App
