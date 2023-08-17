import { RequestHandler } from "../../helpers/requestHandler.helper.js";
import constant from "../../utils/constant.js";
import OrderItem from "../orderItems/orderItems.model.js";
import Order from './orders.model.js'

export default {
    orderList: async(req, res)=> {
        try {
            const orderList = await Order.find().populate('user', 'name').sort({'dateOfOrder': -1});
            if(!orderList){
                return RequestHandler.Error({res, error: error})
            }return RequestHandler.Success({
                res,
                data: orderList
            })
        } catch (error) {
            throw new Error(error)
        }
    },

    order: async(req, res)=> {
        try {
            const {orderId} = req.params
            const order = await Order.findById(orderId)
            .populate('user', 'name')
            .populate({path: 'orderItems',populate:{path: 'product', populate:'category'} })

            if(!order){
                return RequestHandler.Error({res, error: ''})
            }return RequestHandler.Success({
                res,
                data: order
            })
        } catch (err) {
            return RequestHandler.Error({
                res,
                statusCode: 400,
                error: err
            })
        }
    },

    makeOrder: async(req, res)=> {
        try {
            const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem=>{
                let newOrderItem = new OrderItem({
                    product: orderItem.product,
                    quantity: orderItem.quantity
                })
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            }));
            const orderItemsIdResolved = await orderItemsIds;
            const totalPrices = await Promise.all(orderItemsIdResolved.map(async(orderItemId)=>{
                const orderItem = await OrderItem.findById(orderItemId).populate('product','price');
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            }));
            const totalPrice = totalPrices.reduce((a,b)=> a + b , 0);
            let order = new Order({
                orderItems: orderItemsIdResolved,
                shippingAddress: req.body.shippingAddress,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                phone: req.body.phone,
                status: req.body.status,
                totalPrice: totalPrice,
                user: req.body.user
              });
              order = await order.save();
              if (!order) {
                return RequestHandler.Error({
                  statusCode: 400,
                  error: constant.ORDER_CANNOT_PLACED,
                });
              }
              return RequestHandler.Success({
                res,
                statusCode: 200,
                isSuccess: true,
                data: order
              });
        } catch (err) {
            return res.status(400).send({
                isSuccess: false,
                error: err
            })
        }
    },

    updateOrderStatus: async(req, res)=> {
        try {
            const {orderId} = req.params;
            const order = await Order.findByIdAndUpdate(orderId,{status: req.body.status}, {new: true});
            if(!order) {
                return RequestHandler.Error({
                    res,
                    statusCode: 404,
                    error: constant.ORDER_NOT_FOUND
                })
            }return RequestHandler.Success({
                res,
                statusCode: 200,
                message: constant.STATUS_SUCCESSFULLY_UPDATED,
                data: order
            })    
        } catch (err) {
            return res.status(400).send({
                isSuccess: false,
                error: err
            })
        }
    },

    deleteOrder: async(req, res)=>  {
        try {
          const {orderId} = req.params;
          const order = await Order.findByIdAndDelete(orderId)
              if(order){
                 return RequestHandler.Success({
                     res,
                      statusCode: 201,
                      message:constant.ORDER_DELETED_SUCCESSFULLY
                  })
              }         
          return RequestHandler.Error({
              res,
              statusCode: 404,
              error: constant.ORDER_NOT_FOUND
          })
          
  
        } catch(err){
         return res.status(400).send({
             isSuccess: false,
             error: err
            })
        }
     
     }  
}

  

