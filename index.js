const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

let app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

function getCartTotal(newItemPrice, cartTotal) {
  let totalPrice = newItemPrice + cartTotal;
  return totalPrice;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCartTotal(newItemPrice, cartTotal).toString());
});

function getMemberDiscount(cartTotal, isMember) {
  let discountPercentage = 10;
  if (isMember) {
    let discount = cartTotal * (discountPercentage / 100);
    let discountPrice = cartTotal - discount;
    return discountPrice;
  } else {
    return 'no discount applied';
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(getMemberDiscount(cartTotal, isMember).toString());
});

function getCartTotal(cartTotal) {
  let tax = 5;
  let afterTaxDeduction = (tax / 100) * cartTotal;
  return afterTaxDeduction;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCartTotal(cartTotal).toString());
});

function getEstimatedDelivery(shippingMethod, distance) {
  let speed;
  if (shippingMethod === 'Standard') {
    speed = 50;
  } else if (shippingMethod === 'Express') {
    speed = 100;
  } else {
    return 'Invalid shipping method';
  }
  return distance / speed;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getEstimatedDelivery(shippingMethod, distance).toString());
});

function getShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(getShippingCost(weight, distance).toString());
});

function getLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(getLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
