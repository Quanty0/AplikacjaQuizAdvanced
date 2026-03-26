# Quiz Server

Backend API dla aplikacji Quiz. Zarządza przechowywaniem quizów w pliku JSON.

## Instalacja

```bash
npm install
```

## Uruchomienie

```bash
npm start
```

Serwer będzie dostępny na `http://localhost:3001`

## Endpoints

### Pobierz wszystkie quizy
```
GET /api/quizzes
```

### Pobierz quiz po ID
```
GET /api/quizzes/:id
```

### Dodaj nowy quiz
```
POST /api/quizzes
Content-Type: application/json

{
  "id": "unique-id",
  "title": "Quiz Title",
  "description": "Quiz Description",
  "questions": [
    {
      "text": "Question text",
      "answers": [
        { "text": "Answer 1", "isCorrect": true },
        { "text": "Answer 2", "isCorrect": false }
      ]
    }
  ]
}
```

### Zaktualizuj quiz
```
PUT /api/quizzes/:id
Content-Type: application/json

{
  "id": "unique-id",
  "title": "Updated Title",
  ...
}
```

### Usuń quiz
```
DELETE /api/quizzes/:id
```

## Pliki

- `server.js` - Główny plik serwera Express
- `quizzes.json` - Plik zawierający dane quizów
- `package.json` - Zależności projektu
