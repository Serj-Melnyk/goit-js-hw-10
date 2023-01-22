import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const card = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  resetResult();
  const formData = evt.target.value.trim();

  fetchCountries(formData)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2) {
        list.innerHTML = markupList(data);
      } else {
        card.innerHTML = markupCard(data);
      }
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function resetResult() {
  list.innerHTML = '';
  card.innerHTML = '';
}

function markupList(data) {
  return data
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li>
        <img src="${svg}" alt="${official}"
        <h3>${official}</h3>
        </li>`
    )
    .join('');
}

function markupCard(data) {
  return data
    .map(
      item => `<div class = "wrapper"><img src='${
        item.flags.svg
      }' alt='flag of ${name.official}' />
  <h2 class='country-name card'>${item.name.official}</h2></div>
  <p><span>Capital:</span> ${item.capital}</p>
  <p><span>Population:</span> ${item.population}</p>
  <p><span>Languages:</span>
   ${Object.values(item.languages).join(' ')}
  </p>`
    )
    .join('');
}
