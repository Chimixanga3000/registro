import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Registro } from '../../models/registro';
import { RegistroService } from '../../services/registro.service';


@Component({
  selector: 'app-editar-registro',
  templateUrl: './editar-registro.component.html',
  styleUrl: './editar-registro.component.css'
})
export class EditarRegistroComponent implements OnInit {

  //propiedades
  editarRegistroForm: FormGroup;
  enviado = false;
  registroHamburguesa: any = [
    'Big Mac', 'Cuarto de Libra', 'Cuarto de Libra Doble', 'BBQ Crispy Onion','BBQ Crispy Onion Doble', 'CBO', 'CBO Doble', 'Club House', 'Club House Dpble','Queso de antojo', 'Doble Queso de Antojo', 'Triple Queso de Antojo', 'Hamburguesa Lechuga Tomate',
    'Gourmet de antojo', 'Doble Gourmet de Antojo', 'Triple Gourmet de Antojo', 'BBQ de antojo', 'Doble BBQ de Antojo', 'Triple BBQ de Antojo', 'Mc Tocino', 'Beacon Deluxe Doble', 'Beacon Deluxe Triple', 'BBQ Tasty Doble', 'BBQ Tasty Triple',
    'Mc Pollo', 'Crispy Classic', 'Crispy Spicy', 'Crispy Deluxe', 'Crispy Deluxe CBO', 'Nuggets 4' ,'Nuggets 6', 'Nuggets 10', 'Nuggets 20', 'Desayuno Deluxe', 'Desayuno Especial Mexicano',
    'Desayuno Especial', 'Mc Burrito', 'Hotcakes con Salchicha', 'Mc Muffin Huevo Salchicha', 'Mc Muffin Huevo Doble Salchica', 'Mc Muffin a la Mexicana', 'Mc Muffin Huevo Tocino',
    'Hotcakes', 'Mc Muffin con Huevo Revuelto', 'Molletes'
  ];
  registroPapa: any = [
    'Fritas', 'HashBrown'
  ];
  registroBebida: any = [
    'Coca-Cola', 'Coca-Cola s/Azucar', 'Sprite', 'Fanta', 'Sidral  Mundet', 'Café', 'Agua'
  ];
  registroGerente: any = [
    'Diana', 'Uriel', 'Oscar'
  ];
  registroData : Registro[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private registroService: RegistroService,
    private actRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getRegistro(id);
    this.editarRegistroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      hamburguesa: ['', [Validators.required]],
      papa: ['', [Validators.required]],
      bebida: ['', [Validators.required]],
      gerente: ['', [Validators.required]],
      salida: ['', [Validators.required]],
      regreso: ['', [Validators.required]]  
    });
  }


  //método para crear el formulario
  mainForm(){
    this.editarRegistroForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      hamburguesa: ['', [Validators.required]],
      papa: ['', [Validators.required]],
      bebida: ['', [Validators.required]],
      gerente: ['', [Validators.required]],
      salida: ['', [Validators.required]],
      regreso: ['', [Validators.required]]
    });
  }


  //método para asignar el departamento selccionado por el usuario
  actualizarHamburguesa(d) {
    this.editarRegistroForm.get('hamburguesa').setValue(d, {
      onlySelf: true
    });
  }

  actualizarPapa(d) {
    this.editarRegistroForm.get('papa').setValue(d, {
      onlySelf: true
    });
  }

  actualizarBebida(d) {
    this.editarRegistroForm.get('bebida').setValue(d, {
      onlySelf: true
    });
  }

  actualizarGerente(d) {
    this.editarRegistroForm.get('gerente').setValue(d, {
      onlySelf: true
    });
  }

  actualizarSalida(d) {
    this.editarRegistroForm.get('salida').setValue(d, {
      onlySelf: true
    });
  }

  actualizarRegreso(d) {
    this.editarRegistroForm.get('regreso').setValue(d, {
      onlySelf: true
    });
  }



  //getter para acceder a los controles del fomrulario
  get myForm() {
    return this.editarRegistroForm.controls;
  }


  //método para buscar al registro que vamos a modificar
  getRegistro(id){
    this.registroService.getRegistro(id).subscribe((data) => {
      this.editarRegistroForm.setValue({
        nombre: data['nombre'],
        hamburguesa: data['hamburguesa'],
        papa: data['papa'],
        bebida: data['bebida'],
        gerente: data['gerente'],
        salida: data['salida'],
        regreso: data['regreso'],
      });
    });
  }

  //método para enviar el formulario
  onSubmit() {
    this.enviado = true;
    if(!this.editarRegistroForm.valid) {
      return false;
    } else {
      if(window.confirm('¿Estas seguro que lo deseas modificar?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.registroService.updateRegistro(id,this.editarRegistroForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/listar-registros');
            console.log('Se actualizo correctamente');
          },error: (e) => {
            console.log(e);
          }
        });
      }
    }
  }
}

