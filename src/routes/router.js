import { Router } from "express";
import { loginController } from "../controllers/login.js";
import { registerController } from "../controllers/register.js";

import {rate_limit} from "../middlewares/rate_limit.js" // limita requisiçoes
import {verify} from "../middlewares/JWT_verify.js" // autentificação de token

const route = Router()

route.put('/login', rate_limit, loginController),
route.put('/register',rate_limit,registerController)

export default route