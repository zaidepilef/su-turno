import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JumpService } from 'src/app/servicios/jump.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  @Input() turnoInput: any;

  horarios: any = [];
  an_response: any = {};
  an_request: any = {};
  date: string = '';
  horarioForm: FormGroup;


  constructor(private route: ActivatedRoute, private jumpservice: JumpService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.horarioForm = this.formBuilder.group(
      {
        date: ['', [Validators.required]]
      }
    );

  }

  // toma el correo y lo envia al padre TurnoComponent, TurnoComponent busca el correo en el DB por si existe el cliente
  buscaHorariosDisponibles(value: string) {

    console.log('turnoInput : ', this.turnoInput);
    console.log('value : ', value);
    this.an_request = {
      daily_schedule_date: value,
      branch_office_id: this.turnoInput.branch.branch_id
    }

    console.log('an_request : ', this.an_request);

    this.jumpservice.getBranchSchedule(this.an_request).subscribe(
      res => {
        this.an_response = res;
        console.log('an_response : ',this.an_response);
        this.horarios = this.an_response.schedules;
        console.log('horarios : ',this.horarios);

      },
      err => console.warn('err : ', err)
    );


  }




}
