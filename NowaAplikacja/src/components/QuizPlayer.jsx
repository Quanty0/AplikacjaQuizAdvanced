import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function QuizPlayer() {
  const { id } = useParams();
  const { quizzes } = useAuth();
  const navigate = useNavigate();
  const quiz = quizzes.find(q => q.id == id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <div className="quiz-player">
        <h2>Quiz Not Found</h2>
        <p className="home__hint">The quiz you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (userAnswer !== undefined && q.answers[userAnswer].isCorrect) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="quiz-player">
        <h2>Quiz Complete!</h2>
        <p className="quiz__score">Your Score: {score} / {quiz.questions.length} ({percentage}%)</p>
        <p className="quiz__message">
          {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep practicing!'}
        </p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-player">
      <h2>{quiz.title}</h2>
      <div className="quiz__progress">Question {currentQuestion + 1} of {quiz.questions.length}</div>
      <div className="question">
        <h3>{question.text}</h3>
        <div className="quiz__options">
          {question.answers.map((answer, idx) => (
            <label key={idx} className="quiz__option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={idx}
                checked={answers[currentQuestion] === idx}
                onChange={() => handleAnswer(currentQuestion, idx)}
              />
              {answer.text}
            </label>
          ))}
        </div>
      </div>
      <div className="quiz__footer">
        <button onClick={nextQuestion} disabled={answers[currentQuestion] === undefined} className="button">
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
}
