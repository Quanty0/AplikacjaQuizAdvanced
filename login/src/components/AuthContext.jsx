import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

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

function loadQuizzes() {
  const json = localStorage.getItem('quizzes');
  return json ? JSON.parse(json) : [];
}

function saveQuizzes(quizzes) {
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(loadQuizzes());
  }, []);

  // restore logged in user if any
  useEffect(() => {
    const json = localStorage.getItem('currentUser');
    if (json) {
      try {
        setUser(JSON.parse(json));
      } catch {}
    }
  }, []);

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

  const addQuiz = quiz => {
    const newQuizzes = [...quizzes, quiz];
    setQuizzes(newQuizzes);
    saveQuizzes(newQuizzes);
  };

  const updateQuiz = updatedQuiz => {
    const newQuizzes = quizzes.map(q => q.id === updatedQuiz.id ? updatedQuiz : q);
    setQuizzes(newQuizzes);
    saveQuizzes(newQuizzes);
  };

  const deleteQuiz = id => {
    const newQuizzes = quizzes.filter(q => q.id !== id);
    setQuizzes(newQuizzes);
    saveQuizzes(newQuizzes);
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
