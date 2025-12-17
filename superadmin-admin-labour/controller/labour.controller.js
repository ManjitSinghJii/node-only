import UserModel from "../model/user.model.js"

export const createLabour = async (req, res)=> {
    try{
        const {name, email, password} = req.body

        const exits = await UserModel.findOne({email})
        if(exits)
            return res.status(400).json({ message: 'Labour already exists' })

        const labour = await UserModel.create({
            name,
            email,
            password,
            role: 'labour',
            createdBy: req.user._id
        })

        res.status(201).json(labour)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const getLabour = async (req, res)=> {
    try{
        let filter = {role: 'labour'}

        if(req.user.role === 'admin')
            filter.createdBy = req.user._id

        const labours = await UserModel.find(filter).select('-password')
        res.json(labours)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

// delete labour

export const deleteLabour = async (req, res)=> {
    try{
        const labour = await UserModel.findById(req.params.id)
        if(!labour || labour.role !== 'labour')
            return res.status(404).json({ message: 'Labour not found' })

        if(req.user.role === 'admin' && labour.createdBy.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Access denied' })

        await labour.deleteOne()
        res.json({ message: 'Labour deleted successfully' })

    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}