import express from 'express';
import passportAuth from '../authentication/passportAuth';
import referenceDataController from '../controllers/referenceDataController';

var router = express.Router();


/* GET Reference Data Endpoint. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Veniqa Reference Data' });
});

router.use(passportAuth.isAuthenticated);

router.get('/getCatalogBundle', referenceDataController.getCatalogBundle);

router.get('/getStores', referenceDataController.getStores);

router.get('/getRoles', referenceDataController.getRoles);

router.get('/getWeightUnits', referenceDataController.getWeightUnits);

router.get('/productCategoryList', referenceDataController.getProductCategoryList);

router.post('/productCategory', referenceDataController.addProductCategory);

router.get('/productCategory', referenceDataController.getProductCategory);

router.put('/productCategory', referenceDataController.updateProductCategory);

router.get('/tariffList', referenceDataController.getTariffList);

router.post('/tariff', referenceDataController.addTariffCategory);

router.get('/tariff', referenceDataController.getTariffCategory);

router.put('/tariff', referenceDataController.updateTariffCategory);

module.exports = router;