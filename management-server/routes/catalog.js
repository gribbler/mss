import express from 'express';
import passportAuth from '../authentication/passportAuth';
import catalogController from '../controllers/catalogController';
var router = express.Router();

/* GET Catalog Endpoint. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Veniqa Curated Catalog' });
});

router.use(passportAuth.isAuthenticated);

router.post('/search', catalogController.searchCatalog);

router.post('/addProduct', catalogController.addProductToCatalog);

router.get('/getProductDetails', catalogController.getProductDetails);

router.put('/updateProduct', catalogController.updateProductInCatalog);

router.delete('/deleteProduct', catalogController.deleteProductFromCatalog);

router.get('/getPresignedUrlsForCatalogImageUploads', catalogController.getPresignedUrlsForCatalogImageUploads);
//start ysd
router.post('/salesearch', catalogController.searchSaleCatalog);

router.post('/addSaleProduct', catalogController.addSaleProductToCatalog);

router.get('/getSaleProductDetails', catalogController.getSaleProductDetails);

router.put('/updateSaleProduct', catalogController.updateSaleProductInCatalog);

router.delete('/deleteSaleProduct', catalogController.deleteSaleProductFromCatalog);

router.post('/getBestPrice', catalogController.getBestPrice);

router.post('/getInStock', catalogController.getInStock);
//end ysd
module.exports = router;