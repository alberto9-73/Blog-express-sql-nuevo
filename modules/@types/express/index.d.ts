import Request from 'express';
import { IUsuario, iUsuario } from '../../usuarios/usuario.interface';
declare global {
	namespace Express {
		export interface Request {
			usuario: iUsuario;
		}
	}
}