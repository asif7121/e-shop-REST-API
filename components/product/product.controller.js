import mongoose from "mongoose";
import { RequestHandler } from "../../helpers/requestHandler.helper.js";
import constant from "../../utils/constant.js";
import Category from "../category/category.model.js";
import Product from "./product.model.js";

export default {
  addProduct: async (req, res) => {
    try {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return RequestHandler.Error({
          res,
          statusCode: 400,
          error: constant.INVALID_CATEGORY,
        });
      }
      let product = new Product({
        name: req.body.name,
        qtyPerUnit: req.body.qtyPerUnit,
        unitInStock: req.body.unitInStock,
        price: req.body.price,
        discontinued: req.body.discontinued,
        category: req.body.category,
      });
      product = await product.save();
      if (!product) {
        return RequestHandler.Error({
          statusCode: 500,
          error: constant.PRODUCT_CANNOT_BE_ADDED,
        });
      }
      return RequestHandler.Success({
        res,
        statusCode: 200,
        isSuccess: true,
        data: product
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  productList: async (req, res) => {
    let filter = {};
    if(req.query.categories){
      filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate("category");
    if (!productList) {
      return RequestHandler.Error({
        res,
        statusCode: 404,
        error: constant.NOT_FOUND,
      });
    }
    return res.send(productList);
  },

  product: async (req, res) => {
    try {
      const { productId } = req.params;
      if (!productId) {
        return RequestHandler.Error({
          res,
          statusCode: 404,
          error: constant.PRODUCT_ID_IS_REQUIRED,
        });
      }
      const product = await Product.findById(productId)
        .select("name unitPrice unitInStock price -_id")
        .populate("category");
      if (!product) {
        return RequestHandler.Error({
          res,
          statusCode: 404,
          error: constant.CANNOT_FOUND_PRODUCT,
        });
      }
      return RequestHandler.Success({
        res,
        statusCode: 200,
        data: product,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;
    if(!mongoose.isValidObjectId(productId)){
      return RequestHandler.Error({
        res,
        statusCode: 400,
        error: constant.INVALID_PRODUCT_ID,
      })
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
      return RequestHandler.Error({
        res,
        statusCode: 400,
        error: constant.INVALID_CATEGORY,
      });
    }
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name,
        qtyPerUnit: req.body.qtyPerUnit,
        unitPrice: req.body.unitPrice,
        unitInStock: req.body.unitInStock,
        discontinued: req.body.discontinued,
        category: req.body.category,
      },
      { new: true }
    );
    if (!product) {
      return RequestHandler.Error({
        res,
        error: constant.CANNOT_UPDATE,
      });
    }
    return RequestHandler.Success({
      res,
      statusCode: 200,
      data: product,
    });
  },

  deleteProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      if (product)
        return RequestHandler.Success({
          res,
          statusCode: 201,
          message: constant.PRODUCT_DELETED_SUCCESSFULLY,
        });
      return RequestHandler.Error({
        res,
        error: constant.PRODUCT_NOT_FOUND,
      });
    } catch (err) {
      return RequestHandler.Error({
        res,
        statusCode: 400,
        error: constant.BAD_REQUEST,
      });
    }
  },
};
