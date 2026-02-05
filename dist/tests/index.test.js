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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("Test endpoint responses", () => {
    it("Retrieves the base API endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
    it("Fails on the images API endpoint MISSING all parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images");
        expect(response.status).toBe(400);
    }));
    it("Fails on the images API endpoint MISSING dimension parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images?filename=test");
        expect(response.status).toBe(400);
    }));
    it("Fails on the images API endpoint MISSING name parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images?width=400&height=400");
        expect(response.status).toBe(400);
    }));
    it("Retrieves the images API endpoint negative dimension parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images?filename=test&width=-400&height=-400");
        expect(response.status).toBe(400);
    }));
    it("Retrieves the images API endpoint WITH required query parameters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images?filename=test&width=400&height=400");
        expect(response.status).toBe(200);
    }));
    describe('send fake Endpoint', () => {
        it('GET /anyEndpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/fake');
            expect(response.status).toBe(404);
        }));
    });
});
