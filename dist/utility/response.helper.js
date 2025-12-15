"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleSuccess = void 0;
const handleSuccess = (data, message = 'Success') => ({
    success: true,
    message,
    data,
});
exports.handleSuccess = handleSuccess;
const handleError = (message = 'Something went wrong') => ({
    success: false,
    message,
    data: null,
});
exports.handleError = handleError;
//# sourceMappingURL=response.helper.js.map