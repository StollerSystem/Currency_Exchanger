import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency_exchanger.js';



$(document).ready(function() {
  $('#getRates').click(function() {
    $("#output").html("")
    let currency = $("#currency").val();
    CurrencyExchange.getRates(currency)
      .then(function(response) {
        getElements(response);
      });
  });
});

function getElements (response) {
  if (response.result === "success") {
    // console.log(response);
    // let date = 
    $("#date").html(`Last updated ${response.time_last_update_utc.slice(0,17)}<br>`)
    let results = Object.entries(response.conversion_rates);
    // console.log(results);
    results.forEach(function(rate){
      $("#output").append(`<li><span class="code">${rate[0]}</span>: <span class="rate">${rate[1]}</span></li>`);
    });
    
  } else if (response.result === "error") {
    $("#output").text(`There was an error: ${response["error-type"]}`);
  } else {
    $("#output").text(`There was an error: ${response.message}`);
  }
}

