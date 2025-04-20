const fs = require('fs');
const path = require('path');

// Function to read temperature from DS18B20 sensor
function readTempSensor() {
    const sensorPath = '/sys/bus/w1/devices/28-*/w1_slave';
    const sensorFile = fs.readFileSync(path.join(sensorPath), 'utf8');
    const tempMatch = /t=([0-9]+)/.exec(sensorFile);
    if (tempMatch) {
        const temp = parseInt(tempMatch[1]) / 1000;
        return temp;
    } else {
        return null;
    }
}

// Main loop to continuously read and print temperature
setInterval(() => {
    const temperature = readTempSensor();
    if (temperature !== null) {
        console.log(`Temperature: ${temperature}°C`);
    } else {
        console.log('Error reading temperature.');
    }
}, 1000);
