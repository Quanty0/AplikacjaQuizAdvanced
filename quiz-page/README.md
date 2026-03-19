# Quiz Page (React)

To start the quiz application:

```bash
cd quiz-page
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

---

## Jak to działa

- Strona główna pozwala rozpocząć quiz.
- Po wybraniu odpowiedzi możesz przejść do następnego pytania.
- Po przejściu przez wszystkie pytania zobaczysz wynik i możesz zagrać ponownie.

## Co zostało przygotowane do rozbudowy

- **Logowanie**: przycisk "Zaloguj" otwiera prosty ekran logowania (mock), gdzie możesz wybrać rolę użytkownika lub administratora.
- **Pobieranie pytań z bazy**: aplikacja próbuje pobrać pytania z endpointu `/api/questions` (backend powinien pobierać je z MongoDB). Jeśli backend nie działa, użyje lokalnego zestawu pytań jako tymczasowego zapasu.
- **Panel admina**: jeśli zalogujesz się jako administrator, pojawi się dodatkowy przycisk "Panel admina".

## Pliki istotne dla rozbudowy

- `src/services/questionsService.js` – miejsce, gdzie można podłączyć prawdziwe API.
- `public/questions.json` – przykładowe dane, które mogą pochodzić z bazy danych.
- `src/components/LoginPage.jsx` – uproszczony widok logowania.
- `src/components/AdminPage.jsx` – placeholder panelu admina.
