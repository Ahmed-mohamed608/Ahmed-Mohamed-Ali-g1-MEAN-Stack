const cart = require("../data/cart");

function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) {
    console.log("Product not found in cart");
    return;
  }

  const removed = cart.splice(index, 1);
  console.log(`${removed[0].name} removed from cart`);
}

module.exports = removeFromCart;