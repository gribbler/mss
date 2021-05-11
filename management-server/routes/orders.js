import express from 'express';
import orderController from '../controllers/orderController';
import passportAuth from '../authentication/passportAuth';
var router = express.Router();

router.use(passportAuth.isAuthenticated);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Veniqa Orders' });
});

router.post('/orderList', orderController.getOrderList);

router.get('/order', orderController.getOrderDetails);

router.post('/confirmOrder',  orderController.confirmOrder);

router.post('/cancelOrder', orderController.cancelOrder);

router.post('/markItemAsFulfilling', orderController.markItemAsFulfilling);

router.post('/markItemAsShipped', orderController.markItemAsShipped);

router.post('/markItemAsDelivered', orderController.markItemAsDelivered);

router.put('/updateOrderFulfillmentDetails', orderController.updateOrderFulfillmentDetails);

router.put('/updateShipmentDetails', orderController.updateShipmentDetails);

router.put('/updateDeliveryDetails', orderController.updateDeliveryDetails);

router.post('/addComment', orderController.addComment);

router.put('/editComment', orderController.editComment);

router.delete('/deleteComment', orderController.deleteComment);

module.exports = router;