import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Noticia {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	titulo: string;

	@Column()
	contenido: string;

    @CreateDateColumn()
	create_at:Date


	@UpdateDateColumn()
	updated_at: Date;
}