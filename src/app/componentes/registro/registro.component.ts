import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { JumpService } from 'src/app/servicios/jump.service';
import { Registro } from './Registro.model'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // salidas al padre
  @Output() registroOuput = new EventEmitter<Registro>();

  @Input() turnoInput: any;

  registro: Registro = {
    email: "",
    id: 0,
    lastname: "",
    name: "",
    new: false,
    phone: "",
    rut: "",
    registroForm: {},
  };

  client_id: string = "";
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
        phone: ['', [Validators.pattern(/^[0-9]+$/), Validators.required, Validators.maxLength(11)]]
      }
    );

  }

  // Existe CLiente se auto completa el formulario
  verificaEmail(_val: string) {

    this.email = _val;

    this.jumpservice.getClientByEmail(this.email).subscribe(
      res => {
        this.an_response = res;

        if (this.an_response.status == "OK") {

          if (this.an_response.client !== null) {
            this.registro.id = this.an_response.client.client_id;
            this.registro.email = this.an_response.client.client_email;
            this.registro.name = this.an_response.client.client_name;
            this.registro.lastname = this.an_response.client.client_lastname;
            this.registro.phone = this.an_response.client.client_phone;
            this.registro.rut = this.an_response.client.rut;
            this.registro.new = false;
          } else {
            this.registro.new = true;
          }
        }
      },
      err => console.warn('err : ', err)
    );
  }

  saveRegistro() {

    if (this.registro.new) {

      this.jumpservice.saveClients(this.registro).subscribe(
        res => {
          console.log('saveClients : ', res);
        },
        err => console.warn('err : ', err)
      );

    } else {

      this.jumpservice.updateClient(this.registro.id, this.registro).subscribe(
        res => {
          console.log('updateClient : ', res);
        },
        err => console.warn('err : ', err)
      );

    }

  }

  onSubmit() {

    if (!this.registroForm.invalid) {

      this.registro.registroForm = this.registroForm.value;
      this.registro.name = this.registro.registroForm.name;
      this.registro.lastname = this.registro.registroForm.lastname;
      this.registro.email = this.registro.registroForm.email;
      this.registro.phone = this.registro.registroForm.phone;
      this.saveRegistro();

      this.registroOuput.emit(this.registro);
    }






  }

}
