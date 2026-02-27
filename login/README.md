# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Authentication & Admin Panel

This application now includes a simple client-side login/registration system and an administrator panel for creating quizzes.

### Features

- **Register** new users (optionally mark as admin)
- **Login/Logout** functionality with persistence via `localStorage`
- **Admin Panel** accessible to users registered as admins
  - Create new quizzes with a title and questions
  - View existing quizzes stored in `localStorage`

### Setup

1. Install dependencies:
	```bash
	npm install
	```
2. Start development server:
	```bash
	npm run dev
	```

### Usage

- Navigate to `/register` to create a new account. You can check "Register as admin" if you need access to the admin panel.
- After logging in, you'll see links on the home page. Admin users will see an "Admin" link that takes them to the quiz creation panel.

All user and quiz data is stored locally in the browser for demo purposes; a real app would use a backend service.
