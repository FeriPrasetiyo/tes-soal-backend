const { request } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { json } = require("express/lib/response");

async function authentication(req, res, next) {
  try {
    // console.log("auth");
    const aksestoken = req.headers.authorization;
    const token = aksestoken.split(" ")[1];
    // console.log(aksestoken);
    const payload = jwt.verify(token, process.env.key);
    // console.log("ini payload", payload);
    const data = await User.findOne({ where: { id: payload.id } });

    req.user = {
      id: data.dataValues.id,
      name: data.dataValues.name,
      admin: data.dataValues.is_admin,
    };
    next();
  } catch (error) {
    return res.status(500).json(error);
    next(error);
  }
}

module.exports = authentication;
