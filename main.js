document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productContainer");

  fetch("./api/products.json")
    .then(res => res.json())
    .then(data => {
      const template = document.getElementById("productTemplate");

      data.forEach(product => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector(".productName").textContent = product.name;
        clone.querySelector(".productPrice").textContent = `$${product.price}`;
        clone.querySelector(".productImage").src = product.image; // ⭐ IMPORTANT

        container.appendChild(clone);
      });
    });
});
// Add this inside or after your DOMContentLoaded block
document.getElementById("productContainer").addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart-button")) {
    let card = e.target.closest(".cards");

    let product = {
      name: card.querySelector(".productName").innerText,
      // Use parseFloat to ensure the price is a number for calculations later
      price: parseFloat(card.querySelector(".productPrice").innerText.replace("$", "")),
      image: card.querySelector(".productImage").src,
      // Ensure the quantity element exists in your HTML template
      quantity: parseInt(card.querySelector(".productQuantity")?.innerText || 1),
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  }
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Calculate total quantity of all items
  const totalItems = cart.reduce((total, item) => {
    // Ensure item.quantity is treated as a number
    return total + (Number(item.quantity) || 0);
  }, 0);
  
  const countLabel = document.getElementById("cartCountLabel");
  if (countLabel) {
    countLabel.innerText = totalItems;
  }
}

// Ensure the count updates as soon as the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);