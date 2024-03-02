'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//! AJAX request the old school way (XML HTTP request)
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/portugal');
request.send();//*fetch the data in the background

//* Register a callBack on the request object for the load event
request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
})
