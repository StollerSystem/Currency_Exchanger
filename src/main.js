import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency_exchanger.js'



$(document).ready(function() {
  $('#getRates').click(function() {

    let city = $('#location').val();    

    CurrencyExchange.getRates(curreny)
      .then(function(response) {
        getElements(response);
      });
  });
});

function getElements (response) {
  if (response) {

  } else {
    $("").text(`There was an error: ${response.message}`)
  }

}