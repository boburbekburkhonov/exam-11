import { Router } from "express"
import category from "../controller/category"
import comments from "../controller/comments"
import product from "../controller/product"
import subCategory from "../controller/sub.category"
import subSubCategory from "../controller/sub.sub.category"
import users from "../controller/users"
import validateMiddleware from "../middleware/validate.middleware"
import { verifyToken } from "../middleware/verifyToken"
import { validateLogin, validateRegister, validateSubCategory, validateSubSubCategory } from "../validate/validate"

const router = Router()

export default router
  .get("/user/page", verifyToken, users.GET_USER)
  .get("/categories", product.GET_PRODUCTS_CATEGRY)
  .get("/subcategories", product.GET_PRODUCTS_SUBCATEGRY)
  .post("/user/register", validateMiddleware(validateRegister), users.REGISTER)
  .post("/user/login", validateMiddleware(validateLogin), users.LOGIN)
  .post("/category/create", category.POST)
  .post("/subcategory/create", validateMiddleware(validateSubCategory), subCategory.POST)
  .post("/subsubcategory/create", validateMiddleware(validateSubSubCategory), subSubCategory.POST)
  .post("/product/create", product.POST)
  .post("/comment/create", comments.POST)
  .patch("/user/update", verifyToken, users.UPDATE)
