import axios from 'axios';

const API_ROOT = 'http://207.154.208.41:8080/3/';
const regexForSplitting = /^\/+|\/+$/g;

function callApi(_method, _path, data) {
  const method = _method.toLowerCase();

  // Remove '/' from path
  const path = _path.replace(regexForSplitting, '');

  const config = {
    method,
    url: API_ROOT + path,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    if (method === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  return axios(config)
    .then(response => response.data)
    .catch((err) => {
      if (err.response && err.response.data) {
        return Promise.reject(err.response.data);
      }

      return Promise.reject(err);
    });
}

// api services
export default {
  getTODOItems: () => callApi('get', ''),
  createTODOItem: item => callApi('post', '', item),
  editTODOItem: (id, item) => callApi('patch', id, item),
  removeTODOItem: id => callApi('delete', id),
};
