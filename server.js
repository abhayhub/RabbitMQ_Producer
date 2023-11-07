const express = require('express')
const bodyParser = require('body-parser');
const Producer = require('./producer');
const producer = new Producer();
const app = express()
const port = 3000

app.use(bodyParser.json());

app.post('/sendlog', async (req, res, next) => {
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send("msg delivered");
});

app.listen(port, () => console.log(`Server on port ${port}!`))