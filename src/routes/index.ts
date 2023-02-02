import { Router } from "express";
import category from "../controller/category";
import subCategory from "../controller/sub.category";
import subSubCategory from "../controller/sub.sub.category";
import users from "../controller/users";
import validateMiddleware from "../middleware/validate.middleware";
import { verifyToken } from "../middleware/verifyToken";
import { validateLogin, validateRegister, validateSubCategory, validateSubSubCategory } from "../validate/validate";

const router = Router()

export default router
  .get('/user/page', verifyToken, users.GET_USER)
  .post('/user/register', validateMiddleware(validateRegister), users.REGISTER)
  .post('/user/login', validateMiddleware(validateLogin), users.LOGIN)
  .post('/category/create', category.POST)
  .post('/subcategory/create', validateMiddleware(validateSubCategory), subCategory.POST)
  .post('/subsubcategory/create', validateMiddleware(validateSubSubCategory), subSubCategory.POST)
  .patch('/user/update', verifyToken, users.UPDATE)