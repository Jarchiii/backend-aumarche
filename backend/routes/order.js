var express = require('express');
var router = express.Router();
const orderModel = require('../models/Order');

/* CREATE a product. */
router.post('/orders', function(req, res, next) {
    orderModel
    .create(req.body)
    .then((users) => res.status(200).json(users))
    .catch(next);
  });

/* GET products listing. */
router.get('/orders', function(req, res, next) {
  orderModel
  .find()
  .then((users) => res.status(200).json(users))
  .catch(next);
});

/* GET  a product  */
router.get('/orders/:id', function(req, res, next) {
  orderModel.findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* PATCH  a product  */
router.patch('/orders/:id', function(req, res, next) {
  const updatedUser = req.body
  orderModel
  .findByIdAndUpdate(req.params.id, updatedUser)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* DELETE  a product  */
router.delete('/orders/:id', function(req, res, next) {
  orderModel
  .findByIdAndDelete(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});
module.exports = router;

