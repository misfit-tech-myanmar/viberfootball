const axios = require('axios');
const tokenFilePath = 'configs/token.json';
const fs = require('fs');

// Function to perform login
const login= async(username, password) => {
    try{
        const response = await axios.post('https://api.myalice.ai/stable/accounts/login', {
            username,
            password
        })
        const { access, refresh } = response.data;
        const tokens = {
            accessToken: access,
            refreshToken: refresh
        }
        fs.writeFileSync(tokenFilePath, JSON.stringify(tokens));
    }catch(err){
        console.error('Login failed', err)
        throw err;
    }
}

// Function to refresh access token
const refreshAccessToken = async(refreshToken) => {
    return new Promise(async(resolve, reject)=> {
        try{
            const response = await axios.post('https://api.myalice.ai/stable/accounts/refresh', {
                refresh: refreshToken
            })
            const { access } = response.data;
            // Store the new access token securely
            resolve(access)
        }catch(err){
            console.error('Token refresh failed', err.response.data);
            throw err;
        }
    })
}

const mainLogin = async () => {
    try{
        const data = await login('kyawhlaingbwar18@gmail.com', 'alice@101');
        re
    }catch(err){
        console.error('Something error', err.response.data);
        throw err;
    }
}

module.exports = {
    mainLogin,
    login,
    refreshAccessToken
}