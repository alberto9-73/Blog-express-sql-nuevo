import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Comentario } from '../comentarios/comentario.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity()
export class Noticia {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	titulo: string;

	@Column()
	contenido: string;

	@CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => Comentario, (c) => c.noticia)
	comentarios: Comentario[];

	// relacionar con la entidad usuario (many to one)
	
	@ManyToOne (() => Usuario, (u) => u.noticias, {nullable:false})
	usuario:Usuario


}



