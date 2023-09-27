import {Request, Response} from 'express';
import { Usuario } from '../usuarios/usuario.entity';
import { dbcontext } from '../db/dbcontext';
import bcrypt from 'bcrypt';
import { Ilogin } from './auth.interface';

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

		res.json({
			msg: `El resultado del login fue : ${compararPass}`,
		});
	} catch (error) {
		// implementar logging en modo ERROR
		res.json({msg:'Usuario/contraseña incorrecto'})
		throw new Error('Usuario/contraseña incorrecto');
		
	}
}; 
