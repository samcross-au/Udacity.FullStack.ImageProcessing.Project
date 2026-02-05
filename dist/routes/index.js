"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const help_1 = __importDefault(require("./api/help"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Welcome to the Thumnail Image API Service!');
});
routes.use('/images', images_1.default);
routes.use('/help', help_1.default);
exports.default = routes;
