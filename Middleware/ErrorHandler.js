const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode ? res.statusCode : 500;

  switch (statuscode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "Forbiden",
        message: err.message,
        stackTrace: err.stackTrace,
      });

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stackTrace,
      });

      case constants.SERVER_ERROR:
        res.json({
          title: "internal Server Error",
          message: err.message,
          stackTrace: err.stackTrace,
        });

      default:
        console.log("Ooooops sorry an error occured!!!")
      break;
  }
};

module.exports = errorHandler;
