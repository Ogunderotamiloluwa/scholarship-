import express from 'express';
import { submitGrantForm } from '../controllers/grantController.js';

const router = express.Router();

/**
 * POST /api/forms/grant
 * Submit grant application form
 */
router.post('/grant', submitGrantForm);

export default router;
