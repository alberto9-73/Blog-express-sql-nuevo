
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcrypt'

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

	@BeforeInsert()
	async hashPassword(){
		this.pass= await bcrypt .hash(this.pass, 10)
	}
}


