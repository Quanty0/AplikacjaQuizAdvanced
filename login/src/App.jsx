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

function Home() {
  const { user, logout, quizzes } = useAuth()

  return (
    <>
      <h1>Welcome to the Quiz App</h1>
      {user ? (
        <div>
          <p>
            Signed in as <strong>{user.name}</strong> ({user.email}){' '}
            {user.isAdmin && <span>[admin]</span>}
          </p>
          <button onClick={logout}>Log out</button>
          {user.isAdmin && (
            <p>
              <Link to="/admin">Go to admin panel</Link>
            </p>
          )}
        </div>
      ) : (
        <p>
          <Link to="/login">Log in</Link> or <Link to="/register">Register</Link>
        </p>
      )}
        {quizzes && quizzes.length > 0 && (
          <section className="quiz-list">
            <h2>Available Quizzes</h2>
            <ul>
              {quizzes.map(q => (
                <li key={q.id}>{q.title} ({q.questions.length} questions)</li>
              ))}
            </ul>
          </section>
        )}
    </>
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
