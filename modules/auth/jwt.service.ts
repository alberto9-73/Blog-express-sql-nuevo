import jwt from 'jsonwebtoken';
import logger from '../logger/logger';


const secret= process.env.SECRET_JWT || 'DefaultPassword'

export const generarTokenJWT = (payLoad: object): string=>{
    const token = jwt.sign(payLoad,secret,{expiresIn: '2h'})
    logger.debug(`${secret}`)
    return token
}