
const http = require('http');
const fs = require('fs');



let sensorDataFromFile = JSON.parse(fs.readFileSync('sensor_data_500.json', 'utf-8'));
let telemetryData = []; 


function validateTelemetry(entry) {
    if (!entry) return false;
    const { depth, pressure, temperature, direction, timestamp } = entry;
    if (typeof depth !== 'number' || depth < 0 || depth > 100) return false;
    if (typeof pressure !== 'number' || pressure < 0 || pressure > 10) return false;
    if (typeof temperature !== 'number' || temperature < -50 || temperature > 50) return false;
    if (typeof direction !== 'number' || direction < 0 || direction >= 360) return false;
    if (typeof timestamp !== 'string'|| isNaN(Date.parse(timestamp))) return false;
    return true;
}


let simulationIndex = 0;
setInterval(() => {
    const entry = sensorDataFromFile[simulationIndex];
    if (validateTelemetry(entry)) {
        telemetryData.push(entry);
        if (telemetryData.length > 100) telemetryData.shift();
    }
    simulationIndex = (simulationIndex + 1) % sensorDataFromFile.length;
}, 5000);


function collectRequestData(req, callback) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            callback(null, data);
        } catch (err) {
            callback(err);
        }
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    
    if (req.method === 'POST' && parsedUrl.pathname === '/api/telemetry') {
        collectRequestData(req, (err, data) => {
            if (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
                return;
            }
            if (!validateTelemetry(data)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid telemetry data' }));
                return;
            }
            telemetryData.push(data);
            if (telemetryData.length > 100) telemetryData.shift();
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
        });
    }

   
    else if (req.method === 'GET' && parsedUrl.pathname === '/api/telemetry/latest') {
        if (telemetryData.length === 0) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'No telemetry data' }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(telemetryData[telemetryData.length - 1]));
    }

   
    else if (req.method === 'GET' && parsedUrl.pathname === '/api/telemetry/history') {
        const limit = parseInt(parsedUrl.query.limit) || 10;
        const data = telemetryData.slice(-limit);
        res.statusCode = 200;
        res.end(JSON.stringify(data));
    }

   
    else if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.statusCode = 204;
        res.end();
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});


const PORT = 3000;
server.listen(PORT, () => console.log(`ROV Telemetry Server running on http://localhost:${PORT}`));
