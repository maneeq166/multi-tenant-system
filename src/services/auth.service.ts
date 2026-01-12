import {prisma} from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const registerService = async (email:string,password:string)=>{
    if(!email||!password){
        return {
            message:"Required fields are missing",
            statusCode:400,
            data:null
        }
    }

    const emailExists = await prisma.user.findUnique({where:{email}});
    
    if(emailExists){
        return {
            message:"Email already exists",
            statusCode:400,
            data:null
        }
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({data:{email,password:hashPassword}});

    return {
        data:user.email,
        message:"User created",
        statusCode:201
    }
}

export const loginService = async (email:string,password:string)=>{
    if(!email||!password){
        return {
            message:"Required fields are missing",
            statusCode:400,
            data:null
        }
    }
    const user = await prisma.user.findUnique({where:{email}});

    if(!user){
        return {
            data:null,
            message:"User not found",
            statusCode:404
        }
    }

    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
        return {
            data:null,
            message:"Wrong password",
            statusCode:400
        }
    }

    return {
        data:jwt.sign({id:user.id,email:user.email}),
        message:"Logged in",
        statusCode:200
    }
}