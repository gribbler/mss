import express from 'express';
import passportAuth from '../authentication/passportAuth';
import deliveryController from '../controllers/deliveryController';
var router = express.Router();

/* GET Catalog Endpoint. */
// router.use(passportAuth.isAuthenticated);

router.post('/getallareas',deliveryController.searchArea);

router.post('/addArea',deliveryController.addArea);

router.put('/editArea', deliveryController.editArea);

router.delete('/deleteArea', deliveryController.deleteArea);

module.exports = router;