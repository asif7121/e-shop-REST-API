import { Schema, model as Model } from "mongoose";

const orderItemSchema = new Schema({
    product:{ 
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
});

const OrderItem = Model('OrderItem', orderItemSchema)
export default OrderItem