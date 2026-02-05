"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageQuery = void 0;
const checkFilename = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    return filename !== null && filename.length > 0;
});
const checkDimension = (dimension) => __awaiter(void 0, void 0, void 0, function* () {
    return dimension !== null && dimension.length > 0;
});
const validateDimension = (dimension) => __awaiter(void 0, void 0, void 0, function* () {
    return !isNaN(Number(dimension)) && Number(dimension) > 0;
});
const validateImageQuery = (properties) => __awaiter(void 0, void 0, void 0, function* () {
    const [filenameExists, widthExists, heightExists, validWidth, validHeight] = yield Promise.all([
        checkFilename(properties.filename),
        checkDimension(properties.width),
        checkDimension(properties.height),
        validateDimension(properties.width),
        validateDimension(properties.height),
    ]);
    return {
        filenameExists,
        widthExists,
        heightExists,
        validWidth,
        validHeight,
    };
});
exports.validateImageQuery = validateImageQuery;
