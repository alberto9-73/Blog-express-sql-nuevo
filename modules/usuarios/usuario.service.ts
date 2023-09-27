import { Request, Response } from 'express';
import { Usuario } from './usuario.entity';
import { iUsuario } from './usuario.interface';
import { dbcontext } from '../db/dbcontext';
import logger from '../logger/logger';
 
export const crearUsuario = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(Usuario);
		let usuarioData: iUsuario= req.body;
       // usuarioData.email=usuarioData.email.toLowerCase();

		const usuario = await usuarioRepository.create(usuarioData);
		const guardarUsuario = await usuarioRepository.save(usuario);
		res.json({
			msg: `Se creo el usuario correctamente con el id: ${guardarUsuario.id}`,
		});
	} catch (error) {
		
        logger.error(`Fallo al  crear el usuario ${error}`)
		res.status(500).json({ msg: 'No se pudo crear el usuario' });
	}};

