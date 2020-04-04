require('dotenv').config();

const https = require('https');
const axios = require('axios');

const API_URL = process.env.API_URL || '';
const API_TOKEN = process.env.API_TOKEN || '';

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

module.exports = instance;
