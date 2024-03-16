'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

const renderCountry = (data, className = '') => {
  // console.log(data);
  // const { languages, currencies } = data;
  const curr = Object.keys(data.currencies)
  // console.log(curr);

  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
    <p class="country__row"><span>💰</span>${curr}</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
//! AJAX request the old school way (XML HTTP request)
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send(); //*fetch the data in the background

//   //* Register a callBack on the request object for the load event
//   request.addEventListener('load', () => {
//     const [data] = JSON.parse(request.responseText);
//     const { languages, currencies} = data;
//     const currenciesArr = Object.keys(currencies).map(key => [
//       key,
//       currencies[key],
//     ]);
//     const languagesArr = Object.keys(languages).map(key => [
//       key,
//       languages[key],
//     ]);
//     // console.table(data);
//     console.log(data);

//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${languagesArr[0][1]}</p>
//       <p class="country__row"><span>💰</span>${currenciesArr[0][0]}</p>
//     </div>
//   </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };



// const getCountryAndNeighbour = function (country) {
//   //* AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send(); //*fetch the data in the background

//   //* Register a callBack on the request object for the load event
//   request.addEventListener('load', () => {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);
//     //* render country 1
//     renderCountry(data);

//     //* Get neighbour country
//     const neighbour = data.borders?.[0];
//     console.log(neighbour);

//       //* AJAX call country 2
//   const request2 = new XMLHttpRequest();
//   request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//   request2.send(); //*fetch the data in the background

//   request2.addEventListener('load', ()=> {
//     const [data2] = JSON.parse(request2.responseText);
//     console.log(data2);

//     renderCountry(data2, 'neighbour')
//   })
//   });
// };

// getCountryData('iraq');
// getCountryData('south korea');
// getCountryData('japan');
// getCountryAndNeighbour('russia');
// getCountryData('portugal');
// getCountryData('usa');

//! AJAX request the modern way (Fetch API)
//* promise: An object that is used as placeholder for the future result of an asynchronous operation
//! A container for a futuere value(like a response from AJAX call)



const getCountryData = function (country) {
  // country 1
  //* using json method to read the data,it will also return a promise so we should return that promise

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json()
    )
    .then(
      data => {
        renderCountry(data[0]) //* here we can really get access to the data
        const neighbour = data[0].borders[0];
        //Country 2
        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)

      }
    ).then(response => response.json()).then(data => {
      const [data2] = data
      console.log(data2);
      renderCountry(data2, 'neighbour')
    }).catch(err => alert(err))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};
btn.addEventListener('click', function () {
  getCountryData('bg');
  console.error(`${err}`);
  renderError(`something went wrong ${err.message}`)
})


