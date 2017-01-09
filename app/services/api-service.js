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
  function request({type='get', path}) {
    const url = `/api/${path}`;
    const request = fetch(url);
    return request.then(res => res.json());
  }
}
