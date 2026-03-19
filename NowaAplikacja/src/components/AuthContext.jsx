import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function useAuth() {
  return useContext(AuthContext);
}

function loadUsers() {
  const json = localStorage.getItem('users');
  return json ? JSON.parse(json) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  // Load quizzes from API on mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Restore logged in user if any
  useEffect(() => {
    const json = localStorage.getItem('currentUser');
    if (json) {
      try {
        setUser(JSON.parse(json));
      } catch {}
    }
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${API_URL}/quizzes`);
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    }
  };

  const register = ({ name, email, password, isAdmin = false }) => {
    const users = loadUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { name, email, password, isAdmin };
    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const login = ({ email, password }) => {
    const users = loadUsers();
    const existing = users.find(u => u.email === email && u.password === password);
    if (!existing) {
      throw new Error('Invalid credentials');
    }
    setUser(existing);
    localStorage.setItem('currentUser', JSON.stringify(existing));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addQuiz = async quiz => {
    try {
      const response = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        const newQuiz = await response.json();
        setQuizzes([...quizzes, newQuiz]);
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
    }
  };

  const updateQuiz = async updatedQuiz => {
    try {
      const response = await fetch(`${API_URL}/quizzes/${updatedQuiz.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuiz),
      });
      if (response.ok) {
        const newQuizzes = quizzes.map(q => q.id === updatedQuiz.id ? updatedQuiz : q);
        setQuizzes(newQuizzes);
      }
    } catch (error) {
      console.error('Failed to update quiz:', error);
    }
  };

  const deleteQuiz = async id => {
    try {
      const response = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const newQuizzes = quizzes.filter(q => q.id !== id);
        setQuizzes(newQuizzes);
      }
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    }
  };

  const value = {
    user,
    register,
    login,
    logout,
    quizzes,
    addQuiz,
    updateQuiz,
    deleteQuiz,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
