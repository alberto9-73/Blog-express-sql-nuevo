import { DataSource } from "typeorm";
import dotenv from 'dotenv'

dotenv.config()

export const dbcontext = new DataSource({
	type: 'sqlite',
	logging:false,
	synchronize: Boolean(process.env.BLOG_DB_SYNCHRONIZE)||true,
	database: String(process.env.BLOG_DB_DATABASE) ?? './blog.db',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
