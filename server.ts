import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import noticiasRoutes from './modules/noticias/noticia.routes';
import { dbcontext } from './modules/db/dbcontext';

dbcontext
	.initialize()
	.then(() => {
		console.log('Base datos OK');
	})
	.catch((err) => {
		console.error('Base datos DOWN', err);
	});

const app: Express = express();

app.use(bodyParser.json());

app.use('/noticia', noticiasRoutes);

app.listen(3000, () => {
	console.log('Servidor funcionando OK 🚀 EN EL PORT 3000');
});