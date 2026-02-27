import { useAuth } from './AuthContext';
import QuizForm from './QuizForm';

export default function AdminPanel() {
  const { user, quizzes, addQuiz } = useAuth();

  if (!user || !user.isAdmin) {
    return <p>Access denied. You must be an admin to view this page.</p>;
  }

  const handleAdd = quiz => {
    addQuiz({ ...quiz, id: Date.now() });
  };

  return (
    <div className="admin-panel">
      <h2>Administrator Panel</h2>
      <QuizForm onAdd={handleAdd} />
      <h3>Existing quizzes</h3>
      <ul>
        {quizzes.map(q => (
          <li key={q.id}>{q.title} ({q.questions.length} questions)</li>
        ))}
      </ul>
    </div>
  );
}
