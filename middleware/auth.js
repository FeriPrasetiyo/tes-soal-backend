async function authorization(req, res, next) {
    try {
        // console.log('ini req autorization', req.user);
        if (req.user.admin) {
            next()
        } else {
            throw ({ name: 'verboden' })
        }
    }catch (error) {
        next(error)
    }
}

module.exports = authorization;