const Router = require('express');
const router = new Router();
const carController = require('../controllers/carController');

router.post('/cars', carController.getFreeCars);
router.get('/cars', carController.getFreeCars);
// router.get('/:id', carController);

module.exports = router;
