const allowRoles = (roles = []) => {
    return (req, res, next)=>{
        if(!req.user)
            return res.status(401).json({message: "role not allowed"})

        if(!roles.includes(req.user.role))
            return res.status(403).json({ message: 'Access Denied role' })

        next()
    }
}

export default allowRoles