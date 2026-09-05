// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
let cart = JSON.parse(window.sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.textContent = `${product.name} - $${product.price} `;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.className = "add-to-cart-btn";
    button.dataset.id = product.id;

    button.addEventListener("click", function () {
      addToCart(product.id);
    });

    li.appendChild(button);
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");

    // Product name and price as text inside the LI
    li.textContent = `${product.name} - $${product.price}`;

    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price
    });

    window.sessionStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);

  window.sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];

  window.sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();