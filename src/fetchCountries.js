function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const fieldsKey = '?fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/${name}${fieldsKey}`).then(resp => {
    if (!resp.ok) {
      throw new Error('Oops, there is no country with that name');
    }

    return resp.json();
  });
}

export { fetchCountries };
