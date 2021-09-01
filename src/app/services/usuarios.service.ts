import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    private url =  'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) {
    this.getUsuarios();
  } 

  /* Consultar todos los usuarios */
  getUsuarios() {
    return this.http.get(`${ this.url }/usuarios`);
  }

  // Consultar un usuario por id
  getUsuario( id: string ) {
    return this.http.get(`${ this.url }/usuarios/${id}`);
  }

  //  Eliminar un usuario
  deleteUsuario( id: string ) {
    return this.http.delete(`${ this.url }/usuarios/${ id }`);
  }

  //  Editar un usuario
  updateUsuario( user: UsuarioModel ) {
    return this.http.put(`${ this.url }/usuarios/${ user.id }`, user);
  }

  crearUsuario( user: UsuarioModel ) {
    return this.http.post(`${ this.url }/usuarios`, user);
  }  

}