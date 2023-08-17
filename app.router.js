import { Router } from "express";
import categoryRouter from './components/category/category.route.js';
import productRouter from './components/product/product.route.js'
import userRouter from './components/user/user.route.js'
import orderRouter from './components/orders/orders.route.js'
const router = Router()

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)

export default router;