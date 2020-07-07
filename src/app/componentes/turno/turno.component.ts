import { Component, OnInit, ViewChild } from '@angular/core';
import { JumpService } from '../../servicios/jump.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'src/app/modelos/Branch';
import { RegistroComponent } from '../registro/registro.component';
import { HorarioComponent } from '../horario/horario.component';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  turno: any = {};


  _branchs: any = [];

  _branch: any = {
    branch_id: 0,
    branch_name: "",
    company_id: 0,
    branch_adress_1: "",
    branch_adress_2: "",
    comuna_id: 0,
    name_link: "",
    url_location_map: ""
  };
  an_response: any = {

  }

  //mis hijos
  @ViewChild(RegistroComponent) hijoRegistro: RegistroComponent;
  @ViewChild(RegistroComponent) hijoHorario: HorarioComponent;

  showRegistro: boolean;
  showHorario: boolean;


  // Branch:Branch
  constructor(private router: Router, private route: ActivatedRoute, private jumpservice: JumpService) {
    this.showRegistro = true;
    this.showHorario = true;
  }


  ngOnInit(): void {

    let link = this.route.snapshot.paramMap.get('link');

    this.jumpservice.getBrachLink(link).subscribe(
      res => {
        this.an_response = res;
        console.log('an_response : ', this.an_response);

        if (this.an_response.branch == null) {
          this.router.navigate([''])
          return;
        } else {
         
          this.showRegistro = true;
          this.showHorario = false;
        }

      },
      err => console.warn('err : ', err)
    );

  }



  /// recibo los datos del cliente del panatalla hijo RegistroComponent
  receiveClientToSend(cliente: any) {
    this.showRegistro = false;
    this.showHorario = true;
    console.log('an_response', this.an_response);
    console.log('receiveClientToSend', cliente);

    this.turno.cliente = cliente;
    this.turno.horario = {};
    this.turno.branch = this.an_response.branch;

    //debo mandarseos al this.hijoHorario
    //this.hijoHorario.llenaFormularioHorario(this.turno);
  }





  //OTROS AUXILIARES
  getComunas() {
    this.jumpservice.getComunas().subscribe(
      res => {
        console.log('res comunas: ', res);
      },
      err => console.warn('err : ', err)
    );
  }

  getRegiones() {
    this.jumpservice.getRegiones().subscribe(
      res => {
        console.log('res regiones: ', res);
      },
      err => console.warn('err : ', err)
    );
  }

  getSucursales() {
    this.jumpservice.getBrachs().subscribe(
      res => {
        this.an_response = res;
        this._branchs = this.an_response.branchs;
      },
      err => console.warn('err : ', err)
    );
  }

}
