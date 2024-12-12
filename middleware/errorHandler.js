async function errorHandler(error, req, res, next) {
    try {
        if (error.name === "verboden") {
            res.status(403).json({ message: 'inaccessible' })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = errorHandler;