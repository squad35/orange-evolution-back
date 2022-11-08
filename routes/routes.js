module.exports = app => {
    const userRoute = require('./userRoute.js');
    const contentRoute = require('./contentRoute.js');

    app.use('/users', userRoute);
    app.use('/contents', contentRoute);
}