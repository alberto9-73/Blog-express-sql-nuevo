import noticiasRoutes from './modules/noticias/noticia.routes';
import express, { Express } from 'express';
import bodyParser from 'body-parser'
import { dbcontext } from './modules/db/dbcontext';
import comentariosRoutes from './modules/comentarios/comentario.routes';
import { logMiddleware } from './modules/logger/middleware/logMiddleware';
import logger from './modules/logger/logger';
import { TypeORMError } from 'typeorm';
import dotenv from 'dotenv';
import { usuarioRoutes } from './modules/usuarios/usuario.routes';
import { Usuario } from './modules/usuarios/usuario.entity';
import { authRoutes } from './modules/auth/auth.routes';



process.env.TZ = 'America/Argentina/Buenos_Aires';
dotenv.config();
dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al iniciar la base de datos: ${err.message}`);
	});

const app: Express = express();
const PORT = process.env.BLOG_PORT;

// mi primer Middleware
// a nivel GLOBAL
app.use(logMiddleware);

app.use(bodyParser.json());

app.use('/noticia', noticiasRoutes);
app.use('/comentario', comentariosRoutes);
app.use('/usuario',usuarioRoutes)
app.use('/auth',authRoutes)
app.listen(PORT, () => {
	logger.info('Servidor funcionando OK 🚀 EN EL PORT ' + PORT);
});
