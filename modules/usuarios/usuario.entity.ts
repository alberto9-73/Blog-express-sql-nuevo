
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcrypt'
import { Noticia } from '../noticias/noticia.entity';
import { iUsuario } from './usuario.interface';
//import { normalize } from 'path';

@Entity()
export class Usuario {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({unique:true})
	email: string;

	@Column()
	pass: string;

    @Column()
	nombre: string;

    @Column()
	apellido: string;

	@CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
	id_usuario: iUsuario;

	@OneToMany(() => Noticia, (n) => n.usuario)
	noticias: Noticia[];

	@BeforeInsert()
	async hashPassword(){
		this.pass= await bcrypt.hash(this.pass, 10)
	}
	@BeforeInsert()
		estandar(){
			this.email=this.email.toLocaleLowerCase()
		}
//agrego relacion a la entidad

   
	
}


