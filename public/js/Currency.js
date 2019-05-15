class Currency  {

  static requestCurrency() {
    if (localStorage.getItem("listcurrency")) {
      let now = Math.floor(new Date().valueOf() / 1000);
      let time = now - JSON.parse(localStorage.getItem("listcurrency"))["time"];
      if (time > 180000) {
        Currency.converter();
      }
    } else {
      Currency.converter();
    }
  }
  
  static converter() {

    return fetch(
        "http://apilayer.net/api/live?access_key=b00ce8736dabf9c6f428626696304835&currencies=EUR,GBP&source=USD&format=1"
      )
      .then(r => r.json())
      .then(function(response) {
        let pares = { EUR: null, GBP: null, USD: null, time: null };
        pares["EUR"] = response.quotes["USDEUR"];
        pares["GBP"] = response.quotes["USDGBP"];
        pares["USD"] = 1;
        pares["time"] = Math.floor(new Date().valueOf() / 1000);
        localStorage.setItem("listcurrency", JSON.stringify(pares));
      })
      .catch((e) => new Error(e));
  }

  static addCurrency(name) {
      
    let n = "";
    switch (name) {
      case "pound":
        n = "GBP";
        break;
      case "dollar":
        n = "USD";
        break;
      case "euro":
        n = "EUR";
        break;
    }
    let rate = JSON.parse(localStorage.getItem("listcurrency"))[n];
    localStorage.setItem(
      "currency",
      JSON.stringify({ name: n, rate: rate ? rate : 1 })
    );
  }

  static checkCurrency() {
    Currency.requestCurrency();
    return !localStorage.getItem("currency")
      ? localStorage.setItem(
          "currency",
          JSON.stringify({ name: "USD", rate: 1 })
        )
      : null;
  }

  static getSymbol() {
    let name = JSON.parse(localStorage.getItem("currency"))["name"];
    let symbol = "";
    switch (name) {
      case "EUR":
        symbol = "euro";
        break;
      case "USD":
        symbol = "dollar";
        break;
      case "GBP":
        symbol = "pound";
        break;
      default:
        symbol = "euro";
    }
    return symbol;
  }

  static flag() {
    let name = JSON.parse(localStorage.getItem("currency"))["name"];
    let flag = "";
    switch (name) {
      case "EUR":
        flag = "eu.svg";
        break;
      case "USD":
        flag = "us.svg";
        break;
      case "GBP":
        flag = "gb.svg";
        break;
      default:
        flag = "eu.svg";
    }
    return {'flag':flag, 'abbr':name};
  }

  static currencyPrice() {
    let divPrice = document.querySelectorAll('.item__price');
    if(divPrice){
      [...divPrice].forEach(v => {
         v.textContent = String((v.textContent * JSON.parse(localStorage.getItem("currency"))["rate"]).toFixed(2)) +
      " " + Currency.decodeHTML(Currency.getSymbol()) })
    }
    let price = document.querySelector('.item_block__params h2');
    if(price)
    {
      price.textContent = String((price.textContent * JSON.parse(localStorage.getItem("currency"))["rate"]).toFixed(2)) +
      " " + Currency.decodeHTML(Currency.getSymbol());
    }
  }

 static showMenuCurrency() {
    let list_symbols = ["euro", "pound", "dollar"];

    let html = ``;
    list_symbols.forEach((v) => { 
    html += `<label  class='${v}' for='${v}'>
    <button onclick='Currency.addCurrency("${v}")' type="submit" id='${v}' name='${v}' style='visibility: hidden'>
    </button></label>`});
    return html;
  }

static decodeHTML(c)
{
  let entities = {pound:"\u00A3", euro:"\u20AC", dollar:"$"};
  return entities[c];
}

static appendAfter()
{
  let content = `
  .nav_up ul label:before {
    background:url(../img/arrow.png)  no-repeat, url(../img/${Currency.flag()['flag']}) no-repeat;
    background-position: left, right;
    background-size: auto, contain;
}
.mobile_nav ul label:before {
    background:url(../img/arrow.png)  no-repeat, url(../img/${Currency.flag()['flag']}) no-repeat;
    background-position: left, right;
    background-size: auto, contain;
  `;
  let contentTwo = `
  .nav_up ul label:before {
    background:url(../img/arrow.png)  no-repeat, url(../img/${Currency.flag()['flag']}) no-repeat;                    
    background-position: left, right;
    background-size: auto, contain;
}
@media all and (max-width:401px) { .nav_up ul label:before  {background:url(../img/arrow.png) no-repeat; background-position: center; width:15px}
}
  `;
  let element = document.getElementById('put');
  let elementTwo = document.getElementById('putTwo')
  
  let newElement = document.createElement('style');
  newElement.appendChild(document.createTextNode(content));
  let elementParent = element.parentNode;
  elementParent.insertBefore(newElement, element.nextSibling);

  let newElement2 = document.createElement('style');
  newElement2.appendChild(document.createTextNode(contentTwo));
  let elementParent2 = elementTwo.parentNode;
  elementParent2.insertBefore(newElement2, elementTwo.nextSibling);
}

}
Currency.checkCurrency();
Currency.appendAfter();

document.getElementById('form_currency').innerHTML=Currency.showMenuCurrency();
document.getElementById('form_currency_mobile').innerHTML=Currency.showMenuCurrency();
document.querySelector('#abbr > span').textContent = Currency.flag()['abbr'];
document.querySelector('#mob_abbr > span').textContent = Currency.flag()['abbr'];
Currency.currencyPrice();
