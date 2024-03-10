import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req:Request, res:Response , next:NextFunction)=>{

    const headerToken = req.headers['authorization']
    
    //tiene token
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        
        //es valido el token
        try {
            const bearerToken = headerToken.slice(7);
            //console.log(process.env.SECRET_KEY)
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'secreto' );
            next();

        } catch (error) {
            
            res.status(401).json({
                
                msg1:'entre por el catch',
                msg: 'Usuario no Autorizado'
            })
        }    
        
    }else {
        res.status(401).json({
            msg1: 'entre por el Else',
            msg: 'Usuario no Autorizado'
        })

    }


}