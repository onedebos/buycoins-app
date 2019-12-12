function getUrl(start = 0) {
  return "https://api.coinlore.com/api/tickers/?start=" + start + "&limit=10";
}

//grab data
function getData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => loadDataIntoTable(data))
    .catch(err => console.log(err));
}

// load data into table
function loadDataIntoTable(data) {
  let coinName = [];
  let coinSymbol = [];
  let coinPrice = [];
  let coinSupply = [];

  data["data"].forEach(coin => {
    coinName.push(coin.name);
    coinSymbol.push(coin.symbol);
    coinPrice.push(coin.price_usd);
    coinSupply.push(coin.tsupply);
  });

  let tableBody = document.getElementById("crypto-table");
  let html = "";
  for (let i = 0; i < coinName.length; i++) {
    html += "<tr>";
    html += '<th class="hide">💰<span>Coin</span></th>';
    html += '<th class="hide">📄<span>Code</span></th>';
    html += "<td>" + coinName[i] + "</td>";
    html += "<td>" + coinSymbol[i] + "</td>";
    html += '<td class="hide"> </td>';
    html += '<td class="hide"> </td>';
    html += '<th class="hide">🤑<span>Price</span></th>';
    html += '<th class="hide">📉<span>Total Supply</span></th>';
    html += "<td>" + "$" + " " + coinPrice[i] + "</td>";
    html += "<td>" + coinSupply[i] + " " + coinSymbol[i] + "</td>";
    html += "</tr>";
  }

  tableBody.innerHTML = html;
}

function init() {
  const url = getUrl();
  getData(url);
}

init();

//handle pagination
function disablePrevBtn() {
  document.getElementById("prev-btn").classList.add("hide-prev");
}

function enablePrevBtn() {
  document.getElementById("prev-btn").classList.remove("hide-prev");
}

let count = 1;

function handleNextBtnClick() {
  let nextBtn = document.getElementById("next-btn");

  nextBtn.addEventListener("click", nextBtnEvent);
}

function handlePrevBtnClick() {
  let prevBtn = document.getElementById("prev-btn");
  prevBtn.addEventListener("click", prevBtnEvent);
  if (count == 1) {
    disablePrevBtn();
  }
}

function nextBtnEvent(e) {
  e.preventDefault();
  count++;
  const url = getUrl(count * 10 - 10);
  getData(url);

  if (count > 1) {
    enablePrevBtn();
  } else {
    disablePrevBtn();
  }
}

function prevBtnEvent(e) {
  e.preventDefault();
  count--;
  const url = getUrl(count * 10 - 10);
  getData(url);

  if (count == 1) {
    disablePrevBtn();
  }
}

handleNextBtnClick();
handlePrevBtnClick();
