module.exports = app => {
    const userRoute = require('./userRoute.js');
    const contentRoute = require('./contentRoute.js');
    const contentTypeRoute = require('./contentTypeRoute.js');
    const AuthorRoute = require('./authorRoute.js');
    const TrailRoute = require('./trailRoute.js');
    const SessionRoute = require('./sessionRoute.js');

    app.use('/users', userRoute);
    app.use('/contents', contentRoute);
    app.use('/content-types', contentTypeRoute);
    app.use('/authors', AuthorRoute);
    app.use('/trails', TrailRoute);
    app.use('/sessions', SessionRoute);
}