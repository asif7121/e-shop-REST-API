import { RequestHandler } from "../../helpers/requestHandler.helper.js";
import constant from "../../utils/constant.js";
import Product from "../product/product.model.js";
import Category from "./category.model.js"

export default {
    createCategory: async(req, res) => {
        try {
            const { name } = req.body
            if(!name){
               return RequestHandler.Error({res, error: constant.NAME_IS_REQUIERED})
            }
            const data = await Category.create({name});
            return RequestHandler.Success({
                res,
                message: constant.CATEGORY_ADDED_SUCCESSFULLY,
                data
            })
        } catch (error) {
           return RequestHandler.Error({ res, error: error?.message})
        }
    },

    categoryList : async(req,res)=> {
        try {
            const categoryList = await Category.find();
            if(!categoryList){
                return RequestHandler.Error({res, error: error})
            }return RequestHandler.Success({
                res,
                data: categoryList
            })
        } catch (error) {
            throw new Error(error)
        }
    },

    category : async(req, res) => {
        try {
            const { categoryId } = req.params
        if(!categoryId){
            return RequestHandler.Error({
                res,
                statusCode: 404,
                error: constant.CATEGORY_ID_IS_REQUIRED
            })
        }
        const category = await Category.findById(categoryId);
        if(!category) {
            return RequestHandler.Error({
                res,
                statusCode: 404,
                error: constant.CANNOT_FIND_CATEGORY
            });
        }
        return RequestHandler.Success({
            res,
            statusCode: 200,
            data: category
        })

        
        } catch (error) {
            throw new Error(error)
        }

    },

    updateCategory: async(req, res)=> {
        try {
            const {categoryId} = req.params;
            const category = await Category.findByIdAndUpdate(categoryId,{name: req.body.name}, {new: true});
            if(!category) {
                return RequestHandler.Error({
                    res,
                    statusCode: 404,
                    error: constant.CANNOT_FIND_CATEGORY
                })
            }return RequestHandler.Success({
                res,
                statusCode: 200,
                message: constant.CATEGORY_SUCCESSFULLY_UPDATED,
                data: category
            })    
        } catch (err) {
            return res.status(400).send({
                isSuccess: false,
                error: err
            })
        }
    },

    deleteCategory: async(req, res)=>  {
       try {
        
         const {categoryId} = req.params;
         const data = await Category.findByIdAndDelete(categoryId)
        
         if(data){
            await Product.deleteMany({category: categoryId})
            return RequestHandler.Success({
                res,
                 statusCode: 201,
                 message:constant.CATEGORY_DELETED_SUCCESSFULLY
             })
         }
         
         return RequestHandler.Error({
             res,
             error: constant.CANNOT_FIND_CATEGORY
         })
         
 
       } catch(err){
        return res.status(400).send({
            isSuccess: false,
            error: err
           })
       }
    
    }     
}
