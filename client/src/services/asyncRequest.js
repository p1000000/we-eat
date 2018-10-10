import axios from 'axios';

export default async ({ method = 'get', url, data }) => {
  try {
    const result = await axios({
      method,
      url,
      data
    });
    return result.data;
  } catch (e) {
    throw e;
  }
};
