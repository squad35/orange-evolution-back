const express = require('express');
const routes = require('./routes/routes.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    return res.status(200).send({message: 'A Api da squad 35 está rodando!'});
});

routes(app);

app.listen(port, () => {
    console.log(`servidor está rodando na porta ${port}`);
});

module.exports = app;