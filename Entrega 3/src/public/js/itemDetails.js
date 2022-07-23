const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const stock = document.getElementById("stock");
const count = document.getElementById("count");
const quantity = document.getElementById("quantity");

console.log(stock.textContent)

minusBtn.addEventListener("click", () => {
    let actualCount = Number(count.textContent) -1;
    count.innerHTML = actualCount;
    quantity.setAttribute("value", actualCount);

    if(actualCount <= 1) {
        minusBtn.setAttribute("disabled", "");
    } else if(actualCount <= stock.textContent) {
        plusBtn.removeAttribute("disabled", "");
    }
})

plusBtn.addEventListener("click", () => {
    let actualCount = Number(count.textContent) + 1;
    count.innerHTML = actualCount;
    quantity.setAttribute("value", actualCount);

    if(actualCount >= stock.textContent) {
        plusBtn.setAttribute("disabled", "");
    } else if(actualCount >= 1) {
        minusBtn.removeAttribute("disabled", "");
    }
})