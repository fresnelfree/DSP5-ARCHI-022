
import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// Define routes and connect them to controller methods
router.get('/facebook',  UserController.authFacebook);
router.get('/facebook/callback', UserController.authFacebookCallback);
router.get('/helloworld', UserController.getAllUsers);
router.get('/helloworldb', UserController.getAllUsers);
router.get('/helloworldf', UserController.getAllUsers);

export default module.exports = {router};