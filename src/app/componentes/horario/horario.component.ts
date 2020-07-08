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
  hour: string = '';
  horarioForm: FormGroup;


  constructor(private route: ActivatedRoute, private jumpservice: JumpService, private formBuilder: FormBuilder) { }

  get date_feed() { return this.horarioForm.get('date'); }
  get hour_feed() { return this.horarioForm.get('hour'); }


  ngOnInit(): void {
    this.horarioForm = this.formBuilder.group(
      {
        date: ['', [Validators.required]],
        hour: ['', [Validators.required]]
      }
    );

  }

  // toma el correo y lo envia al padre TurnoComponent, TurnoComponent busca el correo en el DB por si existe el cliente
  buscaHorariosDisponibles(value: string) {

    this.an_request = {
      daily_schedule_date: value,
      branch_office_id: this.turnoInput.branch.branch_id
    }

    console.log('this.an_request: ', this.an_request);

    this.jumpservice.getBranchSchedule(this.an_request).subscribe(
      res => {
        this.an_response = res;
        console.log('this.an_response: ', this.an_response.schedules.length);

        if (this.an_response.status == "OK") {
          if (this.an_response.schedules.length > 0) {
            this.horarios = this.an_response.schedules;
          }

        }
      },
      err => console.warn('err : ', err)
    );


  }


  onSubmit(){
    
  }

}
