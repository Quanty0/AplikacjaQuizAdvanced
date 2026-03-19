import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import { fetchQuestions } from "./services/questionsService";

const VIEWS = {
  HOME: "home",
  QUIZ: "quiz",
  LOGIN: "login",
  ADMIN: "admin",
};

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchQuestions()
      .then((result) => {
        setQuestions(result);
        setFetchError(null);
      })
      .catch((err) => {
        setFetchError(err.message ?? "Nie udało się pobrać pytań.");
      })
      .finally(() => setLoading(false));
  }, []);

  function handleLogin(userData) {
    setUser(userData);
    setView(VIEWS.HOME);
  }

  function handleLogout() {
    setUser(null);
    setView(VIEWS.HOME);
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Aplikacja Quizowa</h1>
          <p>Sprawdź swoją wiedzę — wybierz quiz i rozpocznij grę!</p>
        </div>

        <div className="app__nav">
          {user ? (
            <>
              <span className="app__user">Zalogowany jako: {user.name}</span>
              <button className="button button--secondary" onClick={handleLogout}>
                Wyloguj
              </button>
            </>
          ) : (
            <button className="button" onClick={() => setView(VIEWS.LOGIN)}>
              Zaloguj
            </button>
          )}

          {isAdmin && (
            <button className="button" onClick={() => setView(VIEWS.ADMIN)}>
              Panel admina
            </button>
          )}
        </div>
      </header>

      <main className="app__content">
        {view === VIEWS.HOME && (
          <div className="home">
            <button className="button" onClick={() => setView(VIEWS.QUIZ)}>
              Rozpocznij quiz
            </button>

            <div className="home__hint">
              <strong>Jak to działa?</strong>
              <p>Wybierz jedną z odpowiedzi i zobacz swój wynik na końcu.</p>
              <p className="home__hint--small">
                Aplikacja jest przygotowana, aby w przyszłości podłączyć logowanie oraz pobieranie pytań z bazy danych.
              </p>
              {fetchError ? (
                <p className="home__hint--error">Błąd ładowania pytań: {fetchError}</p>
              ) : loading ? (
                <p className="home__hint--small">Ładowanie pytań...</p>
              ) : null}
            </div>
          </div>
        )}

        {view === VIEWS.QUIZ && (
          <Quiz
            questions={questions}
            onReset={() => setView(VIEWS.HOME)}
            showNotLoadedMessage={questions.length === 0}
          />
        )}

        {view === VIEWS.LOGIN && (
          <LoginPage onLogin={handleLogin} onBack={() => setView(VIEWS.HOME)} />
        )}

        {view === VIEWS.ADMIN && <AdminPage onBack={() => setView(VIEWS.HOME)} />}
      </main>

      <footer className="app__footer">
        <small>© {new Date().getFullYear()} AplikacjaQuizAdvanced</small>
      </footer>
    </div>
  );
}
