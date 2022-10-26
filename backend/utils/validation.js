
const { validationResult } = require('express-validator'); 

/*
define an Express middleware called handleValidationErrors that will call 
validationResult from the express-validator package passing in the request. 
If there are no validation errors returned from the validationResult function, 
invoke the next middleware. If there are validation errors, create an error with 
all the validation error messages and invoke the next error-handling middleware.
*/
// validate req.body inputs for both signup & login endpoints
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req); 

    let errorObj = {}; 
    const validationErrorsArr = validationErrors.array(); 
    if(validationErrorsArr.length){
        validationErrorsArr.forEach(error => {
            errorObj[error.param] = error.msg; 
        })
        res.status(400); 
        return res.json({
            message: "Validation error", 
            statusCode: 400, 
            errors: errorObj
        })
    } else if (!validationErrorsArr.length){
        return next(); 
    }
}; 





module.exports = { 
    handleValidationErrors
}