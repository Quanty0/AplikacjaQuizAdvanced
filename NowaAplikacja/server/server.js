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
<<<<<<< HEAD
async function loadData() {
  try {
    const data = await fs.readFile(QUIZZES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { users: [], quizzes: [] };
  }
}

=======
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
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

<<<<<<< HEAD
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email i hasło są wymagane' });
    }
    
    const allData = await loadData();
    const users = allData.users || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email już zarejestrowany' });
    }
    
    // Generate new ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUser = {
      id: newId,
      name: name || email.split('@')[0],
      email,
      password,
      role: isAdmin ? 'admin' : 'user'
    };
    
    users.push(newUser);
    await fs.writeFile(QUIZZES_FILE, JSON.stringify({ users, quizzes: allData.quizzes }, null, 2));
    
    res.status(201).json({ 
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isAdmin: newUser.role === 'admin'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Rejestracja nie powiodła się' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email i hasło są wymagane' });
    }
    
    const allData = await loadData();
    const users = allData.users || [];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    }
    
    res.json({ 
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Logowanie nie powiodło się' });
  }
});

=======
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
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
<<<<<<< HEAD
    res.status(500).json({ error: 'Nie udało się załadować quizów' });
=======
    res.status(500).json({ error: 'Failed to load quizzes' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
  }
});

// Get quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const data = await loadQuizzes();
    const quizzes = Array.isArray(data) ? data : (data.quizzes || []);
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (!quiz) {
<<<<<<< HEAD
      return res.status(404).json({ error: 'Quiz nie znaleziony' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się załadować quizu' });
=======
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load quiz' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
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
<<<<<<< HEAD
    res.status(500).json({ error: 'Nie udało się dodać quizu', details: error.message });
=======
    res.status(500).json({ error: 'Failed to add quiz', details: error.message });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
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
<<<<<<< HEAD
      return res.status(404).json({ error: 'Quiz nie znaleziony' });
=======
      return res.status(404).json({ error: 'Quiz not found' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
    }
    quizzes[index] = updatedQuiz;
    
    if (isArrayFormat) {
      await saveQuizzes(quizzes);
    } else {
      await saveQuizzes({ ...data, quizzes });
    }
    
    res.json(updatedQuiz);
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ error: 'Nie udało się zaktualizować quizu' });
=======
    res.status(500).json({ error: 'Failed to update quiz' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
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
<<<<<<< HEAD
      return res.status(404).json({ error: 'Quiz nie znaleziony' });
=======
      return res.status(404).json({ error: 'Quiz not found' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
    }
    
    if (isArrayFormat) {
      await saveQuizzes(filteredQuizzes);
    } else {
      await saveQuizzes({ ...data, quizzes: filteredQuizzes });
    }
    
    res.json({ success: true });
  } catch (error) {
<<<<<<< HEAD
    res.status(500).json({ error: 'Nie udało się usunąć quizu' });
=======
    res.status(500).json({ error: 'Failed to delete quiz' });
>>>>>>> 6712cf54f095b36b1423cef33b38c5818cdbc37f
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
