import jwt from 'jsonwebtoken';
import { IjwtPayload } from './jwt.interface';

const secret = process.env.SECRET_JWT || 'DefaultPassword';

export const generarTokenJWT = (payload: IjwtPayload): string => {
	const token = jwt.sign(payload, secret, { expiresIn: '2h' });
	return token;
};
