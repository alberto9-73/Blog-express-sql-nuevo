import { iUsuario } from '../usuarios/usuario.interface';

export interface IjwtPayload {
	usuario: iUsuario;
}