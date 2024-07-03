import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarRegistroComponent } from './pages/agregar-registro/agregar-registro.component';
import { EditarRegistroComponent } from './pages/editar-registro/editar-registro.component';
import { ListarRegistrosComponent } from './pages/listar-registros/listar-registros.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarRegistroComponent,
    EditarRegistroComponent,
    ListarRegistrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
