export default class CurrencyExchange {
  static getRates(currency) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`)    
      .then(function(response){
        //console.log(response.statusText)
        if (!response.ok) {
          // console.log(response.statusText)
          throw Error (response.statusText);
         
        }
        return response.json();
      })
      .catch(function(error){
        return error;
      });
  }
}