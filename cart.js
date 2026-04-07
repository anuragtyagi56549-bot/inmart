document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("productCartContainer");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cart.forEach((item, index) => {
  subtotal += Number(item.price) * Number(item.quantity);

  const div = document.createElement("div");
  // Ensure 'cards' class remains so other JS logic doesn't break
  div.classList.add("cards"); 

  div.innerHTML = `
    <div class="card">
      <img src="${item.image}" class="productImage" />
      
      <div class="productDetails">
        <h2 class="productName">${item.name}</h2>
        <p class="productPrice">$${Number(item.price).toFixed(2)}</p>
      </div>

      <div class="stockElement">
        <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
        <p class="productQuantity">${item.quantity}</p>
        <button class="qty-btn" onclick="increaseQty(${index})">+</button>
      </div>

      <div class="itemTotal">
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    </div>
  `;

  container.appendChild(div);
});
    // totals
    let tax = subtotal * 0.1;
    let total = subtotal + tax;

    document.querySelector(".productSubTotal").innerText = `$${subtotal.toFixed(2)}`;
    document.querySelector(".productTax").innerText = `$${tax.toFixed(2)}`;
    document.querySelector(".productFinalTotal").innerText = `$${total.toFixed(2)}`;
});

function updateCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity++;
    updateCart(cart);
}

function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    updateCart(cart);
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    updateCart(cart);
}