import { Schema, model as Model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  qtyPerUnit: {
    type: String,
    min: 0,
  },
  unitInStock: {
    type: Number,
    min: 0,
  },
  price:{
    type: Number,
    required: true
  },
  discontinued: Boolean,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  }
  
},
{
    versionKey: false,
    timestamps: true
}
);

const Product = Model("Product", productSchema);
export default Product;
