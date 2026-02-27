import { useState } from 'react';

export default function QuizForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '' }]);

  const handleQuestionChange = (index, value) => {
    const newQs = [...questions];
    newQs[index].text = value;
    setQuestions(newQs);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '' }]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const quiz = { title, questions: questions.map(q => q.text) };
    onAdd(quiz);
    setTitle('');
    setQuestions([{ text: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div>
        <label>Quiz title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="questions">
        {questions.map((q, idx) => (
          <div key={idx}>
            <label>Question {idx + 1}</label>
            <input
              value={q.text}
              onChange={e => handleQuestionChange(idx, e.target.value)}
              required
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={addQuestion} className="small-btn">
        + Add question
      </button>
      <button type="submit">Create quiz</button>
    </form>
  );
}
