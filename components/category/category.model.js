import { Schema, model as Model } from 'mongoose'

 const categorySchema = new Schema({
    name:{
        type : String,
        lowercase : true,       
    }
},{
    timestamps: true,
    versionKey: false
});



const Category = Model('Category', categorySchema);
export default Category;