import express from 'express';
import {
	crearNoticia,
	listarNoticia,
	obtenerNoticiaId,
	borrarNoticia,
	actulizarNoticia,
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
export default noticiasRoutes;