import { Router } from "express";
import controller from './orders.controller.js'

const router = Router();

router.get('/', controller.orderList)
router.get('/:orderId', controller.order)
router.post('/', controller.makeOrder)
router.put('/:orderId', controller.updateOrderStatus)
router.delete('/:orderId', controller.deleteOrder)



export default router