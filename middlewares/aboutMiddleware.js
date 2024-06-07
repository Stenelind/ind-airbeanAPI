
const aboutStatus = (req, res, next) => {
    res.status(404).send("Produkt information inte hittad");

    next();
};

export { aboutStatus };