


const productList = document.getElementById("product-list");

let products = [
    { name: "Violent", price: 2500, imageUrl: "https://www.shahbamusic.com/2307-large_default/violon-pm.jpg" },
    { name: "Nay", price: 1000, imageUrl: "https://emmparis.fr/wp-content/uploads/2021/01/5c6985_a711ba508c9440bb8dc9d5b9ab86480a1.png" },
    { name: "Guitar", price: 1000, imageUrl: "https://cangozmuzik.com.tr/uploads/p/p/Admira-PALOMA-Klasik-Gitar_4.jpg?v=1725971514" },
];

function initializeProducts() {
    for (let i = 0; i < products.length; i++) {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML =
            '<img src="' + products[i].imageUrl + '" alt="' + products[i].name + '" class="product-image">' +
            '<h3>' + products[i].name + '</h3>' +
            '<p>$' + parseFloat(products[i].price).toFixed(2) + '</p>' +
            '<div class="product-controls">' +
            '<div class="quantity-control">' +
            '<button class="decrement">-</button>' +
            '<span class="quantity">1</span>' +
            '<button class="increment">+</button>' +
            '</div>' +
            '<div class="product-actions">' +
            '<i class="fas fa-trash"></i>' +
            '<i class="fas fa-heart"></i>' +
            '</div>' +
            '</div>';

        productList.appendChild(productCard);
    }
    myEvents();
    calculateTotalPrice();
}

document.addEventListener("DOMContentLoaded", initializeProducts);

function myEvents() {
    const productCards = document.getElementsByClassName("product-card");

    for (let i = 0; i < productCards.length; i++) {
        const productCard = productCards[i];
        const quantitySpan = productCard.querySelector(".quantity");
        const incrementBtn = productCard.querySelector(".increment");
        const decrementBtn = productCard.querySelector(".decrement");
        const trashIcon = productCard.querySelector(".fa-trash");
        const heartIcon = productCard.querySelector(".fa-heart");

        incrementBtn.addEventListener("click", function () {
            quantitySpan.textContent = Number(quantitySpan.textContent) + 1;
            calculateTotalPrice();
        });

        decrementBtn.addEventListener("click", function () {
            if (Number(quantitySpan.textContent) > 1) {
                quantitySpan.textContent = Number(quantitySpan.textContent) - 1;
                calculateTotalPrice();
            }
        });

        trashIcon.addEventListener("click", function () {

            const index = Array.from(productList.children).indexOf(productCard);
            products.splice(index, 1);
            productCard.remove();
            calculateTotalPrice();
        });

        heartIcon.addEventListener("click", function () {
            heartIcon.classList.toggle("active");
        });
    }
}
//Prix Total
function calculateTotalPrice() {
    const productCards = document.getElementsByClassName("product-card");

    let total = 0;
    for (let i = 0; i < productCards.length; i++) {
        const quantity = Number(productCards[i].querySelector(".quantity").textContent);
        const price = Number(productCards[i].querySelector("p").textContent.slice(1));
        total += quantity * price;
    }

    const totalPrice = document.getElementById("total-price");
    totalPrice.textContent = "Total: $" + total.toFixed(2);
}