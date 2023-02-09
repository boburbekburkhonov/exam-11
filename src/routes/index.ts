import { Router } from "express"
import category from "../controller/category"
import comments from "../controller/comments"
import junctionTable from "../controller/junction.table"
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
  .get("/users/products", users.GET_USERS_PRODUCTS)
  .get("/categories/products", product.GET_PRODUCTS_CATEGRY)
  .get("/subcategories/products", product.GET_PRODUCTS_SUBCATEGRY)
  .get("/products/status/recomended", product.GET_PRODUCTS_BY_STATUS_RECOMENDED)
  .get("/products/status/best", product.GET_PRODUCTS_BY_STATUS_BEST)
  .get("/product/:id", product.GET_PRODUCTS_BY_ID)
  .get("/products/users", product.GET_PRODUCTS_USERS)
  .get("/products/filter", product.GET_PRODUCTS_FILTER)
  .post("/user/register", validateMiddleware(validateRegister), users.REGISTER)
  .post("/user/login", validateMiddleware(validateLogin), users.LOGIN)
  .post("/category/create", category.POST)
  .post("/subcategory/create", validateMiddleware(validateSubCategory), subCategory.POST)
  .post("/subsubcategory/create", validateMiddleware(validateSubSubCategory), subSubCategory.POST)
  .post("/product/create", product.POST)
  .post("/comment/create", comments.POST)
  .post("/orders/create", junctionTable.POST)
  .put("/category/update/:id", category.PUT)
  .patch("/user/update", verifyToken, users.UPDATE)
  .patch("/subcategory/update/:id", subCategory.PATCH)
  .patch("/subsubcategory/update/:id", subSubCategory.PATCH)
  .patch("/product/update/:id", product.PATCH)
  .patch("/comment/update/:id", comments.PATCH)
  .delete("/category/delete/:id", category.DELETE)
  .delete("/subcategory/delete/:id", subCategory.DELETE)
  .delete("/subsubcategory/delete/:id", subSubCategory.DELETE)
  .delete("/product/delete/:id", product.DELETE)
  .delete("/comment/delete/:id", comments.DELETE)