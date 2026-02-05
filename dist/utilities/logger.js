"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = ((request, response, next) => {
    console.log(request.method, request.url);
    next();
});
exports.default = logger;
