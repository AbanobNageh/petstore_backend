global.errorCodes = {
  USER_NOT_FOUND: 1,
  INCORRECT_INPUT: 2,
  BID_REGISTERED: 3,
  PET_NOT_FOUND: 4,
  UNKNOWN_ERROR: 5,
};

/**
*
* The error messages corresponding to each internal error code and language code combination.
*
*/
const errorMessages = {
  "1_en": "User not found.",
  "2_en": "One or more of the inputs is incorrect",
  "3_en": "This user has already made a bid",
  "4_en": "Pet not found.",
  "5_en": "An unknown error has occurred",
};

/**
*
* Returns the error object corresponding to the internal error code and the language code.
* @param {Number} statusCode The status code to include with the error response.
* @param {Number} internalErrorCode The internal error code, should be from the global errorCodes object.
* @param {String} languageCode The error message code.
*
*/
module.exports.getErrorObject = async (statusCode, internalErrorCode, languageCode) => {
  const errorObject = {
    code: statusCode,
    type: 'String',
    message: await this.getErrorMessageByErrorCode(internalErrorCode, languageCode),
  };

  return errorObject;
};

/**
*
* Returns the error message corresponding to the internal error code and the language code.
* @param {Number} errorCode The internal error code, should be from the global errorCodes object.
* @param {String} languageCode The error message code.
* @returns {String} Returns the error message as string.
*
*/
module.exports.getErrorMessageByErrorCode = async (errorCode, languageCode) => {
  return errorMessages[String(errorCode) + "_" + String(languageCode)];
};
