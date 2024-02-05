const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;
const service = process.env.SERVICE_NAME || "mysvc";

const API_URL = `http://${service}.default.svc.cluster.local`;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.send(response.data);
    } catch (error) {
        console.error('Error calling the first API:', error.message);
        res.status(500).send('Error calling the first API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
