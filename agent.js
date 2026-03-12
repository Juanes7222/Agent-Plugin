const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const BUTT_EXE = path.join(
    process.env.LOCALAPPDATA ?? 'C:\\Users\\juanb\\AppData\\Local',
    'butt',
    'butt.exe'
);

const PORT   = 9876;
const SECRET = process.env.AGENT_SECRET ?? 'cambiar-esto';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') { next(); return; }
    if (req.headers['x-agent-secret'] !== SECRET) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    next();
});

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Headers', 'x-agent-secret, content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.options('*', (_req, res) => res.sendStatus(204));

app.get('/status', (_req, res) => {
    res.json({ ok: true });
});

app.post('/stream/start', (_req, res) => {
    execFile(BUTT_EXE, ['--stream-start'], (err) => {
        if (err) {
            console.error('Error starting stream:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ ok: true });
    });
});

app.post('/stream/stop', (_req, res) => {
    execFile(BUTT_EXE, ['--stream-stop'], (err) => {
        if (err) {
            console.error('Error stopping stream:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ ok: true });
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Agent running on http://127.0.0.1:${PORT}`);
    console.log(`butt path: ${BUTT_EXE}`);
});
