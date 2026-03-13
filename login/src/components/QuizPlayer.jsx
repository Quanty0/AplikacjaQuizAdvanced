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
    return <div className="quiz-player">Quiz not found.</div>;
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
    return (
      <div className="quiz-player">
        <h2>Quiz Results</h2>
        <p>You scored {score} out of {quiz.questions.length}.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-player">
      <h2>{quiz.title}</h2>
      <div className="question">
        <h3>Question {currentQuestion + 1}: {question.text}</h3>
        <div className="answers">
          {question.answers.map((answer, idx) => (
            <label key={idx} className="answer-option">
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
      <button onClick={nextQuestion} disabled={answers[currentQuestion] === undefined}>
        {currentQuestion < quiz.questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}