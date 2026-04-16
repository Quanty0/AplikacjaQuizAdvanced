import { useState, useEffect } from 'react';

export default function QuizForm({ onAdd, initialQuiz = null }) {
  const [title, setTitle] = useState(initialQuiz?.title || '');
  const [category, setCategory] = useState(initialQuiz?.category || '');
  const [difficulty, setDifficulty] = useState(initialQuiz?.difficulty || 'Łatwy');
  const [questions, setQuestions] = useState(
    initialQuiz?.questions || [
      { id: 1, questionText: '', options: ['', ''], correctAnswer: '' }
    ]
  );

  useEffect(() => {
    if (initialQuiz) {
      setTitle(initialQuiz.title);
      setCategory(initialQuiz.category);
      setDifficulty(initialQuiz.difficulty);
      setQuestions(initialQuiz.questions);
    }
  }, [initialQuiz]);

  const handleQuestionChange = (qIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].questionText = value;
    setQuestions(newQs);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].options[optIndex] = value;
    setQuestions(newQs);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].correctAnswer = value;
    setQuestions(newQs);
  };

  const addOption = (qIndex) => {
    const newQs = [...questions];
    newQs[qIndex].options.push('');
    setQuestions(newQs);
  };

  const removeOption = (qIndex, optIndex) => {
    const newQs = [...questions];
    if (newQs[qIndex].options.length > 2) {
      newQs[qIndex].options.splice(optIndex, 1);
      setQuestions(newQs);
    }
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    setQuestions([...questions, { id: newId, questionText: '', options: ['', ''], correctAnswer: '' }]);
  };

  const removeQuestion = (qIdx) => {
    if (questions.length > 1) {
      const newQs = [...questions];
      newQs.splice(qIdx, 1);
      setQuestions(newQs);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate that all fields are filled
    const isValid = 
      title.trim() && 
      category.trim() && 
      questions.every(q => 
        q.questionText.trim() && 
        q.options.length >= 2 && 
        q.options.every(o => o.trim()) && 
        q.correctAnswer.trim() &&
        q.options.includes(q.correctAnswer)
      );
    
    if (!isValid) {
      alert('Wypełnij wszystkie pola. Każde pytanie musi mieć tekst, co najmniej 2 opcje odpowiedzi i prawidłową odpowiedź, która pasuje do jednej z opcji.');
      return;
    }
    
    const quiz = initialQuiz 
      ? { ...initialQuiz, title, category, difficulty, questions } 
      : { title, category, difficulty, questions };
    await onAdd(quiz);
    if (!initialQuiz) {
      setTitle('');
      setCategory('');
      setDifficulty('Łatwy');
      setQuestions([{ id: 1, questionText: '', options: ['', ''], correctAnswer: '' }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <h3>Podstawowe Informacje</h3>
      <div className="form-row">
        <div className="form-group">
          <label>Tytuł Quizu *</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="np. Matematyka Podstawowa"
            required 
          />
        </div>
        <div className="form-group">
          <label>Kategoria *</label>
          <input 
            type="text" 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            placeholder="np. Matematyka"
            required 
          />
        </div>
        <div className="form-group">
          <label>Trudność *</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="Łatwy">Łatwy</option>
            <option value="Średni">Średni</option>
            <option value="Trudny">Trudny</option>
          </select>
        </div>
      </div>

      <h3>Pytania</h3>
      <div className="questions">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="question-block">
            <div className="question-header">
              <label>Pytanie {qIdx + 1}</label>
              {questions.length > 1 && (
                <button type="button" onClick={() => removeQuestion(qIdx)} className="remove-btn-small">✕</button>
              )}
            </div>
            <input
              type="text"
              value={q.questionText}
              onChange={e => handleQuestionChange(qIdx, e.target.value)}
              placeholder="Wpisz tekst pytania"
              required
            />
            
            <div className="options-section">
              <label>Opcje Odpowiedzi *</label>
              {q.options.map((opt, optIdx) => (
                <div key={optIdx} className="option-item">
                  <input
                    type="radio"
                    name={`correct-${qIdx}`}
                    value={opt}
                    checked={q.correctAnswer === opt}
                    onChange={() => handleCorrectAnswerChange(qIdx, opt)}
                    disabled={!opt}
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
                    placeholder={`Opcja ${optIdx + 1}`}
                    required
                  />
                  {q.options.length > 2 && (
                    <button type="button" onClick={() => removeOption(qIdx, optIdx)} className="remove-btn-small">✕</button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addOption(qIdx)} className="small-btn">+ Dodaj Opcję</button>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" onClick={addQuestion} className="small-btn">+ Dodaj Pytanie</button>
        <button type="submit" className="submit-btn">{initialQuiz ? 'Aktualizuj Quiz' : 'Utwórz Quiz'}</button>
      </div>
    </form>
  );
}
