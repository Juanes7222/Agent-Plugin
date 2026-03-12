const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
    name:        'Radio Agent',
    description: 'Agente local para control de transmision de La Voz de la Verdad',
    script:      path.join(__dirname, 'agent.js'),
    env: {
        name:  'AGENT_SECRET',
        value: 'lavozverdad-agent-secret', // mismo valor que en config.js del panel
    },
});

svc.on('install', () => {
    console.log('Servicio instalado correctamente.');
    svc.start();
    console.log('Servicio iniciado.');
});

svc.on('alreadyinstalled', () => {
    console.log('El servicio ya estaba instalado.');
});

svc.on('error', (err) => {
    console.error('Error:', err);
});

svc.install();
