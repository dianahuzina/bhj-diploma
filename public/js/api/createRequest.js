/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let url = options.url;
  const formData = new FormData();

  if (options.method === 'GET') {
    const queryParams = new URLSearchParams(options.data);
    url = `${url}?${queryParams.toString()}`;
    xhr.open(options.method, url);
    xhr.send();
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    xhr.open(options.method, url);
    xhr.send(formData);
  }

  xhr.addEventListener('load', () => {
    const response = xhr.response;
    const err = response.error;
    options.callback(err, response);
  });
};