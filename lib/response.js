"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateError = exports.Success = exports.UnauthorizedError = exports.ConflictError = exports.InternalServerError = exports.NotFoundError = exports.BadRequestError = void 0;
const BadRequestError = (message, available) => {
    return {
        code: 400,
        error: 'Bad Request',
        message: message,
        available: available,
    };
};
exports.BadRequestError = BadRequestError;
const NotFoundError = (message) => {
    return {
        code: 404,
        error: 'Not Found',
        message: message,
    };
};
exports.NotFoundError = NotFoundError;
const InternalServerError = (message) => {
    return {
        code: 500,
        error: 'Internal Server Error',
        message: message,
    };
};
exports.InternalServerError = InternalServerError;
const ConflictError = (message) => {
    return {
        code: 409,
        error: 'Conflict',
        message: message,
    };
};
exports.ConflictError = ConflictError;
const UnauthorizedError = (message) => {
    return {
        code: 401,
        error: 'Unauthorized',
        message: message,
    };
};
exports.UnauthorizedError = UnauthorizedError;
const Success = (message) => {
    return {
        code: 200,
        message: 'Success',
        data: message,
    };
};
exports.Success = Success;
const generateError = (error) => {
    var _a, _b, _c, _d, _e;
    console.log(error);
    if (((_a = error.original) === null || _a === void 0 ? void 0 : _a.routine) === 'errorMissingColumn')
        return (0, exports.BadRequestError)('Invalid attributes');
    if (error.isAxiosError) {
        console.error(`Axios Error: ${(_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message}`);
        return (0, exports.BadRequestError)((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message);
    }
    if (!error.code) {
        return (0, exports.InternalServerError)(error.message);
    }
    return error;
};
exports.generateError = generateError;
//# sourceMappingURL=response.js.map