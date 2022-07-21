global.nodemailer = require('nodemailer');
global.bcrypt = require('bcrypt');
global.session = require('express-session');
const {v1} = require('uuid');
global.uuid = v1;
global.jwt =  require('jsonwebtoken');

global.transporter = nodemailer.createTransport({
    service: 'gmail.com',
    host: 'smtp.gmail.com',
    auth: {
        user: 'developer01000@gmail.com',
        pass: '01000webdeveloper'
    }
});
