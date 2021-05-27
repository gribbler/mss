import deliveryService from '../services/deliveryareaService';
import httpStatus from 'http-status-codes';
import logger from '../logging/logger';

export default {
    async searchArea(req, res, next) {
        let response;
        try {
            response = await deliveryService.searchArea(req.user.userName);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in addComment Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },
    async addArea(req, res, next) {
        let response;
        try {
            response = await deliveryService.addArea(req.body.area, req.user.userName);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in addComment Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async editArea(req, res, next) {
        let response;
        try {
            response = await deliveryService.editArea(req.body, req.user.userName);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in editComment Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    },

    async deleteArea(req, res, next) {
        let response;
        try {
            response = await deliveryService.deleteArea(req.body.dId);
            return res.status(response.httpStatus).send(response);
        }
        catch(err) {
            logger.error("Error in deleteComment Controller", {meta: err});
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: err});
        }
    }
}