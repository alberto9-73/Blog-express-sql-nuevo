import {Request, Response} from 'express';
import { Usuario } from '../usuarios/usuario.entity';
import { dbcontext } from '../db/dbcontext';
import bcrypt from 'bcrypt';
import { Ilogin } from './auth.interface';
import logger from '../logger/logger';
import { generarTokenJWT } from '../auth/jwt.service';
import {IjwtPayload} from './jwt.interface';

export const login = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(Usuario);
		// primero busco al usuario
		let dataRequest: Ilogin = req.body;
		// pasar a min el email usuario
        
		const buscarUsuario = await usuarioRepository.findOneBy({
			email: dataRequest.email.toLocaleLowerCase()
		});

		if (!buscarUsuario) {
			throw new Error('Usuario/contraseña incorrecto');
		}
		// comparo las contreseñas
		const compararPass = await bcrypt.compare(
			dataRequest.pass,
			buscarUsuario.pass

		);
		if(!compararPass){
			throw new Error('Usuario/contraseña incorrecta')
		}

		const payload: IjwtPayload = {
			usuario: {
				id: buscarUsuario.id,
				nombre: buscarUsuario.nombre,
				apellido: buscarUsuario.apellido,
				email: buscarUsuario.email,
			},
		};
		const token= generarTokenJWT(payload)

		res.json({
			token:token,
		});
	} catch (error) {
		// implementar logging en modo ERROR
		
		logger.error(error)
		res.status(401).json({msg:'Usuario no autorizado'})
		
		
	}
}; 
