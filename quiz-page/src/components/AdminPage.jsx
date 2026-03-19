export default function AdminPage({ onBack }) {
  return (
    <section className="admin">
      <h2>Panel administratora</h2>
      <p>To tylko placeholder. Możesz tutaj dodać funkcjonalności do zarządzania pytaniami i użytkownikami.</p>

      <button className="button button--secondary" onClick={onBack}>
        Wróć do quizu
      </button>
    </section>
  );
}
