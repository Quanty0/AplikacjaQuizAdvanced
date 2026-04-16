import { useState } from 'react';
import { useAuth } from './AuthContext';
import QuizForm from './QuizForm';

export default function AdminPanel() {
  const { user, quizzes, addQuiz, updateQuiz, deleteQuiz } = useAuth();
  const [editingQuiz, setEditingQuiz] = useState(null);

  if (!user || !user.isAdmin) {
<<<<<<< HEAD
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
=======
    return <p className="error">Access denied. You must be an admin to view this page.</p>;
  }

  const handleAdd = quiz => {
    addQuiz(quiz);
  };

  const handleEdit = quiz => {
    updateQuiz(quiz);
    setEditingQuiz(null);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(id);
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
    }
  };

  return (
    <div className="admin-panel">
<<<<<<< HEAD
      <h2>{editingQuiz ? 'Edytuj Quiz' : 'Utwórz Nowy Quiz'}</h2>
      <QuizForm onAdd={editingQuiz ? handleEdit : handleAdd} initialQuiz={editingQuiz} />
      <h3>Istniejące Quizy</h3>
      {quizzes.length === 0 ? (
        <p className="home__hint">Brak utworzonych quizów.</p>
=======
      <h2>{editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}</h2>
      <QuizForm onAdd={editingQuiz ? handleEdit : handleAdd} initialQuiz={editingQuiz} />
      <h3>Existing Quizzes</h3>
      {quizzes.length === 0 ? (
        <p className="home__hint">No quizzes created yet.</p>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      ) : (
        <ul>
          {quizzes.map(q => (
            <li key={q.id}>
              <div>
<<<<<<< HEAD
                <strong>{q.title}</strong> ({q.questions.length} pytań)
              </div>
              <div>
                <button onClick={() => setEditingQuiz(q)} className="edit-btn">Edytuj</button>
                <button onClick={() => handleDelete(q.id)} className="remove-btn">Usuń</button>
=======
                <strong>{q.title}</strong> ({q.questions.length} questions)
              </div>
              <div>
                <button onClick={() => setEditingQuiz(q)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(q.id)} className="remove-btn">Delete</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
