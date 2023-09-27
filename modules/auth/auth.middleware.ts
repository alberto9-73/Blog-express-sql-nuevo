import { NextFunction,Request,Response } from "express";


export const verifyTokenMiddleware=(
req:Request,
res:Response,
next:NextFunction

)=>{
    const token= req.headers['autorization']
    if(!token){ 
        return res.status(403).json({msg:'Tooken no enviado'})
    }

   

next()}