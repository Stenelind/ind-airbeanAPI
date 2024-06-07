
import express from 'express';
import loadMenu from '../middlewares/loadMenu.js';

const router = express.Router();

// Endpoint att hämta alla produkter
router.get('/', loadMenu, (req, res) => {
    res.json(req.menu);
});

export default router;

