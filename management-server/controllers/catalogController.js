import catalogService from "../services/catalogService";
import httpStatus from 'http-status-codes';
import logger from '../logging/logger';

export default {
    async searchCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.searchCatalog(req.body.pagingOptions, req.body.searchTerm, req.body.sortRule);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in searchCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async addProductToCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.addProductToCatalog(req.body, req.user);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in addProductToCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async getProductDetails(req, res, next) {
        let response;
        try {
            response = await catalogService.getProductDetails(req.query.productId);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in getProductDetails Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async updateProductInCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.updateProductInCatalog(req.body, req.user);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in updateProductInCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async deleteProductFromCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.deleteProductFromCatalog(req.body.productId);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in deleteProductFromCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    // start ysd
    async searchSaleCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.searchSaleCatalog(req.body.pagingOptions, req.body.searchTerm, req.body.sortRule, req.user);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in searchSaleCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async addSaleProductToCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.addSaleProductToCatalog(req.body, req.user);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in addSaleProductToCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async getSaleProductDetails(req, res, next) {
        let response;
        try {
            response = await catalogService.getSaleProductDetails(req.query.productId);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in getSaleProductDetails Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async updateSaleProductInCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.updateSaleProductInCatalog(req.body, req.user);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in updateSaleProductInCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async deleteSaleProductFromCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.deleteSaleProductFromCatalog(req.body.productId);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in deleteProductFromCatalog Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },
    async getBestPrice(req, res, next) {
        let response;
        try {
            response = await catalogService.getBestPrice(req.body.id);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in getBestPrice Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },
    async getInStock(req, res, next) {
        let response;
        try {
            response = await catalogService.getInStock(req.body.id);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in getInStock Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    // end ysd

    async getPresignedUrlsForCatalogImageUploads(req, res, next) {
        let response;
        try {
            response = await catalogService.getPresignedUrlsForCatalogImageUploads(req.query.productId, req.query.numberOfThumbnailAndDetailedImages, req.query.numberOfFeaturedImages);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in getPresignedUrlsForCatalogImageUploads Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }   
    }
}