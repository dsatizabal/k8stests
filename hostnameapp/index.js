const express = require('express');
const os = require('os');
const fs = require('fs'); // Import fs module

const app = express();
const port = process.env.PORT || 3000;
const targetDirectory = process.env.TARGET_DIR || '/etc';
const fileName = process.env.FILE_NAME || 'initdata.txt';

app.get('/', (req, res) => {
    fs.readFile(`${targetDirectory}/${fileName}`, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send("Error reading initialization message");
            return;
        }

        res.send(`Hostname: ${os.hostname()} - ${data}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
