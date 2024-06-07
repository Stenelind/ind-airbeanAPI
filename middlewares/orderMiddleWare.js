

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send('Ett fel uppstod på servern.');
}

export default errorHandler;