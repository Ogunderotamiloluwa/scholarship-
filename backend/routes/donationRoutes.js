import express from 'express';
import { submitDonationForm } from '../controllers/donationController.js';

const router = express.Router();

/**
 * POST /api/forms/donation
 * Submit donation form
 */
router.post('/donation', submitDonationForm);

export default router;
