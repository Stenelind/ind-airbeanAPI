

const admin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (username === 'admin' && password === 'admin') {
            return next();
        }
    }

    const { username, password } = req.body;
    if (username && password) {
        if (username === 'admin' && password === 'admin') {
            return next();
        }
    }

    return res.status(403).json({ message: 'Åtkomst nekad' });
};

export default admin;