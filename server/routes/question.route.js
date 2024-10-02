import express from 'express';
import { nextQuestion,submitQuestion } from '../controllers/question.controller.js';
const router = express.Router();

router.get('/next-question',nextQuestion)
router.post('/submit-attempts',submitQuestion)
export default router;