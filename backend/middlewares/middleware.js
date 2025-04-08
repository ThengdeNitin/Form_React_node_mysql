const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode != 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status : false,
    message : err.stack || 'Internal Server Error!!!',
  });
};

export default errorHandler;