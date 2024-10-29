import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} from '../controllers/questionController.js';

const routerquestion = express.Router();

// POST: Create a new FAQ Question
routerquestion.post('/question', createQuestion);

// GET: Fetch all FAQ Questions
routerquestion.get('/question', getAllQuestions);

// GET: Fetch a single FAQ Question by ID
routerquestion.get('/question/:id', getQuestionById);

// PUT: Update an FAQ Question
routerquestion.put('/question/:id', updateQuestion);

// DELETE: Delete an FAQ Question
routerquestion.delete('/question/:id', deleteQuestion);

export default routerquestion;
