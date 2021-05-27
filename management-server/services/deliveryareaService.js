import DeliveryArea from '../database/models/deliveryarea'
import httpStatus from 'http-status-codes';
import logger from '../logging/logger';

export default {
    async searchArea(userName) {
        let result = {};
        try {
            let deliveryareas = await DeliveryArea.find({vendor: userName},'_id areaName deliverCost minimumPurchase zipCodes');
            result = {httpStatus: httpStatus.OK, status: "successful", responseData: deliveryareas};
            return result;
        }   
        catch(err) {
            logger.error("Error in SearchArea Service", {meta: err});
            result = {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: err};
            return result;
        }
    },

    async addArea(area, userName){
        let result = {};
        try {
            let dArea = new DeliveryArea(area);
            dArea.vendor = userName;
            console.log(dArea);

            //check if this data is in database.
            let oldData = await DeliveryArea.find({areaName: dArea.areaName, vendor: dArea.vendor},'_id areaName');

            if(oldData.length > 0){
                result = {httpStatus: httpStatus.OK, status: "failed", errorDetails:  'Delivery Area with this Name is already in Database.'};
                return result;
            }
            dArea = await dArea.save();

            if(!dArea){
                result = {httpStatus: httpStatus.OK, status: "failed", errorDetails: 'An error occurred while saving New data.'};
                return result;
            }
            result = {httpStatus: httpStatus.OK, status: "success", responseData: 'successfully saved.'};
            return result;
        }
        catch(err) {
            logger.error("Error in addArea Service", {meta: err});
            result = {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: err};
            return result;
        }
    },

    async editArea(area, vendor) {
        let result = {};
        try {
            // check if the name is conflict with database.
            let oldData = await DeliveryArea.find({areaName: area.areaName, vendor: vendor},'_id');

            console.log(area, oldData);
            if((oldData.length > 0)&&(oldData[0]._id != area._id)){
                result = {httpStatus: httpStatus.OK, status: "failed", errorDetails:  'Delivery Area with this Name is already in Database.'};
                return result;
            }
            let areaData = await DeliveryArea.findOneAndUpdate({_id: area._id},area);

            if(!areaData) {
                result = {httpStatus: httpStatus.OK, status: "failed", errorDetails:'an error occurred while saving Edit data.'};
                return result;
            }
            result = {httpStatus: httpStatus.OK, status: "success", responseData: 'successfully saved.'};
            return result;             
        }
        catch(err) {
            logger.error("Error in getArea Service", {meta: err});
            result = {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: err};
            return result;
        }
    },

    async deleteArea(dId){
        let result = {};
        try {
            let areaData = await DeliveryArea.remove({_id: dId}).exec();

            // if removal not successful, return failure
            if (!areaData) {
                result = {httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)};
                return result;
            }

            result = {httpStatus: httpStatus.OK, status: "successful", responseData: areaData};
            return result;
        }
        catch(err) {
            logger.error("Error in deleteArea Service", {meta: err});
            result = {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: err};
            return result;
        }
    },
}