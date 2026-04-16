import { useState } from 'react';
import { useAuth } from './AuthContext';
import QuizForm from './QuizForm';

export default function AdminPanel() {
  const { user, quizzes, addQuiz, updateQuiz, deleteQuiz } = useAuth();
  const [editingQuiz, setEditingQuiz] = useState(null);

  if (!user || !user.isAdmin) {
    return <p className="error">Dostęp zabroniony. Musisz być administratorem, aby zobaczyć tę stronę.</p>;
  }

  const handleAdd = async quiz => {
    await addQuiz(quiz);
  };

  const handleEdit = async quiz => {
    const success = await updateQuiz(quiz);
    if (success) {
      setEditingQuiz(null);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Czy na pewno chcesz usunąć ten quiz?')) {
      await deleteQuiz(id);
    }
  };

  return (
    <div className="admin-panel">
      <h2>{editingQuiz ? 'Edytuj Quiz' : 'Utwórz Nowy Quiz'}</h2>
      <QuizForm onAdd={editingQuiz ? handleEdit : handleAdd} initialQuiz={editingQuiz} />
      <h3>Istniejące Quizy</h3>
      {quizzes.length === 0 ? (
        <p className="home__hint">Brak utworzonych quizów.</p>
      ) : (
        <ul>
          {quizzes.map(q => (
            <li key={q.id}>
              <div>
                <strong>{q.title}</strong> ({q.questions.length} pytań)
              </div>
              <div>
                <button onClick={() => setEditingQuiz(q)} className="edit-btn">Edytuj</button>
                <button onClick={() => handleDelete(q.id)} className="remove-btn">Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
