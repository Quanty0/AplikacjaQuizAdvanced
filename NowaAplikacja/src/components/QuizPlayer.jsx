import { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto move to next question
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResults, currentQuestion]);

  if (!quiz) {
    return (
      <div className="quiz-player">
<<<<<<< HEAD
        <h2>Quiz nie znaleziony</h2>
        <p className="home__hint">Szukany quiz nie istnieje.</p>
        <button onClick={() => navigate('/')} className="button">Powrót do strony głównej</button>
=======
        <h2>Quiz Not Found</h2>
        <p className="home__hint">The quiz you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="button">Back to Home</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-player">
        <h2>{quiz.title}</h2>
<<<<<<< HEAD
        <p className="quiz__message"><strong>Kategoria:</strong> {quiz.category}</p>
        <p className="quiz__message"><strong>Trudność:</strong> {quiz.difficulty}</p>
        <p className="quiz__message"><strong>Pytania:</strong> {quiz.questions.length}</p>
        <p className="quiz__message">Masz 30 sekund na pytanie. Odpowiadaj prawidłowo, aby zdobyć punkty!</p>
        <button onClick={() => setQuizStarted(true)} className="button">Rozpocznij Quiz</button>
=======
        <p className="quiz__message"><strong>Category:</strong> {quiz.category}</p>
        <p className="quiz__message"><strong>Difficulty:</strong> {quiz.difficulty}</p>
        <p className="quiz__message"><strong>Questions:</strong> {quiz.questions.length}</p>
        <p className="quiz__message">You have 30 seconds per question. Answer correctly to earn points!</p>
        <button onClick={() => setQuizStarted(true)} className="button">Start Quiz</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      </div>
    );
  }

  const handleAnswer = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (userAnswer === q.correctAnswer) {
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
<<<<<<< HEAD
        <h2>🎊 Quiz ukończony!</h2>
        <p className="quiz__score">Twój wynik: {score} / {quiz.questions.length} ({percentage}%)</p>
        <p className="quiz__message">
          {percentage >= 80 ? '🎉 Świetnie!' : percentage >= 60 ? '👍 Dobra robota!' : '📚 Ćwicz dalej!'}
        </p>
        <button onClick={() => navigate('/')} className="button">Powrót do strony głównej</button>
=======
        <h2>🎊 Quiz Complete!</h2>
        <p className="quiz__score">Your Score: {score} / {quiz.questions.length} ({percentage}%)</p>
        <p className="quiz__message">
          {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep practicing!'}
        </p>
        <button onClick={() => navigate('/')} className="button">Back to Home</button>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;
  const userAnswer = answers[currentQuestion];
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="quiz-player">
      <h2>{quiz.title}</h2>
      <div className="quiz__header">
<<<<<<< HEAD
        <div className="quiz__progress">Pytanie {currentQuestion + 1} z {quiz.questions.length}</div>
=======
        <div className="quiz__progress">Question {currentQuestion + 1} of {quiz.questions.length}</div>
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
        <div className={`timer ${timeLeft <= 10 ? 'timer--warning' : ''}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>
      
      <div className="question">
        <h3>{question.questionText}</h3>
        <div className="quiz__options">
          {question.options.map((option, idx) => (
            <label 
              key={idx} 
              className={`quiz__option ${
                isAnswered ? (
                  option === question.correctAnswer ? 'quiz__option--correct' : 
                  option === userAnswer ? 'quiz__option--wrong' : ''
                ) : ''
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswer(currentQuestion, option)}
                disabled={isAnswered}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      
      <div className="quiz__footer">
        <button 
          onClick={handleNextQuestion} 
          disabled={!isAnswered} 
          className="button"
        >
<<<<<<< HEAD
          {currentQuestion < quiz.questions.length - 1 ? 'Następne Pytanie' : 'Zakończ Quiz'}
=======
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
        </button>
      </div>
    </div>
  );
}
