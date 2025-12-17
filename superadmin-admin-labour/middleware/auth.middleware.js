import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";

const authMiddleware = async (req, res, next)=> {
    try{
        const authHeader = req.headers.authorization

        if(!authHeader)
            return res.status(401).json({message: "No Token Provided"})

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findById(decoded.id).select('-password')
        if(!user)
            return res.status(401).json({ message: 'Unauthorized' })

        req.user = user
        next()
    }
    catch(err){
        res.status(401).json({ message: 'Invalid token' })
    }
}

export default authMiddleware