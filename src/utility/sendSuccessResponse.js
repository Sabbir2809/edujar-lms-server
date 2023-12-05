const sendSuccessResponse = (res, data) => {
  res.status(data.statusCode).json({
    status: true,
    data: data.data,
  });
};
module.exports = sendSuccessResponse;
