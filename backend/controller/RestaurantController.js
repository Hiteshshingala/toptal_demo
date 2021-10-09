'use strict'

const RestaurantModel = require('./../Model/Restaurant')
const ReservationModel = require('./../Model/Reservation')
const constant = require('./../Constant/index')
const responseService = require('./../service/responseService')
const moment = require('moment')

module.exports = {
   
    addTable: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { refId, noOfSeats, name } = req.body;
            const {_id, email, restaurantId} = req.userData;
            const refExist = await RestaurantModel.findOne({_id: restaurantId});
            const existing =  (refExist && refExist.bookings && refExist.bookings.length > 0 && (refExist.bookings.findIndex(el => el.tableNo == refId) > -1)) ? refExist.bookings.findIndex(el => el.tableNo == refId) : -1
            if(existing >= 0){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                const restUpdate = await RestaurantModel.updateOne({_id: restaurantId, 'bookings.tableNo': refId},  {
                    'bookings.$.noOfSeats': noOfSeats,
                    'bookings.$.name': name,
                });
                res.status(200)
                const response = responseService.success({msg: 'Table updated successfully', payload: restUpdate})
                resolve(response);
            } else {
                const restUpdate = await RestaurantModel.updateOne({_id: restaurantId},  {
                    $push: {
                        bookings: {
                            tableNo: refId,
                            noOfSeats: noOfSeats,
                            name: name,
                        }
                    }
                });
                res.status(200)
                const response = responseService.success({msg: 'Table added successfully', payload: restUpdate})
                resolve(response);
            }
        })
    },

    bookTable: function (req, res) {
        const { refId, noOfSeats, name, reserveTime, contactNumber } = req.body;
        const { restaurantId} = req.userData;
        const bookTable  = ReservationModel.create({
            name: name, 
            time: moment(reserveTime).subtract(1, 'd').utc(),
            noOfSeats: noOfSeats, 
            tableId: refId,
            restaurantId: restaurantId,
            contactNumber: contactNumber,
            isActive: true
        })
        res.status(200)
        const response = responseService.success({msg: 'Reserve Table successfully', payload: bookTable})
        return response;
    },

    updateTable: async function (req, res) {
        const { refId, noOfSeats, name, reserveTime, contactNumber, _id } = req.body;
        const { restaurantId} = req.userData;
        const bookTable  =  await ReservationModel.findOneAndUpdate({_id: _id},{
            name: name, 
            time: moment(reserveTime).subtract(1, 'd').utc(),
            noOfSeats: noOfSeats, 
            tableId: refId,
            restaurantId: restaurantId,
            contactNumber: contactNumber,
            isActive: true
        })
        res.status(200)
        const response = await responseService.success({msg: 'Booking updated successfully', payload: bookTable})
        return response;
    },

    getTable: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { restaurantId} = req.userData;
            const bookTable  = await RestaurantModel.findOne({
                _id: restaurantId
            })
            res.status(200)
            const response = await responseService.success({msg: 'Table Data get successfully', payload: bookTable})
            resolve(response);
        })
    },

    getRestaurantsReservationData: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { refId, date } = req.body;
            const { restaurantId} = req.userData;
            let minDate = moment(date).utc();//.subtract(1, 'd').utc();
            let maxDate = moment(date).add(2, 'd').utc();
            const reservationData  = await ReservationModel.find({
                restaurantId: restaurantId,
                tableId: refId,
                isActive: true,
                time: {
                    $gte: minDate,
                    $lt: maxDate
                }
            })
            res.status(200)
            const response = await responseService.success({msg: 'Table Data get successfully', payload: reservationData})
            resolve(response);
        })
    },

    deleteTable: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { refId } = req.params;
            const { restaurantId} = req.userData;
            const refExist = await RestaurantModel.findOne({_id: restaurantId, 'bookings.tableNo': refId});
            const existing =  (refExist && refExist.bookings && refExist.bookings.length > 0 && (refExist.bookings.findIndex(el => el.tableNo == refId) > -1)) ? refExist.bookings.findIndex(el => el.tableNo == refId) : -1
            if(existing >= 0){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                const restUpdate = await RestaurantModel.updateOne({_id: restaurantId, 'bookings.tableNo': refId},  {
                    $pull: {
                        bookings: {
                            tableNo: refId,
                        }
                    }
                });
                res.status(200)
                const response = responseService.success({msg: 'Table deleted successfully', payload: restUpdate})
                resolve(response);
            } else {
                res.status(404)
                const response = responseService.error({msg: 'No table found', payload: {}})
                resolve(response);
            }
        })
    },
    getReservationList: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { refId } = req.params;
            const { restaurantId} = req.userData;
            const data = await ReservationModel.find({restaurantId: restaurantId, tableId: refId, isActive: true}).sort({_id: -1});
            if(data.length){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                res.status(200)
                const response = responseService.success({msg: 'Table deleted successfully', payload: data})
                resolve(response);
            } else {
                res.status(200)
                const response = responseService.error({msg: 'No table found', payload: {}})
                resolve(response);
            }
        })
    },
    getReservationListByCompany: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { restaurantId} = req.userData;
            const data = await ReservationModel.find({restaurantId: restaurantId, isActive: true}).sort({_id: -1});
            if(data.length){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                res.status(200)
                const response = responseService.success({msg: 'Table deleted successfully', payload: data})
                resolve(response);
            } else {
                res.status(200)
                const response = responseService.error({msg: 'No table found', payload: {}})
                resolve(response);
            }
        })
    },
    getReservationById: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { reservationId } = req.params;
            const data = await ReservationModel.findOne({_id: reservationId});
            if(data){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                res.status(200)
                const response = responseService.success({msg: 'Table get successfully', payload: data})
                resolve(response);
            } else {
                res.status(200)
                const response = responseService.error({msg: 'No table found', payload: {}})
                resolve(response);
            }
        })
    },
    deleteReservation: function (req, res) {
        return new Promise(async (resolve, reject) => {
            const { reservationId } = req.params;
            const data = await ReservationModel.findOneAndUpdate({_id: reservationId}, {isActive: false}).sort({_id: -1});
            if(data._id){
                // const restaurant = await ReservationModel.create({restaurantId, name: name, time: Date.now(), noOfSeats: noOfSeats, tableId: refExist.bookings[existindex].tableNo})
                res.status(200)
                const response = responseService.success({msg: 'reservation deleted successfully', payload: data})
                resolve(response);
            } else {
                res.status(404)
                const response = responseService.error({msg: 'No reservation found', payload: {}})
                resolve(response);
            }
        })
    }
}

