var express = require('express');
var router = express.Router();
const productModel = require('../models/Product');

/* CREATE a product. */
router.post('/products', function(req, res, next) {
    productModel
    .create(req.body)
    .then((users) => res.status(200).json(users))
    .catch(next);
  });

/* GET products listing. */
router.get('/products', function(req, res, next) {
  productModel
  .find()
  .then((users) => res.status(200).json(users))
  .catch(next);
});

/* GET  a product  */
router.get('/products/:id', function(req, res, next) {
  productModel.findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* PATCH  a product  */
router.patch('/products/:id', function(req, res, next) {
  const updatedUser = req.body
  productModel
  .findByIdAndUpdate(req.params.id, updatedUser)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* DELETE  a product  */
router.delete('/products/:id', function(req, res, next) {
  productModel
  .findByIdAndDelete(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});








module.exports = router;
