import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";
import { createLabour, deleteLabour, getLabour } from "../controller/labour.controller.js";
const LabourRouter = Router()

LabourRouter.post('/', authMiddleware, allowRoles(['admin', 'superadmin']), createLabour)
LabourRouter.get('/', authMiddleware, allowRoles(['admin', 'superadmin']), getLabour)
LabourRouter.delete('/:id', authMiddleware, allowRoles(['admin', 'superadmin']), deleteLabour)

export default LabourRouter