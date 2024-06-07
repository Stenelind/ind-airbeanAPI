import { menu } from '../data/menu.js';

// Middleware för att ladda menydata
const loadMenu = (req, res, next) => {
    req.menu = menu;
    next();
};

export default loadMenu;
