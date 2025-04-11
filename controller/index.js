const { User, dokter, jatwal } = require("../models");
const bcrypt = require("bcryptjs");
const { json } = require("express/lib/response");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const models = require("../models/index.js");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, pass, is_admin } = req.body;
      // Check if user with the same name already exists
      const checkData = await User.findOne({ where: { name } });
      if (checkData) {
        return res.status(400).json({ message: "User already exists" });
      }
      const password = bcrypt.hashSync(pass, saltRounds);
      const data = await User.create({ name, password, is_admin });
      res.status(201).json({ message: "User registered successfully", data });
    } catch (error) {
      console.error("Error registering user:", error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { name, password } = req.body;

      const user = await User.findOne({
        where: {
          name: name,
        },
      });
      //check Email exist
      if (!user || user.name !== name) return res.status(401).json("error");
      // check Password
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) return res.status(401).json("error");
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.key);
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json(new Response(error, false));
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, is_admin } = req.body;
      const data = await User.update(
        { name, is_admin },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: "Uppdating user successfully.", data });
    } catch (error) {
      console.error("error upddating:", error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.destroy({ where: { id } });
      res.status(200).json({ message: "User deleted successfully.", data });
    } catch (error) {
      console.error("error deleting:", error);
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const offset = (page - 1) * limit;

      const total = await User.count();
      const pages = Math.ceil(total / limit);

      const data = await User.findAll();
      res.status(200).json({ message: "Get User", total, pages, offset, data });
    } catch (error) {
      console.error("Internal server error:", error);
      next(error);
    }
  }

  static async getUserId(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const offset = (page - 1) * limit;

      const total = await User.count();
      const pages = Math.ceil(total / limit);

      const userId = req.params.id;
      const data = await User.findByPk(userId);
      if (data) {
        res
          .status(200)
          .json({ message: "Get Data", total, pages, offset, data });
      } else {
        res.status(200).json({ message: "User not found", data });
      }
    } catch (error) {
      console.error("Internal server error:", error);
      next(error);
    }
  }

  static async createDokter(req, res, next) {
    try {
      const { doctor_id, doctor_name, status } = req.body;
      const data = await dokter.create({
        doctor_id,
        doctor_name,
        status,
      });
      if (!data) {
        return res.status(401).json("wkowkow");
      }
      res.status(201).json({ message: "doktor successfully created", data });
    } catch (error) {
      console.error("ERROR DETAIL:", error.message);
      console.error("ERROR STACK:", error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  static async getDokter(req, res, next) {
    console.log("jalan1");
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const offset = (page - 1) * limit;
      const total = await dokter.count();
      const pages = Math.ceil(total / limit);
      const data = await dokter.findAll();
      res
        .status(200)
        .json({ message: "Get dokter", total, pages, offset, data });
    } catch (error) {
      console.log("jalan 3");
      console.error("ERROR DETAIL:", error.message);
      console.error("ERROR STACK:", error.stack);
      res.status(500).json({ message: error.message });
    }
  }

  static async creatJatwal(req, res, next) {
    try {
      const {
        doctor_id,
        day,
        time_start,
        time_finish,
        status,
        doctor_name,
        date,
      } = req.body;
      const data = await jatwal.create({
        doctor_id,
        day,
        time_start,
        time_finish,
        status,
        doctor_name,
        date,
      });
      res.status(201).json({ message: "doktor successfully created", data });
    } catch (error) {
      console.error("error creating:", error);
      next(error);
    }
  }
  static async getJatwal(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const offset = (page - 1) * limit;

      const total = await jatwal.count();
      const pages = Math.ceil(total / limit);

      const data = await jatwal.findAll();
      res
        .status(200)
        .json({ message: "Get jatwal", total, pages, offset, data });
    } catch (error) {
      console.error("Internal server error:", error);
      next(error);
    }
  }
}

module.exports = Controller;
