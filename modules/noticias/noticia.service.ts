import { Request, Response } from 'express';
import { iNoticia } from './noticia.interface';
import { Noticia } from './noticia.entity';
import { dbcontext } from '../db/dbcontext';
import logger from '../logger/logger';
import { ILike } from "typeorm"

export const crearNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const nuevaNoticia: iNoticia = req.body;
		// creamos la noticia sin guardar
		const noticia = await noticiaRepository.create({
			...nuevaNoticia,
			usuario: { id: req.usuario.id },
		});
		const result = await noticiaRepository.save(noticia);
		res.json({
			msg: `Se creo la noticia correctamente con el id: ${result.id}`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'No se pudo guardar la noticia' });
	}
};

/* export const listarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticias = await noticiaRepository.find();
		res.json({ data: noticias, cantidad: noticias.length });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'No se pudo obtener un listado de noticias' });
	}
}; */
// // obtener noticia por id
export const obtenerNoticia= async (req: Request, res: Response) => {
	try {
		const titulo=req.query.titulo?.toString();
		const contenido=req.query.contenido?.toString();
		const idNoticia=req.query.id?.toString();
		
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		
		const noticia = await noticiaRepository.find({
			where:  {
					titulo: ILike(`%${titulo || ''}%`),
					contenido: ILike(`%${contenido || ''}%`),
					id:idNoticia
				},
				relations: {
					comentarios: true,
				},
			},
			
		);
		
		if (!noticia) {
			throw new Error();
		}
		res.json({ noticia,cantidad: noticia.length});
	} catch (error) { 
		logger.error(
			`No se pudo obtener la noticia con id ${req.params.id} desde el ip ${req.ip} `
		);
		res.status(404).json({ msg: 'No se pudo encontrar la noticia' });
	}
};
// // eliminar noticia
export const borrarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticiaBorrar = await noticiaRepository.delete(req.params.id);
		if (!noticiaBorrar.affected) {
			throw new Error('no se afectaron columnas');
		}
		logger.info(`el ip ${req.ip} borro la noticia ${req.params.id}`);
		res.json({ msg: 'Noticia borrada correctamente.' });
	} catch (error) {
		console.error(error);
		res.status(404).json({ msg: 'No se pudo borrar la noticia' });
	}
};
// put update
export const actulizarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const idNoticia = req.params.id;
		const updateNoticia: iNoticia = req.body;
		const result = await noticiaRepository.update(idNoticia, updateNoticia);
		if (!result.affected) {
			throw new Error('No se puedo actualizar la noticia');
		}
		res.json({ msg: 'Noticia actualizada correctamente!!' });
	} catch (error) {
		console.log(error);
		res.status(404).json({ msg: 'No se puedo actualizar la noticia' });
	}
};

export const listarNoticiaByUsuario = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = await dbcontext.getRepository(Noticia);
		const noticias = await noticiaRepository.find({
			where: { usuario: { id: req.usuario.id } },
			order: {create_at: 'DESC'},
		});

		res.json({ data: noticias, cantidad: noticias.length });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'No se pudo obtener un listado de noticias' });
	}
};

// export const mostrarNoticiaByTitulo = async (req: Request, res: Response) => {
// 	try {
// 		const noticiaRepository = await dbcontext.getRepository(Noticia)
// 		const titulo= req.query.titulo
// 		logger.debug(titulo)
// 		const noticias = await noticiaRepository.find({
// 			where: { titulo: Like (`%${titulo}%`) },
// 			order:{create_at: 'ASC'}
			
// 		});
// 		res.json({ data: noticias, cantidad: noticias.length });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ msg: 'No se pudo obtener un listado de noticias' });
// 	}
// };









// export const obtenerNoticiaId = (req: Request, res: Response) => {
// 	try {
// 		const noticia = noticiaDB.find((n) => n.id === req.params.id);
// 		if (!noticia) {
// 			throw new Error();
// 		}
// 		res.json(noticia);
// 	} catch (error) {
// 		res.status(404).json({ msg: 'No se pudo encontrar la noticia' });
// 	}
// };

// // eliminar noticia
// export const borrarNoticia = (req: Request, res: Response) => {
// 	const idDelete = req.params.id;

// 	const indexToDelete = noticiaDB.findIndex(
// 		(noticia) => noticia.id === idDelete
// 	);

// 	if (indexToDelete === -1) {
// 		res.status(404).json({ msg: 'Noticia no encontrada' });
// 	} else {
// 		noticiaDB.splice(indexToDelete, 1);
// 		res.status(200).json({ msg: 'Noticia eliminada' });
// 	}
// };