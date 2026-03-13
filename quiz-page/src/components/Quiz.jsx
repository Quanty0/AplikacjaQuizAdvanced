import { useMemo, useState } from "react";
import PropTypes from "prop-types";

function clampIndex(index, length) {
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

export default function Quiz({ questions, onReset, showNotLoadedMessage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (showNotLoadedMessage) {
    return (
      <section className="quiz quiz--placeholder">
        <h2>Quiz</h2>
        <p>Trwa ładowanie pytań z serwera. Spróbuj ponownie za chwilę.</p>
        <button className="button button--secondary" onClick={onReset}>
          Wróć
        </button>
      </section>
    );
  }

  const question = questions[clampIndex(currentIndex, questions.length)];

  const progressText = useMemo(() => {
    return `${currentIndex + 1} / ${questions.length}`;
  }, [currentIndex, questions.length]);

  function onSelectAnswer(index) {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);

    if (question.correctIndex === index) {
      setScore((prev) => prev + 1);
    }
  }

  function onNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setShowResult(true);
      return;
    }

    setCurrentIndex(nextIndex);
    setSelectedIndex(null);
  }

  function onRestart() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setShowResult(false);
    onReset?.();
  }

  if (showResult) {
    return (
      <section className="quiz quiz--result">
        <h2>Wynik</h2>
        <p className="quiz__score">
          Zdobyte punkty: <strong>{score}</strong> / {questions.length}
        </p>
        <p className="quiz__message">
          {score === questions.length
            ? "Brawo! Wszystkie odpowiedzi poprawne."
            : "Spróbuj jeszcze raz, aby poprawić wynik."}
        </p>
        <div className="quiz__actions">
          <button className="button" onClick={onRestart}>
            Zagraj ponownie
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz">
      <div className="quiz__header">
        <h2>{question.title}</h2>
        <span className="quiz__progress">{progressText}</span>
      </div>

      <div className="quiz__options">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = question.correctIndex === index;
          const showCorrectness = selectedIndex !== null;

          return (
            <button
              key={index}
              className={`quiz__option ${isSelected ? "quiz__option--selected" : ""} ${
                showCorrectness && isCorrect ? "quiz__option--correct" : ""
              } ${showCorrectness && isSelected && !isCorrect ? "quiz__option--wrong" : ""}`}
              onClick={() => onSelectAnswer(index)}
              disabled={selectedIndex !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="quiz__footer">
        <button
          className="button button--secondary"
          onClick={onRestart}
          type="button"
        >
          Cofnij do startu
        </button>
        <button
          className="button"
          onClick={onNext}
          type="button"
          disabled={selectedIndex === null}
        >
          {currentIndex + 1 === questions.length ? "Zakończ" : "Dalej"}
        </button>
      </div>
    </section>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctIndex: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onReset: PropTypes.func,
};
