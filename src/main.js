import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency_exchanger.js';
import array from './js/country_info.js';

class Storage {
  constructor() {
    this.results = [];
  }
}

let StoreResponse = new Storage();

$(document).ready(function() {
  attachListeners();
  $('#getRates').click(function() {
    $("#output").html("");
    $("#clickP").show();
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
    $("#date").html(`(Last updated ${response.time_last_update_utc.slice(0,25)})`);
    StoreResponse.results = Object.entries(response.conversion_rates);
    // console.log(results);
    StoreResponse.results.forEach(function(rate){
      $("#output").append(`<li class="rateItem" id="${rate[0]}"><span class="code">${rate[0]}</span>: <span class="rate">${rate[1]}</span></li>`);
    });
    
  } else if (response.result === "error") {
    $("#output").text(`There was an error: ${response["error-type"]}`);
  } else {
    $("#output").text(`There was an error: ${response.message}`);
  }
}

function attachListeners() {
  $("ul#output").on("click",".rateItem", function(){    
    console.log(`CLICKED ON ${this.id}`);
    //console.log(StoreResponse.results)
    let id = this.id;
    let countryInfo = "";
    for (const element of array) {
      if (element.includes(id)) {
        console.log(element);
        countryInfo = element;
        break;
      }
    }
    StoreResponse.results.forEach(function(code){
      console.log(countryInfo);
      if (id === code[0]) {
        console.log(code[1]);
        $("#details").html(`<p><span class="detLeft">${StoreResponse.results[0][1]} ${StoreResponse.results[0][0]}</span> equals <span class="detRight">${code[1]} ${countryInfo}</span></p`);
      }
    });
    $("#details p").show();
  });
}