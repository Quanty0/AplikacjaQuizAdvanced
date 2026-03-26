import { useState, useEffect } from 'react';

export default function QuizForm({ onAdd, initialQuiz = null }) {
  const [title, setTitle] = useState(initialQuiz?.title || '');
  const [questions, setQuestions] = useState(
    initialQuiz?.questions || [
      { text: '', answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] }
    ]
  );

  useEffect(() => {
    if (initialQuiz) {
      setTitle(initialQuiz.title);
      setQuestions(initialQuiz.questions);
    }
  }, [initialQuiz]);

  const handleQuestionChange = (qIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].text = value;
    setQuestions(newQs);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].answers[aIndex].text = value;
    setQuestions(newQs);
  };

  const handleCorrectChange = (qIndex, aIndex) => {
    const newQs = [...questions];
    newQs[qIndex].answers = newQs[qIndex].answers.map((a, i) => ({ ...a, isCorrect: i === aIndex }));
    setQuestions(newQs);
  };

  const addAnswer = (qIndex) => {
    const newQs = [...questions];
    newQs[qIndex].answers.push({ text: '', isCorrect: false });
    setQuestions(newQs);
  };

  const removeAnswer = (qIndex, aIndex) => {
    const newQs = [...questions];
    newQs[qIndex].answers.splice(aIndex, 1);
    setQuestions(newQs);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] }]);
  };

  const removeQuestion = (qIdx) => {
    if (questions.length > 1) {
      const newQs = [...questions];
      newQs.splice(qIdx, 1);
      setQuestions(newQs);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const quiz = initialQuiz ? { ...initialQuiz, title, questions } : { title, questions };
    onAdd(quiz);
    if (!initialQuiz) {
      setTitle('');
      setQuestions([{ text: '', answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div>
        <label>Quiz Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="questions">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="question-block">
            <label>Question {qIdx + 1}</label>
            <input
              type="text"
              value={q.text}
              onChange={e => handleQuestionChange(qIdx, e.target.value)}
              placeholder="Enter question text"
              required
            />
            <div className="answers">
              {q.answers.map((a, aIdx) => (
                <div key={aIdx} className="answer">
                  <input
                    type="radio"
                    name={`correct-${qIdx}`}
                    checked={a.isCorrect}
                    onChange={() => handleCorrectChange(qIdx, aIdx)}
                  />
                  <input
                    type="text"
                    value={a.text}
                    onChange={e => handleAnswerChange(qIdx, aIdx, e.target.value)}
                    placeholder={`Answer ${aIdx + 1}`}
                    required
                  />
                  {q.answers.length > 2 && (
                    <button type="button" onClick={() => removeAnswer(qIdx, aIdx)} className="remove-btn">Remove</button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addAnswer(qIdx)} className="small-btn">+ Add Answer</button>
            {questions.length > 1 && (
              <button type="button" onClick={() => removeQuestion(qIdx)} className="remove-btn">Remove Question</button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={addQuestion} className="small-btn">+ Add Question</button>
      <button type="submit">{initialQuiz ? 'Update Quiz' : 'Create Quiz'}</button>
    </form>
  );
}
