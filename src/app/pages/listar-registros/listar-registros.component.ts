import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrl: './listar-registros.component.css'
})
export class ListarRegistrosComponent implements OnInit {
  
  //propiedades
  registros: any = [];
  
  constructor(private registroService: RegistroService){
    this.getRegistros();
  }

  ngOnInit(): void {
    
  }

  //método para obtener a los empleados
  getRegistros(){
      this.registroService.getRegistros().subscribe((data) => {
        this.registros = data;
      })
  }

  //método para eliminar un empleado
  eliminarRegistro(registro, index){
    if(window.confirm('¿Está seguro de eliminar el registro?')){
      this.registroService.deleteRegistro(registro._id).subscribe((data) => {
        this.registros.splice(index, 1);
      })
    }
  }

}
