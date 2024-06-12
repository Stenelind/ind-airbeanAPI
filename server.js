import express from 'express';
import aboutRouter from './routes/about.js'
import orderRoutes from './routes/orders.js';
import productsRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import menuRoutes, { insertMenu } from './db/menu.js';



const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/about', aboutRouter);
app.use('/orders', orderRoutes);
app.use('/products', productsRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);

insertMenu((err) => {
    if (err) {
        console.error('Det gick inte att lägga till menyn:', err);
    } else {
        console.log('Meny tillagd i dbmenu.db:');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});