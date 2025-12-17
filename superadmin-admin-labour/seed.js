import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB)

import UserModel from './model/user.model.js'

const createSuperAdmin = async ()=> {
    try{
        const exit = await UserModel.findOne({role: 'superadmin'})
        if(exit)
        {
            console.log("Super Admin All ready exit")
            process.exit()
        }
        await UserModel.create({
            name: "Super Admin",
            email: process.env.SUPERADMIN_EMAIL,
            password: process.env.SUPERADMIN_PASSWORD,
            role: 'superadmin'
        })
        
        console.log("Super Admin Created")
        process.exit()
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
console.log("helo seed")
createSuperAdmin()
console.log("end seed")