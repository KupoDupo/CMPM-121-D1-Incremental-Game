import carrotCoinSrc from "./carrot-piece.png";
// Credit to https://www.freeimages.com/photo/clover-field-1158154
import "./style.css";

/** VARIABLE DECLARATIONS */
let counter: number = 0; // total carrot coins
let ccps: number = 0; // carrot coins per second

// Item interface definition
interface Item {
  name: string; // name of Item
  price: number; // Item initial cost
  increase: number; // Amount Item increases carrot coins per owned unit per second
  rate: number; // price increase multiplier on purchase
  description: string; // description of cutie
  scale: number; // scale of emoji in background
  owned: number; // number owned
}

// Add items here to be purchased
const availableItems: Item[] = [
  {
    name: "bunny",
    price: 15,
    increase: 0.5,
    rate: 1.2,
    description: "Bunnies love carrots!",
    scale: 0.3,
    owned: 0,
  },
  {
    name: "pack of mice",
    price: 100,
    increase: 2,
    rate: 1.3,
    description: "Cutting carrots for da chedda.",
    scale: 0.1,
    owned: 0,
  },
  {
    name: "badger",
    price: 550,
    increase: 10,
    rate: 1.4,
    description: "A big boy who cuts big pieces!",
    scale: 0.6,
    owned: 0,
  },
  {
    name: "deer",
    price: 2000,
    increase: 100,
    rate: 1.5,
    description: "Very demure, very good at gardening despite having hooves",
    scale: 0.85,
    owned: 0,
  },
  {
    name: "cow",
    price: 5000,
    increase: 800,
    rate: 1.8,
    description: "MOO",
    scale: 1,
    owned: 0,
  },
];

// Track owned items (initialize to 0 for every available item)
const owned: { [key: string]: number } = {};
availableItems.forEach((item) => (owned[item.name] = 0));

/** HTML CREATION/SET UP */
const itemsHtml = availableItems
  .map((item) => {
    const emoji = item.name === "bunny"
      ? "🐇"
      : item.name === "pack of mice"
      ? "🐁🐁"
      : item.name === "deer"
      ? "🦌"
      : item.name === "cow"
      ? "🐄"
      : item.name === "badger"
      ? "🦡"
      : "";
    return `
        <div class="item-row" data-item="${item.name}">
          <h3 class="item-title">${emoji}${
      item.name[0].toUpperCase() + item.name.slice(1)
    }: <span id="cost-${item.name}">${
      Math.ceil(
        item.price,
      )
    } coins</span></h3>
          <p class="item-text">${item.description}</p>
          <div class="item-controls">
            <button id="buy-${item.name}">Buy</button>
            <div>Owned: <span id="owned-${item.name}">${item.owned}</span>, Collection: +<span id="rate-${item.name}">${item.increase}</span>/s</div>
          </div>
        </div>
      `;
  })
  .join("\n");

document.body.innerHTML = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&display=swap" rel="stylesheet">
    <div class="main">
      <div class="circlebg">
        <div id="increment" class="icon">🥕</div>
      </div>
      <h2><span><img id="coin" src="${carrotCoinSrc}" class="coin"/></span>Carrot Coins: <span id="counter"> ${counter} </span></h2>
      <h3>Carrot Coins Automatically Gained per Second: <span id="ccps"> ${ccps}</span></h3>
    </div>
    <div class="items">
      <h1>Items</h1>
      <hr>
      <div class="purchases">
        ${itemsHtml}
      </div>
    </div>
    <div id="creatures">
    </div>
  `;

const clickImage = document.getElementById("increment") as HTMLElement;
const counterElement = document.getElementById("counter") as HTMLElement;
const ccpsElement = document.getElementById("ccps") as HTMLElement;

// Buttons for each available item
availableItems.forEach((item) => {
  const btn = document.getElementById(`buy-${item.name}`) as
    | HTMLButtonElement
    | null;
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (counter >= item.price) {
      counter -= item.price;
      ccps += item.increase;
      owned[item.name]++;
      item.price = Math.ceil(item.price * item.rate);
      updateCounterDisplay();
      updateItemUI(item);
      updateBuyButtons();
    }
  });
});

/** FUNCTION DEFINITIONS/GAME LOGIC */
// const creaturesDiv = document.getElementById("creatures") as HTMLElement;

// Trim down counter display
function updateCounterDisplay() {
  counterElement.innerText = parseFloat(counter.toFixed(2)).toString();
  ccpsElement.innerText = parseFloat(ccps.toFixed(2)).toString();
}

// Update UI for a specific item
function updateItemUI(item: Item) {
  const costEl = document.getElementById(`cost-${item.name}`);
  const ownedEl = document.getElementById(`owned-${item.name}`);
  const rateEl = document.getElementById(`rate-${item.name}`);
  if (costEl) costEl.textContent = `${Math.ceil(item.price)} coins`;
  if (ownedEl) ownedEl.textContent = owned[item.name].toString();
  if (rateEl) {
    const perSec = item.increase * owned[item.name];
    rateEl.textContent = parseFloat(perSec.toFixed(2)).toString();
  }
}

// Enable/disable buy buttons based on affordability
function updateBuyButtons() {
  availableItems.forEach((item) => {
    const btn = document.getElementById(`buy-${item.name}`) as
      | HTMLButtonElement
      | null;
    if (btn) btn.disabled = counter < item.price;
  });
}

/** EVENT HANDLING */
// Ties these functions/updates to clicking the carrot image
clickImage.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  updateBuyButtons();
});

/** FINAL GAME SETUP/START GAME LOOP */
// UI Setup
updateCounterDisplay();
availableItems.forEach(updateItemUI);
updateBuyButtons();

// Holds timestamp for updating coin collector
let lastTimestamp = performance.now();

// Updates Coin Counter
function update(time: number) {
  if (time - lastTimestamp >= 1000) {
    let added = 0;
    availableItems.forEach((item) => {
      if (owned[item.name] > 0) {
        added += owned[item.name] * item.increase;
      }
    });
    if (added > 0) {
      counter += added;
      updateCounterDisplay();
      updateBuyButtons();
      availableItems.forEach(updateItemUI);
    }
    lastTimestamp = time;
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
