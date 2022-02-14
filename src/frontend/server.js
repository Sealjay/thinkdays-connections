import * as path from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import fetch from 'node-fetch';

const port = 8080;
const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const app = express();
const daprUrl = `http://localhost:${daprPort}/v1.0/invoke`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The name of the state store is specified in the components yaml file.
// For this sample, state store name is specified in the file at: https://github.com/dapr/quickstarts/blob/master/hello-kubernetes/deploy/redis.yaml#L4
const stateStoreName = `statestore`;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;

/**
 The following routes forward requests (using pipe) from our React client to our dapr-enabled services. Our Dapr sidecar lives on localhost:<daprPort>. We invoke other Dapr enabled services by calling /v1.0/invoke/<DAPR_ID>/method/<SERVICE'S_ROUTE>.
 */

app.post('/calculate/add', async function (req, res) {
    const addUrl = `${daprUrl}/addapp/method/add`;
    let response = await fetch( addUrl, { method: 'POST', json: req.body, headers: {'Content-Type': 'application/json'}});
    res.send(await response.json());
    res.sendStatus(200);
});


app.post('/calculate/divide', async function (req, res) {
    const divideUrl = `${daprUrl}/divideapp/method/divide`;
    let response = await fetch( divideUrl, { method: 'POST', json: req.body, headers: {'Content-Type': 'application/json'}});
    res.send(await response.json());
    res.sendStatus(200);
});

// Forward state retrieval to Dapr state endpoint
app.get('/state', async function (req, res) {
    const stateUrl = `${stateUrl}/calculatorState`;
    let response = await fetch( stateUrl, { method: 'POST', json: req.body, headers: {'Content-Type': 'application/json'}});
    res.send(await response.json());
    res.sendStatus(200);
});

// Forward state persistence to Dapr state endpoint
app.post('/persist', async function (req, res) {
    const stateUrl = `${stateUrl}/calculatorState`;
    let response = await fetch( stateUrl, { method: 'POST', json: req.body, headers: {'Content-Type': 'application/json'}});
    res.send(await response.json());
    res.sendStatus(200);
});

// Serve static files
app.use(express.static('client/build'));

// For all other requests, route to React client
app.get('*', function (_req, res) {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));