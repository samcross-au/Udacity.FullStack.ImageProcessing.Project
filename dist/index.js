"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./utilities/logger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/", logger_1.default, index_1.default);
app.use((error, request, response, next) => {
    response.send(`<h1 style="text-align: center;color:red;">${error.message}</h1>`);
});
exports.default = app;
