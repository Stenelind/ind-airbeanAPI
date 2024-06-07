import db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const createUser = (req, res, next) => {
    const { username, password } = req.body;

    db.findOne({ _id: 'userIdCounter' }, (err, counter) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve user count' });
        }

        const newUserId = counter ? counter.value + 1 : 1;

        const newUser = {
            userId: uuidv4(), 
            username,
            password,
            createdAt: new Date()
        };

        db.insert(newUser, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Det gick inte att skapa användare' });
            }

           
            db.update({ _id: 'userIdCounter' }, { $set: { value: newUserId } }, { upsert: true }, (err) => {
                if (err) {
                    console.error('Det gick inte att uppdatera userId counter');
                }
                req.user = user;
                next();
            });
        });
    });
};

export default createUser;
