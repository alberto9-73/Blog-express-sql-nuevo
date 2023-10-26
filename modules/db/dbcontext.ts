import { DataSource } from "typeorm";
import dotenv from 'dotenv'

dotenv.config()

export const dbcontext = new DataSource({
	type: 'mariadb',
	logging:false,
	synchronize:false,
	host:'127.0.0.1',
	port:3306,
	username:'root',
	password:'123456',
	database:  'blog',
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});



// host - Database host.

// port - Database host port. Default mysql port is 3306.

// username - Database username.

// password - Database password.

// database - Database name.




// export const dbcontext = new DataSource({
// 	type: 'sqlite',
// 	logging:false,
// 	synchronize: Boolean(process.env.BLOG_DB_SYNCHRONIZE)||true,
// 	database: String(process.env.BLOG_DB_DATABASE) ?? './blog.db',
// 	entities: [__dirname + '/../**/*.entity.{js,ts}'],
// });








