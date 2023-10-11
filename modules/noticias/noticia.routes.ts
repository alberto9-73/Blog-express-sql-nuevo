import express from 'express';
import {
	crearNoticia,
	listarNoticia,
	obtenerNoticiaId,
	borrarNoticia,
	actulizarNoticia,
	listarNoticiaByUsuario,
} from './noticia.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

const noticiasRoutes = express.Router();

// endpoint para crear una noticia
noticiasRoutes.post('/',verifyTokenMiddleware,crearNoticia);

// endpoint para consultar todas las noticias

noticiasRoutes.get('/', listarNoticia);


// // [GET] endpoint obtener noticia por id /:id

noticiasRoutes.get('/:id', obtenerNoticiaId);

// // [DELETE] endpoint borrar
noticiasRoutes.delete('/:id', borrarNoticia);

// [PATCH] endpoint update
noticiasRoutes.patch('/:id', actulizarNoticia);

// /my noticies
noticiasRoutes.get('/my/all', verifyTokenMiddleware, listarNoticiaByUsuario)

export default noticiasRoutes;