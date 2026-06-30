const cart = require("../data/cart");

function calculateTotal() {
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
  });

  console.log("Total =", total);
}

module.exports = calculateTotal;