module.exports = app => {
    const userRoute = require('./userRoute.js');
    // const User = require('../controllers/userController.js');
    // const express = require('express');

    // const router = express.Router();

    // //criando um novo usuário.
    // router.post('/', User.create);
    // router.get('/', User.getAll);
    // router.get('/findUser', User.getByEmail);
    // router.put('/', User.update);

    // app.use('/users', router);

    app.use('/users', userRoute);
}