const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const targetDirectory = process.env.TARGET_DIR || '/cm/keys';

app.get('/', (req, res) => {
    res.send('Go to route /getkey/{desiredkey} to fetch a value');
});

app.get('/getkey/:param', (req, res) => {
    const keyName = req.params.param;
    const filePath = targetDirectory + keyName;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Key not found');
        } else {
            res.send(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
