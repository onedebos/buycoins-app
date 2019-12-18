function getUrl(start = 0){
  return "https://api.coinlore.com/api/tickers/?start=" + start + "&limit=10";
}

//grab data
const getData = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => loadDataIntoTable(data))
    .catch(err => console.log(err));
};

// load data into table
const loadDataIntoTable = data => {
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
};

const init = () => {
  const url = getUrl();
  getData(url);
};

init();

//handle pagination
const Pagination = () => {
  let count = 1;
  const disablePrevBtn = () =>
    document.getElementById("prev-btn").classList.add("hide-prev");
  const enablePrevBtn = () =>
    document.getElementById("prev-btn").classList.remove("hide-prev");
  const handleNextBtnClick = () => {
    let nextBtn = document.getElementById("next-btn");
    nextBtn.addEventListener("click", nextBtnEvent);
  };
  const handlePrevBtnClick = () => {
    let prevBtn = document.getElementById("prev-btn");
    prevBtn.addEventListener("click", prevBtnEvent);
    if (count == 1) {
      disablePrevBtn();
    }
  };

  const nextBtnEvent = e => {
    e.preventDefault();
    count++;
    const url = getUrl(count * 10 - 10);
    getData(url);

    if (count > 1) {
      enablePrevBtn();
    } else {
      disablePrevBtn();
    }
  };

  const prevBtnEvent = e => {
    e.preventDefault();
    count--;
    const url = getUrl(count * 10 - 10);
    getData(url);

    if (count == 1) {
      disablePrevBtn();
    }
  };

  return {
    disablePrevBtn,
    handlePrevBtnClick,
    enablePrevBtn,
    handleNextBtnClick,
    nextBtnEvent,
    prevBtnEvent
  };
};

const runPagination = Pagination();
runPagination.handleNextBtnClick();
runPagination.handlePrevBtnClick();
