import { Router } from 'express';
import {aboutStatus} from '../middlewares/aboutMiddleware.js';
import { menu } from '../data/menu.js';

const router = Router();

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const item = menu.find(mi => mi.id === id);
    res.json(item.about)
    next();
});

router.use(aboutStatus)

export default router;