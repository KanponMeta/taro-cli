const urlMap: Record<string, {test: string; prod: string}> = {
  login: {
    test: 'http://127.0.0.1:8000/token',
    prod: ''
  },

};

export function getBaseUrl(type: string) {
  const urls = urlMap[type];
  if (process.env.NODE_ENV === 'production') {
    return urls.prod;
  }
  return urls.test;
}

export const combineUrl = (url: string) => {
  const BASE_URL = getBaseUrl('base');
  return BASE_URL + url;
};

