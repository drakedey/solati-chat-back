const ErrorResponse = require('../utils/errorResponse');

const errorDictionary = [
  {
    errorIdentifiers: ['23505'],
    getErrorResponse: (err) => new ErrorResponse(`${err.detail}`, 400),
  },
];

const getErrorResponseFromDictionary = (err) => {
  const errorCriteria = err.code || err.name;
  const error = errorDictionary.find((errDic) => {
    return errDic.errorIdentifiers.includes(errorCriteria)
  }
    
  );

  if (!error) return new ErrorResponse('Internal Server Error', 500);

  return error.getErrorResponse(err);
};

const errorHandler = (err, req, res, next) => {
  //Log to console for the development
  const customError = err instanceof ErrorResponse ? err : getErrorResponseFromDictionary(err);
  console.log(err)
  res
    .status(customError.statusCode || 500)
    .json({ success: false, error: customError.message || 'Server Error' });
};

module.exports = errorHandler;
