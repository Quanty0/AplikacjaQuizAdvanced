import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZZES_FILE = path.join(__dirname, 'quizzes.json');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Helper functions to manage quizzes.json
async function loadQuizzes() {
  try {
    const data = await fs.readFile(QUIZZES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveQuizzes(quizzes) {
  await fs.writeFile(QUIZZES_FILE, JSON.stringify(quizzes, null, 2));
}

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await loadQuizzes();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load quizzes' });
  }
});

// Get quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quizzes = await loadQuizzes();
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load quiz' });
  }
});

// Add new quiz
app.post('/api/quizzes', async (req, res) => {
  try {
    const newQuiz = req.body;
    const quizzes = await loadQuizzes();
    quizzes.push(newQuiz);
    await saveQuizzes(quizzes);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add quiz' });
  }
});

// Update quiz
app.put('/api/quizzes/:id', async (req, res) => {
  try {
    const updatedQuiz = req.body;
    const quizzes = await loadQuizzes();
    const index = quizzes.findIndex(q => q.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    quizzes[index] = updatedQuiz;
    await saveQuizzes(quizzes);
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Delete quiz
app.delete('/api/quizzes/:id', async (req, res) => {
  try {
    const quizzes = await loadQuizzes();
    const filteredQuizzes = quizzes.filter(q => q.id !== req.params.id);
    if (filteredQuizzes.length === quizzes.length) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    await saveQuizzes(filteredQuizzes);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
