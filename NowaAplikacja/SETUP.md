# Konfiguracja i uruchomienie aplikacji Quiz

## Wymagania
- Node.js (v18+)
- npm

## Instalacja i uruchomienie

### 1. Zainstaluj zależności główne (w folderze NowaAplikacja)
```bash
npm install
```

### 2. Zainstaluj zależności serwera (w folderze NowaAplikacja/server)
```bash
npm run server:install
```

### 3. Uruchom serwer (Terminal 1)
```bash
npm run server
```
Serwer będzie dostępny na `http://localhost:3001`

### 4. Uruchom aplikację (Terminal 2)
```bash
npm run dev
```
Aplikacja będzie dostępna na `http://localhost:5174`

## Struktura przechowywania

- **Użytkownicy**: localStorage (w przeglądarce)
- **Quizy**: `server/quizzes.json` (plik lokalny)

## Dostępne endpointy API

- `GET /api/quizzes` - Pobierz wszystkie quizy
- `GET /api/quizzes/:id` - Pobierz quiz po ID
- `POST /api/quizzes` - Dodaj nowy quiz
- `PUT /api/quizzes/:id` - Zaktualizuj quiz
- `DELETE /api/quizzes/:id` - Usuń quiz

## Build production

```bash
npm run build
```

Zbudowana aplikacja będzie w folderze `dist/`
