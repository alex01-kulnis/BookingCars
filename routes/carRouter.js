const Router = require('express');
const router = new Router();
const carController = require('../controllers/CarController');

router.get('/cars', carController.getFreeCars);
router.get('/cars/reply', carController.getCarsReply);

module.exports = router;
