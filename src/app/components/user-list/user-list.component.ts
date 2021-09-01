import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios: any[] = [];

  constructor( 
    private users: UserService
  ) { 

  }

  ngOnInit(): void {
    this.users.getUsuarios()
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios;
      });
  }

}
