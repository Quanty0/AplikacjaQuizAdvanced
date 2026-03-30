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

async function saveQuizzes(data) {
  // If data is an array of quizzes, wrap it in object format
  if (Array.isArray(data)) {
    const currentFile = await loadQuizzes();
    const users = currentFile.users || [];
    await fs.writeFile(QUIZZES_FILE, JSON.stringify({ users, quizzes: data }, null, 2));
  } else {
    await fs.writeFile(QUIZZES_FILE, JSON.stringify(data, null, 2));
  }
}

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const data = await loadQuizzes();
    console.log('Loaded data:', data);
    // Extract only quizzes array from the file
    let quizzes = [];
    if (Array.isArray(data)) {
      quizzes = data;
    } else if (data && data.quizzes) {
      quizzes = data.quizzes;
    }
    console.log('Returning quizzes:', quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error('Error loading quizzes:', error);
    res.status(500).json({ error: 'Failed to load quizzes' });
  }
});

// Get quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const data = await loadQuizzes();
    const quizzes = Array.isArray(data) ? data : (data.quizzes || []);
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
    console.log('Received quiz data:', req.body);
    const newQuiz = req.body;
    const data = await loadQuizzes();
    
    // Handle both array format and object format with quizzes property
    let quizzes;
    let isArrayFormat = Array.isArray(data);
    
    console.log('Current data format:', isArrayFormat ? 'array' : 'object');
    
    if (isArrayFormat) {
      quizzes = data;
    } else {
      quizzes = data.quizzes || [];
    }
    
    quizzes.push(newQuiz);
    
    // Save in the same format as it was loaded
    if (isArrayFormat) {
      await saveQuizzes(quizzes);
    } else {
      await saveQuizzes({ ...data, quizzes });
    }
    
    console.log('Quiz saved successfully:', newQuiz);
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Error adding quiz:', error);
    res.status(500).json({ error: 'Failed to add quiz', details: error.message });
  }
});

// Update quiz
app.put('/api/quizzes/:id', async (req, res) => {
  try {
    const updatedQuiz = req.body;
    const data = await loadQuizzes();
    
    let quizzes;
    let isArrayFormat = Array.isArray(data);
    
    if (isArrayFormat) {
      quizzes = data;
    } else {
      quizzes = data.quizzes || [];
    }
    
    const index = quizzes.findIndex(q => q.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    quizzes[index] = updatedQuiz;
    
    if (isArrayFormat) {
      await saveQuizzes(quizzes);
    } else {
      await saveQuizzes({ ...data, quizzes });
    }
    
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Delete quiz
app.delete('/api/quizzes/:id', async (req, res) => {
  try {
    const data = await loadQuizzes();
    
    let quizzes;
    let isArrayFormat = Array.isArray(data);
    
    if (isArrayFormat) {
      quizzes = data;
    } else {
      quizzes = data.quizzes || [];
    }
    
    const filteredQuizzes = quizzes.filter(q => q.id !== req.params.id);
    if (filteredQuizzes.length === quizzes.length) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    if (isArrayFormat) {
      await saveQuizzes(filteredQuizzes);
    } else {
      await saveQuizzes({ ...data, quizzes: filteredQuizzes });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
