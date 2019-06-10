module.exports = function CustomError(code) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
};

require('util').inherits(module.exports, Error);