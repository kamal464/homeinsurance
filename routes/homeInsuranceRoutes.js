// routes/homeInsuranceRoutes.js

import express from 'express';
import {
    createHomeInsurance,
    getHomeInsurances,
    getHomeInsurance,
    updateHomeInsurance,
    deleteHomeInsurance
} from '../controllers/homeInsuranceController.js';

const router = express.Router();

// CRUD operations
router.post('/', createHomeInsurance); // Create
router.get('/', getHomeInsurances);     // Read all
router.get('/:id', getHomeInsurance);   // Read by ID
router.put('/:id', updateHomeInsurance); // Update
router.delete('/:id', deleteHomeInsurance); // Delete

export default router;
