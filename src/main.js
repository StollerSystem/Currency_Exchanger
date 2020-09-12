import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency_exchanger.js';
import CountryInfo from './js/country_info.js';

class Storage {
  constructor() {
    this.results = [];    
  }
}

let countryArray = new CountryInfo();
let storeResponse = new Storage();

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
    storeResponse.results = Object.entries(response.conversion_rates);    
    storeResponse.results.forEach(function(rate){
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
    for (const element of countryArray.countries) {
      if (element.includes(id)) {       
        countryInfo = element.split("-");
        break;
      }
    }    
    storeResponse.results.forEach(function(code){      
      if (id === code[0]) {          
        $("#details").html(`
        <p><img src="https://www.countryflags.io/${getFlagCode()}/shiny/64.png">  
        <span class="detMid">${storeResponse.results[0][1]}</span> 
        <span class="detLeft">${storeResponse.results[0][0]}</span> = 
        <span class="detMid">${code[1]} </span>
        <span class="detCount">${countryInfo[1]}</span> (${countryInfo[2]})  
        <img src="https://www.countryflags.io/${countryInfo[3]}/shiny/64.png"></p`);
      }
    });
    $("#details p").show();
  });
}

function getFlagCode() {  
  for (const element of countryArray.countries) {
    if (element.includes(storeResponse.results[0][0])) {             
      return element.split("-")[3];
    }
  }
}