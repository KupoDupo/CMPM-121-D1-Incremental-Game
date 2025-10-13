import cc from "./carrot-piece.png";
import "./style.css";

let counter: number = 0;

/*
interface Item {
  name: string; // name of Item
  price: number; // Item initial cost
  increase: number; // Amount Item increases carrot coins per owned unit per second
  rate: number; // price increase multiplier on purchase
}

// Add bunny and badger to available items
const availableItems: Item[] = [
  { name: "bunny", price: 15, increase: 0.5, rate: 1.5 },
  { name: "badger", price: 100, increase: 2, rate: 1.5 },
];
*/
/*
const itemsHtml = availableItems
  .map((it) => {
    const emoji = it.name === "bunny" ? "🐇" : it.name === "badger" ? "🦡" : "";
    return `
        <div class="autoclicker item-row" data-item="${it.name}">
          <h3 class="item-title">${emoji}${
      it.name[0].toUpperCase() + it.name.slice(1)
    }: <span id="cost-${it.name}">${
      Math.ceil(
        it.price,
      )
    } coins</span></h3>
          <p class="item-text">Collects carrots for you automatically.</p>
          <div class="item-controls">
            <button id="buy-${it.name}">Buy</button>
            <div>Owned: <span id="owned-${it.name}">0</span> — +<span id="rate-${it.name}">${it.increase}</span>/s</div>
          </div>
        </div>
      `;
  })
  .join("\n");
*/

document.body.innerHTML = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap" rel="stylesheet">
    <div class="main">
      <div id="increment" class="icon">🥕</div>
      <h2><span><img id="coin" src="${cc}" class="coin"/></span>Carrot Coins: <span id="counter"> ${counter} </span></h2>
    </div>
  `;

/* <div class="items">
      <h1>Items</h1>
      ${itemsHtml}
    </div>
*/

const clickImage = document.getElementById("increment") as HTMLElement;
const counterElement = document.getElementById("counter") as HTMLElement;

// Trim down counter display
function updateCounterDisplay() {
  counterElement.innerText = parseFloat(counter.toFixed(2)).toString();
}

/* Commenting out to do steps 3 and 4!
// Track owned items (initialize to 0 for every available item)
const owned: { [key: string]: number } = {};
availableItems.forEach((it) => (owned[it.name] = 0));

function updateItemUI(it: Item) {
  const costEl = document.getElementById(`cost-${it.name}`);
  const ownedEl = document.getElementById(`owned-${it.name}`);
  const rateEl = document.getElementById(`rate-${it.name}`);
  if (costEl) costEl.textContent = `${Math.ceil(it.price)} coins`;
  if (ownedEl) ownedEl.textContent = owned[it.name].toString();
  if (rateEl) {
    const perSec = it.increase * owned[it.name];
    rateEl.textContent = parseFloat(perSec.toFixed(2)).toString();
  }
}


function updateBuyButtons() {
  availableItems.forEach((it) => {
    const btn = document.getElementById(`buy-${it.name}`) as
      | HTMLButtonElement
      | null;
    if (btn) btn.disabled = counter < it.price;
  });
}
*/

// Commenting out part cause I skipped steps 3 and 4!
clickImage.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  //updateBuyButtons();
});

/* Commenting out cause I skipped steps 3 and 4!
// Attach handlers for each available item
availableItems.forEach((it) => {
  const btn = document.getElementById(`buy-${it.name}`) as
    | HTMLButtonElement
    | null;
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (counter >= it.price) {
      counter -= it.price;
      owned[it.name]++;
      // increase price for next purchase
      it.price = Math.ceil(it.price * it.rate);
      updateCounterDisplay();
      updateItemUI(it);
      updateBuyButtons();
    }
  });
});

// Auto-collect: sum across all owned items
setInterval(() => {
  let added = 0;
  availableItems.forEach((it) => {
    if (owned[it.name] > 0) {
      added += owned[it.name] * it.increase;
    }
  });
  if (added > 0) {
    counter += added;
    updateCounterDisplay();
    updateBuyButtons();
    // update rates display for items
    availableItems.forEach(updateItemUI);
  }
}, 1000);

// initialize UI
updateCounterDisplay();
availableItems.forEach(updateItemUI);
updateBuyButtons();
*/

window.setInterval(() => {
  counter += 1;
  updateCounterDisplay();
}, 1000);
