import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-agregar-registro',
  templateUrl: './agregar-registro.component.html',
  styleUrl: './agregar-registro.component.css'
})
export class AgregarRegistroComponent {

  //propiedades
  registroForm: FormGroup;
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

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private registroService: RegistroService
  ){
    this.mainForm();
  }

  ngOnInit(): void {
    
  }


  //método para crear el formulario
  mainForm(){
    this.registroForm = this.formBuilder.group({
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
    this.registroForm.get('hamburguesa').setValue(d, {
      onlySelf: true
    });
  }

  actualizarPapa(d) {
    this.registroForm.get('papa').setValue(d, {
      onlySelf: true
    });
  }

  actualizarBebida(d) {
    this.registroForm.get('bebida').setValue(d, {
      onlySelf: true
    });
  }

  actualizarGerente(d) {
    this.registroForm.get('gerente').setValue(d, {
      onlySelf: true
    });
  }



  //método para acceder a los controles del fomrulario
  get myForm() {
    return this.registroForm.controls;
  }


  //método para enviar el formulario
  onSubmit() {
    this.enviado = true;
    if(!this.registroForm.valid) {
      return false;
    } else {
      return this.registroService.agregarRegistro(this.registroForm.value)
      .subscribe({
        complete: () => {
          console.log('Registro agregado correctamente')
          this.ngZone.run(() => this.router.navigateByUrl('/listar-registros'));
        }, error: (e) => {
          console.log(e);
        }
      }); 
    }
  }
}
