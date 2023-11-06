"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
// Define routes and connect them to controller methods
router.get('/facebook', UserController_1.default.authFacebook);
router.get('/facebook/callback', UserController_1.default.authFacebookCallback);
router.get('/helloworld', UserController_1.default.getAllUsers);
router.get('/helloworldb', UserController_1.default.getAllUsers);
router.get('/helloworldf', UserController_1.default.getAllUsers);
exports.default = module.exports = { router };
