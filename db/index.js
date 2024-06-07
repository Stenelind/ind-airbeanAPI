import Datastore from 'nedb';

const db = new Datastore({ filename: './db/users.db', autoload: true });

export default db;