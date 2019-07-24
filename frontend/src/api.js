import axios from 'axios';

const API_URL = 'http://localhost:4000';

let index = 3;
let devices = {
    device1: {
        id: 'device1',
        name: 'Device #1',
        address: '192.168.1.50',
        port: 90,
        state: 'on'
    },
    device2: {
        id: 'device2',
        name: 'Device #2',
        address: '192.168.1.60',
        port: 80,
        state: 'off'
    }
};

export async function getDevices() {
    const response = await axios.get(`${API_URL}/devices`);
    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${API_URL}/devices/${deviceId}`);    
    return response.data;
}

export async function addDevice(device) {
    await axios.post(`${API_URL}/devices`, device);
}

export async function removeDevice(deviceId) {
    await axios.delete(`${API_URL}/devices/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    await axios.patch(`${API_URL}/devices/${deviceId}`, data);
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on'
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off'
    });
}

export async function getDeviceLog(deviceId) {
    const response = await axios.get(`${API_URL}/devices/log/${deviceId}`);
    return response.data;
}