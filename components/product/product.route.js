import { Router } from "express";
import controller from './product.controller.js'
import isAdmin from "../../middlewares/verifyAdmin.js";

const router = Router();

router.get('/:productId', controller.product)
router.get('/', controller.productList)
router.use(isAdmin)
router.post('/', controller.addProduct)
router.patch('/:productId', controller.updateProduct)
router.delete('/:productId', controller.deleteProduct)


export default router