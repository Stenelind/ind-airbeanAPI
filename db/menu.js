import express from 'express';
import Datastore from 'nedb';
import Joi from 'joi';
import admin from '../middlewares/adminMiddleware.js';

const dbMenu = new Datastore({ filename: './db/dbmenu.db', autoload: true });
const dbCampaign = new Datastore({ filename: './db/campaigns.db', autoload: true });

const router = express.Router();

const menu = [
    {
        "id": 1,
        "title": "Bryggkaffe",
        "desc": "Bryggd på månadens bönor.",
        "price": 39,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    },
    {
        "id": 2,
        "title": "Caffè Doppio",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    },
    {
        "id": 3,
        "title": "Cappuccino",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    },
    {
        "id": 4,
        "title": "Latte Macchiato",
        "desc": "Bryggd på månadens bönor.",
        "price": 49,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    },
    {
        "id": 5,
        "title": "Kaffe Latte",
        "desc": "Bryggd på månadens bönor.",
        "price": 54,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    },
    {
        "id": 6,
        "title": "Cortado",
        "desc": "Bryggd på månadens bönor.",
        "price": 39,
        "about": "Välkommen till kafferosteri Power Nappers - en passionerad bryggning av tradition och innovation..."
    }
];

const insertMenu = (callback) => {
    dbMenu.count({}, (err, count) => {
        if (err) {
            console.error('Fel:', err);
            callback(err);
            return;
        }
        if (count === 0) {
            dbMenu.insert(menu, (err, newDocs) => {
                if (err) {
                    console.error('Det gick inte att lägga till menyn:', err);
                    callback(err);
                    return;
                }
                console.log('Meny tillagd:', newDocs);
                callback(null);
            });
        } else {
            callback(null);
        }
    });
};

const productSchema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().required()
});

const campaignSchema = Joi.object({
    products: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required()
});


router.post('/login', admin, (req, res) => {
    res.status(200).json({ message: 'Inloggningen lyckades' });
});

router.post('/add-product', admin, (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Felaktig input', details: error.details });
    }

    const { id, title, desc, price } = req.body;
    const newMenuItem = { id, title, desc, price, createdAt: new Date() };

    dbMenu.insert(newMenuItem, (err, newDoc) => {
        if (err) {
            return res.status(500).json({ message: 'Det gick inte att lägga till produkt', error: err });
        }
        res.status(201).json({ message: 'Produkten har lagts till', product: newDoc });
    });
});

router.post('/add-campaign', admin, (req, res) => {
    const { error } = campaignSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Felaktig input', details: error.details });
    }

    const { products, price } = req.body;

    dbMenu.find({ title: { $in: products } }, (err, foundProducts) => {
        if (err) {
            return res.status(500).json({ message: 'Det gick inte att hämta produkter', error: err });
        }

        if (foundProducts.length !== products.length) {
            return res.status(400).json({ message: 'Produkter hittades inte' });
        }

        const campaignProducts = foundProducts.map(product => ({
            id: product.id,
            title: product.title,
        }));

        const newCampaign = { products: campaignProducts, price: price, createdAt: new Date() };

        dbCampaign.insert(newCampaign, (err, newDoc) => {
            if (err) {
                return res.status(500).json({ message: 'Det gick inte att lägga till kampanj', error: err });
            }
            res.status(201).json({ message: 'Kampanj tillagd', campaign: newDoc });
        });
    });
});

router.put('/modify-product/:id', admin, (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Felaktig input', details: error.details });
    }

    const itemId = parseInt(req.params.id);
    const { id, title, desc, price } = req.body;

    const updatedFields = { id, title, desc, price, modifiedAt: new Date() };

    dbMenu.update({ id: itemId }, { $set: updatedFields }, {}, (err, numReplaced) => {
        if (err) {
            console.error('Fel vid ändring av produkt:', err);
            return res.status(500).json({ message: 'Fel vid ändring av produkt', error: err });
        }

        if (numReplaced === 0) {
            return res.status(404).json({ message: 'Produkten hittades inte' });
        }

        res.status(200).json({ message: 'Produkten modifierad', updatedFields });
    });
});

router.delete('/delete-product/:id', admin, (req, res) => {
    const itemId = parseInt(req.params.id);
    dbMenu.remove({ id: itemId }, {}, (err, numRemoved) => {
        if (err) {
            return res.status(500).json({ message: 'Det gick inte att ta bort produkten', error: err });
        }
        if (numRemoved === 0) {
            return res.status(404).json({ message: 'Produkten hittades inte' });
        }
        res.status(200).json({ message: 'Produkten raderad' });
    });
});

export { router as default, insertMenu };