import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res)=> {
    try{
        const { email, password} = req.body

        const user = await UserModel.findOne({email})
        if(!user)
            return res.status(401).json({message: "User NotExit"})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(401).json({message: "User Pasword wrong"})

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })

    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}