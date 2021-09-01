import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() usuarios: any = {};

  constructor(
    private route: Router,
    private user: UserService,
  ) { }

  ngOnInit(): void {
  }

  userUpdate({id}) {
    Swal.fire({
      title: '¿Desea editar el usuario seleccionado?',
      confirmButtonText: `Aceptar`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/updateUser', id ]);        
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Operación cancelada!', 
          icon: 'info',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  userDelete({id}) {
    Swal.fire({
      title: '¿Desea eliminar el usuario seleccionado?',
      confirmButtonText: `Aceptar`,
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {
        this.user.deleteUsuario(id)
          .subscribe( resp => {
            console.log('Usuario borrado! ');
            Swal.fire({
              title: 'Usuario borrado!', 
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
          });
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Operación cancelada!', 
          icon: 'info',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
