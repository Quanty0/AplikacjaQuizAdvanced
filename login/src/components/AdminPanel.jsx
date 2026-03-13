import { useState } from 'react';
import { useAuth } from './AuthContext';
import QuizForm from './QuizForm';

export default function AdminPanel() {
  const { user, quizzes, addQuiz, updateQuiz, deleteQuiz } = useAuth();
  const [editingQuiz, setEditingQuiz] = useState(null);

  if (!user || !user.isAdmin) {
    return <p>Access denied. You must be an admin to view this page.</p>;
  }

  const handleAdd = quiz => {
    addQuiz({ ...quiz, id: Date.now() });
  };

  const handleEdit = quiz => {
    updateQuiz(quiz);
    setEditingQuiz(null);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(id);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Administrator Panel</h2>
      <QuizForm onAdd={editingQuiz ? handleEdit : handleAdd} initialQuiz={editingQuiz} />
      <h3>Existing quizzes</h3>
      <ul>
        {quizzes.map(q => (
          <li key={q.id}>
            {q.title} ({q.questions.length} questions)
            <button onClick={() => setEditingQuiz(q)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(q.id)} className="remove-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
