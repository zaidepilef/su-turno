import { Component, OnInit, ViewChild } from '@angular/core';
import { JumpService } from '../../servicios/jump.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Branch } from 'src/app/modelos/Branch';
import { RegistroComponent } from '../registro/registro.component';
import { HorarioComponent } from '../horario/horario.component';
import { FinalqrComponent } from '../finalqr/finalqr.component';
import { Turno } from './Turno.model';
import { from } from 'rxjs';
import { Registro } from '../registro/Registro.model';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  turno: Turno = {
    branchOffice: {},
    company: {},
    finalqr: {},
    horario: {},
    registro: {}
  };


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
  @ViewChild(FinalqrComponent) hijoFinalqr: FinalqrComponent;

  showRegistro: boolean;
  showHorario: boolean;
  showFinalqr: boolean;



  constructor(private router: Router, private route: ActivatedRoute, private jumpservice: JumpService) {

  }


  ngOnInit(): void {

    let link = this.route.snapshot.paramMap.get('link');
    console.log('link : ', link);
    this.getDataBranchOffice(link);

  }


  getDataBranchOffice(_val: string) {

    this.jumpservice.getBrachLink(_val).subscribe(
      res => {
        this.an_response = res;
        console.log('getBrachLink : ', this.an_response);

        if (this.an_response.branch == null) {
          this.router.navigate([''])
          return;
        } else {
          this.turno.branchOffice = this.an_response.branch;
          this.getDataCompany(this.turno.branchOffice.company_id);
          this.showRegistro = true;
          this.showHorario = false;
          this.showFinalqr = false;
        }

      },
      err => console.warn('err : ', err)
    );
  }

  getDataCompany(_val: string) {

    this.jumpservice.getCompany(_val).subscribe(
      res => {
        this.an_response = res;
        console.log('getCompany : ', this.an_response);

      },
      err => console.warn('err : ', err)
    );
  }


  /// recibo los datos del cliente del panatalla hijo RegistroComponent
  receiveRegistro(registro: Registro) {

    this.turno.registro = registro;

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
