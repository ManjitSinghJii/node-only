import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";
import { createAdmin, getAdmin } from "../controller/user.controller.js";

const AdminRouter = Router()

AdminRouter.post('/', authMiddleware, allowRoles(['superadmin']), createAdmin)
AdminRouter.get('/', authMiddleware, allowRoles(['superadmin']), getAdmin)

export default AdminRouter