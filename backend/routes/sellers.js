var express = require('express');
var router = express.Router();
const sellerModel = require('../models/Seller');


/* GET sellers listing. */
router.get('/sellers', function(req, res, next) {
  sellerModel
  .find()
  .then((users) => res.status(200).json(users))
  .catch(next);
});

/* GET  a user  */
router.get('/sellers/:id', function(req, res, next) {
  sellerModel
  .findById(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);
});

/* PATCH  a user  */
router.patch('/sellers/:id', function(req, res, next) {
    const updatedSeller = req.body
    sellerModel
    .findByIdAndUpdate(req.params.id, updatedSeller)
    .then((user) => res.status(200).json(user))
    .catch(next);
  });
  
  /* DELETE  a seller */
router.delete('/sellers/:id', function(req, res, next) {
    sellerModel
    .findByIdAndDelete(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch(next);
  });
  
  module.exports = router;


