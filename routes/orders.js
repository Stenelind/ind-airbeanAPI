import express from 'express';
import Datastore from 'nedb';
import validateProduct from '../middlewares/validateProduct.js';
import errorHandler from '../middlewares/orderMiddleWare.js';
import { insertMenu } from '../db/menu.js';

const router = express.Router();
const dbCart = new Datastore({ filename: './db/cart.db', autoload: true });

// Funktion för att lägga till en produkt i varukorgen
export function addToCart(product, callback) {
    dbCart.insert(product, callback);
}

router.post('/menu', (req, res, next) => {
    const menu = req.body;  
    insertMenu(menu, (err, newDoc) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ message: 'Meny tillagd i databasen', menu: newDoc });
    });
});

router.post('/add-to-cart', validateProduct, (req, res, next) => {
    addToCart(req.body, (err, newDoc) => {
        if (err) {
            return next(err); // Vidarebefordra felet till middleware för felhantering
        }
        res.status(200).send({ message: 'Produkt tillagd i varukorgen', product: newDoc });
    });
});

// Funktion för att ladda ner alla produkter i varukorgen
export function getCart(callback) {
    dbCart.find({}, callback);
}

router.get('/cart', (req, res, next) => {
    getCart((err, products) => {
        if (err) {
            return next(err); // Vidarebefordra felet till middleware för felhantering
        }

        // Beräkna totalpriset för produkterna i varukorgen
        const totalPrice = products.reduce((total, product) => total + Number(product.price), 0);

        // Skicka tillbaka produkterna tillsammans med totalpriset
        res.status(200).json({ products, totalPrice });
    });
});

// Funktion för att ta bort en produkt från varukorgen
export function deleteFromCart(productId, callback) {
    console.log('Tar bort produkten med ID:', productId);

    dbCart.remove({ _id: productId }, {}, (err, numRemoved) => {
        if (err) {
            console.error('Fel vid borttagning av produkt:', err);  // Loggfel om borttagning av produkten misslyckas
            return callback(err);
        }
        console.log('Produkt med ID:', productId, 'borttagen. Antal borttagna:', numRemoved); // Loggfel om borttagning av produkten lyckas
        callback(null, numRemoved);
    });
}

router.delete('/cart/:id', (req, res, next) => {
    const productId = req.params.id;

    deleteFromCart(productId, (err, numRemoved) => {
        if (err) {
            return next(err);  // Vidarebefordra felet till middlevare för felhantering
        }
        if (numRemoved === 0) {
            return res.status(404).send('Produktet finns inte i varukorgen');
        }
        res.status(200).send('Produktet har tagits bort från varukorgen');
    });
});

router.post('/orders', (req, res, next) => {
    try {
        const orderItems = req.body.items;
        if (!orderItems || !Array.isArray(orderItems)) {
            return res.status(400).json({ error: 'Invalid items array' });
        }

        const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);

       
        const processingTime = new Date();
        processingTime.setMinutes(processingTime.getMinutes() + 15);

        
        const order = {
            userId: req.body.userId || 'guest',
            items: orderItems,
            totalAmount: totalAmount,
            status: 'Levereras ' + processingTime.toLocaleTimeString(), 
            createdAt: new Date()
        };

        dbCart.insert(order, (err, newDoc) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({ message: 'Order skapad', orderId: newDoc._id });
        });
    } catch (error) {
        next(error);
    }
});


router.get('/history/:userId', (req, res, next) => {
    const userId = req.params.userId;

    dbCart.find({ userId }, (err, orders) => {
        if (err) {
            return next(err);
        }
        res.status(200).json(orders);
    });
});


router.use(errorHandler);

export default router;