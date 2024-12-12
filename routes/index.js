var express = require('express');
var router = express.Router();
const authentication = require('../middleware/outh')
const controller = require('../controller/index');
const app = express();


// POST /users/register
router.post('/users/register', controller.register);
// POST /users/login
router.post('/users/login', controller.login);
router.use(authentication)

// PATCH /users/:id
router.patch('/users/:id', controller.update);
// DELETE /users/:id
router.delete('/users/:id', controller.delete);
// GET /users
router.get('/users', controller.getUser);
// GET /users/:id
router.get('/users/:id', controller.getUserId);


router.get('/users/dokter', controller.getDokter);
// POST /users/dokter
router.post('/users/dokter', controller.createDokter);

router.get('/users/jatwal', controller.getJatwal);
// POST /users/dokter
router.post('/users/jatwal', controller.creatJatwal);


module.exports = router;