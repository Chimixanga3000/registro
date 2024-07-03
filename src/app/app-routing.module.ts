import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarRegistroComponent } from './pages/agregar-registro/agregar-registro.component';
import { EditarRegistroComponent } from './pages/editar-registro/editar-registro.component';
import { ListarRegistrosComponent } from './pages/listar-registros/listar-registros.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'agregar-registro'},
  {path:'agregar-registro',component:AgregarRegistroComponent},
  {path:'listar-registros',component:ListarRegistrosComponent},
  {path:'editar-registro/:id',component:EditarRegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
