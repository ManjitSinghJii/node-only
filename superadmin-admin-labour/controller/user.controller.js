import UserModel from "../model/user.model.js";

export const createAdmin = async (req, res)=> {
    try{
        const { name, email, password} = req.body

        const exixts = await UserModel.findOne({email})
        if(exixts)
            return res.status(400).json({message: "Admin already Exits"})

        const admin = await UserModel.create({
            name,
            email,
            password,
            role: 'admin',
            createdBy: req.user._id
        })

        res.status(201).json(admin)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const getAdmin = async(req, res)=> {
    try{
        const admins = await UserModel.find({ role: 'admin'})
        .populate('createdBy', 'name email role')
        .select('-password')

        res.json(admins)
    }
    catch(err){
        res.status(500).json({ message: 'Server error'+ err.message })
    }
}