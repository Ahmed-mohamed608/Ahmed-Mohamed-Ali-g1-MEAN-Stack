const addToCart = require("./modules/addToCart");
const removeFromCart = require("./modules/removeFromCart");
const listCart = require("./modules/listCart");
const calculateTotal = require("./modules/calculateTotal");

addToCart(1);
addToCart(2);
addToCart(4);

listCart();

calculateTotal();

removeFromCart(2);

listCart();

calculateTotal();