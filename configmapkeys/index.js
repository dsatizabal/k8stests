const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const targetDirectory = process.env.TARGET_DIR || '/etc/';

app.get('/', (req, res) => {
    res.send('Go to route /getkey/{desiredkey} to fetch a value');
});

app.get('/getkey/:param', (req, res) => {
    const keyName = req.params.param;
    const targetPath = path.join(targetDirectory, keyName);

    fs.stat(targetPath, (err, stats) => {
        if (err) {
            return res.status(404).send('Key not found');
        }

        if (stats.isFile()) {
            fs.readFile(targetPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading file');
                }
                res.send(data);
            });
        } else if (stats.isDirectory()) {
            fs.readdir(targetPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    return res.status(500).send('Error reading directory');
                }

                const tree = generateTree(targetPath, files);
                res.send(`<pre>${tree}</pre>`);
            });
        } else {
            res.status(404).send('Key not found');
        }
    });
});

function generateTree(basePath, files) {
    let tree = '';

    files.forEach(file => {
        const fullPath = path.join(basePath, file.name);
        if (file.isDirectory()) {
            tree += `${fullPath}/\n`;
            const subFiles = fs.readdirSync(fullPath, { withFileTypes: true });
            tree += generateTree(fullPath, subFiles).split('\n').map(line => '  ' + line).join('\n') + '\n';
        } else {
            tree += `${fullPath}\n`;
        }
    });

    return tree;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
