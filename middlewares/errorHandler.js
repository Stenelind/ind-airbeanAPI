import express from 'express';
import Datastore from 'nedb';
import errorHandler from '../middlewares/orderMiddleWare.js';

const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

// Middleware dla obsługi błędów
router.use(errorHandler);

export default router;
