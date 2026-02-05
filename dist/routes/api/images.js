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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.fileExists = exports.getThumbImagePath = exports.getFullImagePath = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const validate_1 = require("./utilities/validate");
const error_1 = require("./utilities/error");
const images = express_1.default.Router();
const fullDirectoryPath = path_1.default.resolve(__dirname, '../../../assets/full');
const thumbDirectoryPath = path_1.default.resolve(__dirname, '../../../assets/thumb');
const getFullImagePath = (imageProperties) => {
    return path_1.default.join(fullDirectoryPath, `${imageProperties.filename}.jpg`);
    ;
};
exports.getFullImagePath = getFullImagePath;
const getThumbImagePath = (imageProperties) => {
    return path_1.default.join(thumbDirectoryPath, `${imageProperties.filename}_${imageProperties.width}x${imageProperties.height}_thumb.jpg`);
};
exports.getThumbImagePath = getThumbImagePath;
const fileExists = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return fs_1.promises.access(filePath)
        .then(() => true)
        .catch(() => false);
});
exports.fileExists = fileExists;
const createImage = (imageProperties) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = (0, exports.getFullImagePath)(imageProperties);
    const thumbPath = (0, exports.getThumbImagePath)(imageProperties);
    if (yield (0, exports.fileExists)(thumbPath)) {
        return;
    }
    yield (0, sharp_1.default)(fullPath)
        .resize(Number(imageProperties.width), Number(imageProperties.height))
        .toFile(thumbPath)
        .catch((err) => {
        console.error(err);
        throw new Error('Error processing the image.');
    });
});
exports.createImage = createImage;
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageProperties = {
        filename: req.query.filename || null,
        width: req.query.width || null,
        height: req.query.height || null,
    };
    const queryValidation = yield (0, validate_1.validateImageQuery)(imageProperties);
    const fullImagePath = (0, exports.getFullImagePath)(imageProperties);
    const thumbImagePath = (0, exports.getThumbImagePath)(imageProperties);
    if (!queryValidation.filenameExists ||
        !queryValidation.widthExists ||
        !queryValidation.heightExists ||
        !queryValidation.validWidth ||
        !queryValidation.validHeight) {
        const message = (0, error_1.errorMessage)(queryValidation);
        return res.status(400).send(`There were some issues building your thumbnail:${message}`);
    }
    if (!(yield (0, exports.fileExists)(fullImagePath))) {
        return res.status(400).send('The specified image file does not exist in the full directory.');
    }
    try {
        yield (0, exports.createImage)(imageProperties);
    }
    catch (err) {
        console.error(err);
        return res.status(400).send('Error processing the image.');
    }
    res.sendFile(thumbImagePath);
}));
exports.default = images;
