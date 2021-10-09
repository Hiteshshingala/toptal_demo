const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    name: {
        type: String,
    },
    time: {
        type: Date
    },
    noOfSeats: {
        type: Number
    },
    contactNumber: {
        type: String
    },
    tableId: {
        type: String
    },
    restaurantId: {
        type: String,
        ref: 'restaurant'
    },
    isActive: {
        type: Boolean,
        default: true
    },
},{
    timestamps: { createdAt: true, updatedAt: false }
})


ReservationSchema.pre('save', function(next) {
    // do stuff
    next();
  });

const User = mongoose.model('reservation', ReservationSchema)
module.exports = User;