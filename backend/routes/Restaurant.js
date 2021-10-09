const express = require('express');
const router = express.Router();
const RestaurantController = require('./../controller/RestaurantController')
const AuthToken = require('./../middleware/auth')
const path = require('path');

/* GET users listing. */

router.post('/addTable', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.addTable(req, res);
  res.send(data)

})

router.get('/', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.getTable(req, res);
  res.send(data)
  
})

router.post('/tableData', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.getRestaurantsReservationData(req, res);
  res.send(data)
  
})

router.post('/reserveTable', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.bookTable(req, res);
  res.send(data)
})

router.delete('/:refId', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.deleteTable(req, res);
  res.send(data)

})

router.get('/getReservationList/:refId', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.getReservationList(req, res);
  res.send(data)
})

router.get('/getReservationList', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.getReservationListByCompany(req, res);
  res.send(data)
})

router.delete('/reservation/:reservationId', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.deleteReservation(req, res);
  res.send(data)
})

router.get('/reservation/:reservationId', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.getReservationById(req, res);
  res.send(data)
})

router.put('/reserveTable', AuthToken,  async function (req, res, next) {
  // create a new promise inside of the async function
  let data = await RestaurantController.updateTable(req, res);
  res.send(data)
})

module.exports = router;
