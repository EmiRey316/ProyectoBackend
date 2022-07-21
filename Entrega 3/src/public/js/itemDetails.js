const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const count = document.getElementById("count");
const quantity = document.getElementById("quantity");

minusBtn.addEventListener("click", () => {
    let actualCount = Number(count.textContent) -1;
    count.innerHTML = actualCount;
    quantity.setAttribute("value", actualCount);
})

plusBtn.addEventListener("click", () => {
    let actualCount = Number(count.textContent) + 1;
    count.innerHTML = actualCount;
    quantity.setAttribute("value", actualCount);
})