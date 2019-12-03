function getUrl(start = 0){
    return 'https://api.coinlore.com/api/tickers/?start=' + start + '&limit=10';
}

function getData(url){

    fetch(url)
        .then(response => response.json())
        .then(data => loadDataIntoTable(data))
        .catch(err => console.log(err));

}

function loadDataIntoTable(data) {
    let coinName = [];
    let coinSymbol = [];
    let coinPrice = [];
    let coinSupply = [];


    data['data'].forEach((coin) => {
        coinName.push(coin.name);
        coinSymbol.push(coin.symbol);
        coinPrice.push(coin.price_usd);
        coinSupply.push(coin.tsupply);
    })

    let tableBody = document.getElementById('crypto-table');
    let html = '';
    for (let i = 0; i<coinName.length; i++){
        html += "<tr>";
        html += "<td>" + coinName[i] + "</td>";
        html += "<td>" + coinSymbol[i] + "</td>";
        html += "<td>" + "$"+" "+coinPrice[i] + "</td>";
        html += "<td>" + coinSupply[i] + " " + coinSymbol[i] + "</td>";
        html += "</tr>";
    }

    tableBody.innerHTML = html;
}

function init(){
    const url = getUrl();
    getData(url);
}

init();

//handle next button
let nextBtn = document.querySelector('a');
let prevBtn = document.querySelector('.prev');
let nextPage;
let url = '';

element.addEventListener("click", function(){

});