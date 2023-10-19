import express from 'express';
import {
	crearNoticia,
	//listarNoticia,
	obtenerNoticia,
	borrarNoticia,
	actulizarNoticia,
	listarNoticiaByUsuario,
	//mostrarNoticiaByTitulo,
} from './noticia.service';
import { verifyTokenMiddleware } from '../auth/auth.middleware';

const noticiasRoutes = express.Router();

// endpoint para crear una noticia
noticiasRoutes.post('/',verifyTokenMiddleware,crearNoticia);

// endpoint para consultar todas las noticias

//noticiasRoutes.get('/', listarNoticia);


// // [GET] endpoint obtener noticia por id /:id

noticiasRoutes.get('/', obtenerNoticia);

// // [DELETE] endpoint borrar
noticiasRoutes.delete('/:id', borrarNoticia);

// [PATCH] endpoint update
noticiasRoutes.patch('/:id', actulizarNoticia);

// /my noticies
noticiasRoutes.get('/my/all', verifyTokenMiddleware, listarNoticiaByUsuario);

//noticiasRoutes.get('/titulo/buscar', mostrarNoticiaByTitulo);


export default noticiasRoutes;