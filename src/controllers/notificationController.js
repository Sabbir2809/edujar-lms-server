const NotificationModel = require("../models/notificationModel");
const CreateService = require("../services/CreateService");
const {
  getAllNotificationService,
  updateNotificationService,
  deleteNotificationService,
} = require("../services/NotificationService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");
//create Notification
exports.createNotification = async (req, res) => {
  try {
    const result = await CreateService(req, NotificationModel);
    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// get All Notification
exports.getAllNotification = async (req, res, next) => {
  try {
    const result = await getAllNotificationService();
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateNotification = async (req, res, next) => {
  try {
    const result = await updateNotificationService(req);
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteNotification = async (req, res, next) => {
  try {
    const result = await deleteNotificationService(req);
    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
