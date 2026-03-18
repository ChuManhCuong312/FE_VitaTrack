/**
 * VITATRACK - API CLIENT
 * Fetch wrapper tập trung - kết nối với Spring Boot BE
 */
import CONFIG from './config.js';
import Storage from './storage.js';

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  _getHeaders(isMultipart = false) {
    const token = Storage.get(CONFIG.TOKEN_KEY);
    const headers = {};
    if (!isMultipart) headers['Content-Type'] = 'application/json';
    if (token)         headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async _handleResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      const err = new Error(data.message || `HTTP ${response.status}`);
      err.status = response.status;
      err.data   = data;
      throw err;
    }
    return data;
  }

  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
    const response = await fetch(url.toString(), {
      method:  'GET',
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async post(endpoint, body = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method:  'POST',
      headers: this._getHeaders(),
      body:    JSON.stringify(body)
    });
    return this._handleResponse(response);
  }

  async put(endpoint, body = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method:  'PUT',
      headers: this._getHeaders(),
      body:    JSON.stringify(body)
    });
    return this._handleResponse(response);
  }

  async patch(endpoint, body = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method:  'PATCH',
      headers: this._getHeaders(),
      body:    JSON.stringify(body)
    });
    return this._handleResponse(response);
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method:  'DELETE',
      headers: this._getHeaders()
    });
    return this._handleResponse(response);
  }

  async upload(endpoint, formData) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method:  'POST',
      headers: this._getHeaders(true),
      body:    formData
    });
    return this._handleResponse(response);
  }
}

const api = new ApiClient(CONFIG.API_BASE_URL);
export default api;
