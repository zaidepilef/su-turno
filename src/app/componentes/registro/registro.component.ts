import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { JumpService } from 'src/app/servicios/jump.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // salidas al padre
  @Output() clientToSend = new EventEmitter<any>();

  registroValido: any;
  email: string = "";
  name: string = "";
  lastname: string = "";

  phone: string = "";

  registroForm: FormGroup;
  an_response: any = {};

  constructor(private formBuilder: FormBuilder, private jumpservice: JumpService) { }

  get email_feed() { return this.registroForm.get('email'); }
  get name_feed() { return this.registroForm.get('name'); }
  get lastname_feed() { return this.registroForm.get('lastname'); }
  get phone_feed() { return this.registroForm.get('phone'); }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32)]],
        lastname: ['', [Validators.pattern(/^[a-zA-Z ]+$/), Validators.required, Validators.maxLength(32)]],
        phone: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.maxLength(12)]]
      }
    );
  }

  // toma el correo y lo envia al padre TurnoComponent, TurnoComponent busca el correo en el DB por si existe el cliente
  verificaEmail(value: string) {

    this.email = value;
    this.jumpservice.getClientByEmail(this.email).subscribe(
      res => {
        this.an_response = res;
        console.log('an_response : ', this.an_response);
        //this.enviarDatosCliente(res);
        if (this.an_response.status == "OK") {

          if (this.an_response.client !== null) {
            this.email = this.an_response.client.client_email;
            this.name = this.an_response.client.client_name;
            this.lastname = this.an_response.client.client_lastname;
            this.phone = this.an_response.client.client_phone;
            this.registroValido.nuevo = false;
          } else {
            this.registroValido.nuevo = true;
          }

        }

      },
      err => console.warn('err : ', err)
    );
    if (this.email.length > 7) {


    }

  }


  onSubmit() {
    // una vez validado el formulario dispongo aenviar el resultado a la siguiente componente
    this.registroValido.registroFrom = this.registroForm.value;

    console.log('registroFrom : ', this.registroValido.registroFrom);
    
    if (this.registroValido.nuevo) {
      this.jumpservice.saveClients(this.registroValido.registroFrom).subscribe(
        res => {
          console.log('saveClients : ', res);
        },
        err => console.warn('err : ', err)
      );
    }

    this.clientToSend.emit(this.registroValido)
    /*
    // stop here if form is invalid
    if (this.registroForm.invalid) {
      console.log('registroForm.invalid', this.registroForm);
      return;
    }
    */

  }

}
