import { Router } from "express";
import controller from "./category.controller.js";
import isAdmin from "../../middlewares/verifyAdmin.js";

const router = Router()


router.get('/', controller.categoryList)
router.get('/:categoryId', controller.category)
router.use(isAdmin)
router.post('/', controller.createCategory)
router.patch('/:categoryId', controller.updateCategory)
router.delete('/:categoryId', controller.deleteCategory)

export default router