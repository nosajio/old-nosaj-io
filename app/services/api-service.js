import fetch from 'isomorphic-fetch';

export default apiService();

function apiService() {
  return {
    request
  };

  /**
   * Request
   * Send all requests to the API though this handler
   * @param {object} options
   * @return {Promise}
   */
  function request({method='get', path, body}) {
    const url = `/api/${path}`;
    const headers = {};
    const options = { method, headers };
    if (body) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    const request = fetch(url, options);
    return request.then(res => res.json());
  }
}
