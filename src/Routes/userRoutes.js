const express = require("express")
const route = express.Router()
const { login, register, forgot, reset, logout, authenticate, verifyOTP, profile } = require('../Controller/userAuthenticationController')
const auth = require("../middleware/CustomerAuth")
const { check } = require('express-validator');
const {  getMeeting, createMeeting, deleteMeeting } = require("../Controller/userController");
// import util
//
const registerValidation = [
    check('full_Name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email', 'Email is required')
        .isEmail(),
    check('password', 'Password is requried')
        .isLength({ min: 8 }),
]; 

route.post('/register', registerValidation, register)
route.post('/login', login)
route.get('/authenticate', auth, authenticate)
route.post('/forgot', forgot)
route.put('/reset', reset)
route.get('/logout', auth, logout)
route.post('/verifyOTP', verifyOTP)

// see products
route.post('/meeting', createMeeting);
route.get('/meeting', getMeeting);
route.delete('/meeting/:id', deleteMeeting);





module.exports = route