const axios = require('axios');

async function testErrors() {
    const baseUrl = 'http://localhost:5000';

    console.log('--- Testing 400 Validation Error ---');
    try {
        await axios.post(`${baseUrl}/api/auth/register`, {
            email: 'invalid-email',
            password: '123'
        });
    } catch (error) {
        console.log('Status Code:', error.response?.status);
        console.log('Response:', JSON.stringify(error.response?.data, null, 2));
    }

    console.log('\n--- Testing 401 Unauthorized (invalid refresh) ---');
    try {
        await axios.post(`${baseUrl}/api/auth/refresh`);
    } catch (error) {
        console.log('Status Code:', error.response?.status);
        console.log('Response:', JSON.stringify(error.response?.data, null, 2));
    }

    console.log('\n--- Testing 404 (Not Found route) ---');
    try {
        await axios.get(`${baseUrl}/api/invalid-route`);
    } catch (error) {
        console.log('Status Code:', error.response?.status);
        console.log('Response:', JSON.stringify(error.response?.data, null, 2));
    }
}

testErrors();
