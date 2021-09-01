import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

//  Rutas
import { ROUTES } from './app.routes';

// Servicios
import { UserService } from "./services/usuarios.service";

// Componentes
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { UserTableComponent } from './components/shared/user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserAddComponent,
    NavComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
