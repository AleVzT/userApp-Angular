import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { UsuarioModel } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  updateUser = false;
  forma: FormGroup;
  userId: string;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,    
    private route: Router,
    ) {
    this.creandoFormulario();
    this.userId = this.ActivatedRoute.snapshot.paramMap.get('id')
    if ( this.userId ){
      this.updateUser = true;
      this.cargarData();
    }


  }

  ngOnInit(): void {

  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  
  get cedulaNoValido() {
    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched
  }
  
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get telefonoNoValido() {
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched
  }

  creandoFormulario() {

    /* Si  updateUser es true, se debe completar los datos del formulariio*/
    this.forma = this.fb.group({
      nombre:   [ '', Validators.required ],
      apellido: [ '', Validators.required ],
      cedula:   [ '', Validators.required ],
      correo:   [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: [ '', Validators.required ]
    });
  }

  cargarData() {
    this.user.getUsuario( this.userId )
      .subscribe( (resp: UsuarioModel) => {
        const usuario = resp;
        this.forma.setValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          cedula: usuario.cedula,
          correo: usuario.correo,
          telefono: usuario.telefono,
        });
      })
  }

  guardar() {
    if( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  
    
    if (this.userId) {
      const data = {
        ...this.forma.value,
        id: this.userId
      }
      this.updateService(data);
    } else {
      this.saveService(this.forma.value);
    }
  }

  saveService(data) {
    this.user.crearUsuario(data)
      .subscribe( res => {
        Swal.fire({
            title: 'Usuario creado con exito!', 
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          })
        this.route.navigate(['/home']);
      },
      err => {
        console.error(err);
        Swal.fire({
          title: 'Error, correo y/o cedula ya estan registrados!', 
          icon: 'warning',
          showConfirmButton: true,
        })
      }
    );
  }

  updateService(data) {
    this.user.updateUsuario(data)
      .subscribe( res => {
        Swal.fire({
            title: 'Usuario actualizado!', 
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
          })
        
        this.route.navigate(['/home']);
      },
      err => {
        console.error(err);
        Swal.fire({
          title: 'Error, correo y/o cedula ya estan registrados!', 
          icon: 'warning',
          showConfirmButton: true,
        })
      }
    );
      
  }
}
