import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency_exchanger.js';
import countryArray from './js/country_info.js';

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
    $("#details p").hide();
    let currency = $("#currency").val();
    CurrencyExchange.getRates(currency)
      .then(function(response) {
        getElements(response);
      });
  });
});


function getElements (response) {
  if (response.result === "success") {    
    $("#date").html(`(Rates last updated ${response.time_last_update_utc.slice(0,25)})`);
    StoreResponse.results = Object.entries(response.conversion_rates);    
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
    let id = this.id;
    let countryInfo = "";
    for (const element of countryArray) {
      if (element.includes(id)) {       
        countryInfo = element.split("-");
        break;
      }
    }    
    StoreResponse.results.forEach(function(code){      
      if (id === code[0]) {    
        let flagCode = ""
        for (const element of countryArray) {
          if (element.includes(StoreResponse.results[0][0])) {       
            let info = element.split("-");
            flagCode = info[3]
            break;
          }
        }        
        $("#details").html(`<p><img src="https://www.countryflags.io/${flagCode}/shiny/64.png">  <span class="detMid">${StoreResponse.results[0][1]}</span> <span class="detLeft">${StoreResponse.results[0][0]}</span> = <span class="detMid">${code[1]} </span><span class="detCount">${countryInfo[1]}</span> (${countryInfo[2]})  <img src="https://www.countryflags.io/${countryInfo[3]}/shiny/64.png"></p`);
      }
    });
    $("#details p").show();
  });
}