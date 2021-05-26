import express from 'express';
import passportAuth from '../authentication/passportAuth';
import uiController from '../controllers/uiController.js';
var router = express.Router();

/* GET UI Customizations Endpoint. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Veniqa User Interface Customizations' });
});

router.use(passportAuth.isAuthenticated);

router.post('/featured', uiController.updateOrUpsertFeaturedSection);

router.get('/featuredList', uiController.getAllFeaturedSections);

router.get('/featured', uiController.getFeaturedSection);

router.delete('/featured', uiController.deleteFeaturedSection);

module.exports = router;