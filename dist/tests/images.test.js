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
const path_1 = __importDefault(require("path"));
const images_1 = require("../routes/api/images");
const THUMB_PATH = path_1.default.resolve(__dirname, '../../assets/thumb');
const FULL_PATH = path_1.default.resolve(__dirname, '../../assets/full');
describe('get Full image path', () => {
    const imageProperties = {
        filename: 'test',
        width: null,
        height: null,
    };
    it('should return the correct Full image path', () => {
        const filename = 'test';
        const expectedPath = path_1.default.join(FULL_PATH, `${filename}.jpg`);
        const result = (0, images_1.getFullImagePath)(imageProperties);
        expect(result).toBe(expectedPath);
    });
    it('should return an incorrect Full image path', () => {
        const imageProperties = {
            filename: 'error',
            width: null,
            height: null,
        };
        const incorrectPath = path_1.default.join(THUMB_PATH, `${imageProperties.filename}.jpg`);
        const result = (0, images_1.getFullImagePath)(imageProperties);
        expect(result).not.toBe(incorrectPath);
    });
});
describe('get Thumb image path', () => {
    const imageProperties = {
        filename: 'test',
        width: '400',
        height: '400',
    };
    it('should not return the correct Thumb image path', () => {
        const expectedPath = path_1.default.join(THUMB_PATH, `${imageProperties.filename}_${imageProperties.width}x${imageProperties.height}_thumb.jpg`);
        const result = (0, images_1.getThumbImagePath)(imageProperties);
        expect(result).toBe(expectedPath);
    });
    it('should not return an incorrect Thumb image path', () => {
        const incorrectPath = path_1.default.join(FULL_PATH, `${imageProperties.filename}.jpg`);
        const result = (0, images_1.getThumbImagePath)(imageProperties);
        expect(result).not.toBe(incorrectPath);
    });
});
describe('check if Full image exists', () => {
    const imageProperties = {
        filename: 'test',
        width: '400',
        height: '400',
    };
    it('send valid image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageProperties = {
            filename: 'test',
            width: '400',
            height: '400',
        };
        const imagePath = (0, images_1.getFullImagePath)(imageProperties);
        const result = yield (0, images_1.fileExists)(imagePath);
        expect(result).toBeTrue();
    }));
    it('send invalid image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageProperties = {
            filename: 'error',
            width: '400',
            height: '400',
        };
        const imagePath = (0, images_1.getFullImagePath)(imageProperties);
        const result = yield (0, images_1.fileExists)(imagePath);
        expect(result).toBeFalse();
    }));
});
describe('check if Thumb image exists', () => {
    it('send valid image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageProperties = {
            filename: 'test',
            width: '400',
            height: '400',
        };
        const imagePath = (0, images_1.getThumbImagePath)(imageProperties);
        const result = yield (0, images_1.fileExists)(imagePath);
        expect(result).toBeTrue();
    }));
    it('send invalid image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageProperties = {
            filename: 'error',
            width: '400',
            height: '400',
        };
        const imagePath = (0, images_1.getThumbImagePath)(imageProperties);
        const result = yield (0, images_1.fileExists)(imagePath);
        expect(result).toBeFalse();
    }));
});
