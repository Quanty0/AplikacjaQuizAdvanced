export default function LoginPage({ onLogin, onBack }) {
  return (
    <section className="login">
      <h2>Logowanie</h2>
      <p>Wybierz rolę, aby przejść dalej. To tylko szkielet do dalszej rozbudowy.</p>

      <div className="login__buttons">
        <button className="button" onClick={() => onLogin({ name: "Użytkownik", role: "user" })}>
          Zaloguj jako użytkownik
        </button>
        <button className="button" onClick={() => onLogin({ name: "Admin", role: "admin" })}>
          Zaloguj jako administrator
        </button>
      </div>

      <button className="button button--secondary" onClick={onBack}>
        Wróć
      </button>
    </section>
  );
}
