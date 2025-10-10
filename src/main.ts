import carrot from "./Carrot.png";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <div class="main">
    <img id="increment" src="${carrot}" class="icon" />
    <h2>Total Coins: <span id="counter"> ${counter} </span></h2>
  </div>
`;

const clickImage = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

clickImage.addEventListener("click", () => {
  counter++;
  counterElement.innerText = counter.toString();
  console.log("I have these thingies:", clickImage, counterElement, counter);
});
