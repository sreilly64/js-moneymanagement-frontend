const express = require('express');

const app = express();

app.use(express.static('./dist/js-moneymanagement-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/js-moneymanagement-frontend/'}),
);

app.listen(process.env.PORT || 8080);