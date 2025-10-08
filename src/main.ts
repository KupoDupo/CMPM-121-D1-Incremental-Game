import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
  <img id="increment" src="${exampleIconUrl}" class="icon" />
  <h2>Total Coins: <span id="counter"> ${counter} </span></h2>
`;

const clickImage = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

clickImage.addEventListener("click", () => {
  counter++;
  counterElement.innerText = counter.toString();
  console.log("I have these thingies:", clickImage, counterElement, counter);
});
