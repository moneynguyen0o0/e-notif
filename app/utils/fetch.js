import _ from 'lodash';
import axios from 'axios';

const getConfig = (config = {}) => {
  config.method = config.method || 'get';
  config.responseType = config.responseType || 'json';
  config.headers = _.defaults(config.headers, {});

  config.url = (config.baseURL || '/api') + (config.url || '');

  // Add CORS credentials on browser side
  config.withCredentials = config.withCredential ? config.withCredentials : true;

  return config;
};

const fetch = async (config = {}) => {
  try {
    const { data } = await axios(getConfig(config));

    return data;
  } catch (error) {
    // Convert to client friendly error
    if (error.response) {
      throw _.pick(error.response, ['data', 'status', 'statusText']);
    } else {
      throw {
        status: 0,
        data: {
          message: error.message
        }
      };
    }
  }
};

export default { fetch };
