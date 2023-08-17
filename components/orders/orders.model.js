import { Schema, model as Model } from "mongoose";

const orderSchema = new Schema({
    orderItems : [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress:{
        type: String,
        required: true
    },
     zip: {
        type: String,
        required: true,
        default: ''
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    country: {
        type: String,
        required: true,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice:{
        type: Number,
        default: 0
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOfOrder:{
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: true
});

const Order = Model('Order', orderSchema)
export default Order