import dotenv from 'dotenv';
import https from 'https';
import axios from 'axios';

dotenv.config();

const API_URL = process.env.API_URL || '';
const API_TOKEN = process.env.API_TOKEN || '';

export default axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
