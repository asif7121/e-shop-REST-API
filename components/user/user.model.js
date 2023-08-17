import { Schema, model as Model } from 'mongoose';


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: ''
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
    }
},
{
versionKey: false,
timestamps:true
});



const User = Model('User', userSchema);
export default User
