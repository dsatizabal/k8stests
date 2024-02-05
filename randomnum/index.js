const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const hostname = os.hostname();
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const random = Math.floor(Math.random() * 100) + 1;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.send(`Hello from ${hostname}, date is ${date}, your random number is ${random} (requester address: ${ip})`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
