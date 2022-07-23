const paymentBtn = document.getElementById("paymentBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");


if(paymentBtn) {
    paymentBtn.addEventListener("click", () => {
        fetch("/cart/payment", {
            method: "POST"
        })
            .then(() => window.location.replace("/products"))
    })
}

if(clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        fetch("/cart", {
            method: "DELETE"
        })
            .then(() => window.location.reload())
    })
}
