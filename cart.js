document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// ✅ Format price in ₹ (Indian format)
const formatPrice = (price) => {
  return "₹" + Number(price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function renderCart() {
  const container = document.getElementById("productCartContainer");
  container.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subtotal = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;

    // Fix floating precision
    subtotal = Number((subtotal + itemTotal).toFixed(2));

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card">
        <img src="${item.image}" class="productImage" />

        <div class="productDetails">
          <p class="productName">${item.name}</p>
          <p class="productPrice">${formatPrice(item.price)}</p>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>

        <div class="stockElement">
          <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
          <span class="productQuantity">${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </div>

        <div class="itemTotal">
          ${formatPrice(itemTotal)}
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  updateTotals(subtotal);
}

function updateTotals(subtotal) {
  let delivery = 30;
  let total = Number((subtotal + delivery).toFixed(2));

  document.querySelector(".productSubTotal").innerText = formatPrice(subtotal);
  document.querySelector(".productFinalTotal").innerText = formatPrice(total);
}

function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ✅ Increase quantity
function increaseQty(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[i].quantity++;
  updateCart(cart);
}

// ✅ Decrease quantity (auto remove if 0)
function decreaseQty(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[i].quantity > 1) {
    cart[i].quantity--;
  } else {
    cart.splice(i, 1); // remove item
  }

  updateCart(cart);
}

// ✅ Remove item button
function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  updateCart(cart);
}