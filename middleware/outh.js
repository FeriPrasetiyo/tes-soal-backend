const { request } = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models')

async function authentication(req, res, next){
    try {
        // console.log('auth');
        const {aksestoken} = req.headers
        // console.log('ini req', req.headers);
        const payload = jwt.verify(aksestoken, process.env.key)
        // console.log('ini payload', payload);
        const data = await User.findOne({where: {id: payload.id}})

        req.user = {id: data.dataValues.id, name: data.dataValues.name, admin:data.dataValues.is_admin}
        next()
    }
    catch(error) {
        next(error)
    }
}

module.exports = authentication;