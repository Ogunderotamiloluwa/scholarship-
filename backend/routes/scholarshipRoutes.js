import express from 'express';
import { submitScholarshipForm } from '../controllers/scholarshipController.js';

const router = express.Router();

/**
 * POST /api/forms/scholarship
 * Submit scholarship application form
 */
router.post('/scholarship', submitScholarshipForm);

export default router;
