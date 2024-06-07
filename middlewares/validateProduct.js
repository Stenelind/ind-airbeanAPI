
import { menu } from '../data/menu.js';

// Middleware för att validera produkten i menyn
const validateProduct = (req, res, next) => {
    const product = menu.find(item => item.id === req.body.id);

    if (!product || product.price !== req.body.price) {
        return res.status(400).json({ error: 'Fel produkt eller pris' });
    }

    next();
};

export default validateProduct;

