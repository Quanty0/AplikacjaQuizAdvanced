import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  // Load quizzes from API on mount
  useEffect(() => {
    fetchQuizzes();
    // Restore logged in user if any
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

  const register = async ({ name, email, password, isAdmin = false }) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, isAdmin }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Rejestracja nie powiodła się');
      }

      const newUser = await response.json();
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Logowanie nie powiodło się');
      }

      const user = await response.json();
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const addQuiz = async quiz => {
    try {
      // Validate quiz structure
      if (!quiz.title || !quiz.questions || quiz.questions.length === 0) {
        alert('Quiz musi mieć tytuł i co najmniej jedno pytanie');
        return;
      }
      
      // Generate a unique ID if not present
      const quizToAdd = {
        ...quiz,
        id: quiz.id || `quiz-${Date.now()}`,
      };
      
      console.log('Adding quiz:', quizToAdd);
      
      const response = await fetch(`${API_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizToAdd),
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const newQuiz = await response.json();
        console.log('Quiz added successfully:', newQuiz);
        setQuizzes([...quizzes, newQuiz]);
        alert('Quiz dodany pomyślnie!');
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        alert('Nie udało się dodać quizu: ' + (error.error || 'Nieznany błąd'));
      }
    } catch (error) {
      console.error('Failed to add quiz:', error);
      alert('Błąd podczas dodawania quizu: ' + error.message);
    }
  };

  const updateQuiz = async updatedQuiz => {
    try {
      if (!updatedQuiz.title || !updatedQuiz.questions || updatedQuiz.questions.length === 0) {
        alert('Quiz musi mieć tytuł i co najmniej jedno pytanie');
        return false;
      }

      const response = await fetch(`${API_URL}/quizzes/${updatedQuiz.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuiz),
      });

      if (response.ok) {
        const newQuizzes = quizzes.map(q => q.id === updatedQuiz.id ? updatedQuiz : q);
        setQuizzes(newQuizzes);
        alert('Quiz zaktualizowany pomyślnie!');
        return true;
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        alert('Nie udało się zaktualizować quizu: ' + (error.error || 'Nieznany błąd'));
        return false;
      }
    } catch (error) {
      console.error('Failed to update quiz:', error);
      alert('Błąd podczas aktualizacji quizu: ' + error.message);
      return false;
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
        alert('Quiz usunięty pomyślnie!');
        return true;
      } else {
        const error = await response.json();
        alert('Nie udało się usunąć quizu: ' + (error.error || 'Nieznany błąd'));
        return false;
      }
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      alert('Błąd podczas usuwania quizu: ' + error.message);
      return false;
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
