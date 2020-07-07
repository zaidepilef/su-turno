import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { HorarioComponent } from './componentes/horario/horario.component';
import { FinalqrComponent } from './componentes/finalqr/finalqr.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavComponent } from './componentes/nav/nav.component';
import { HomeComponent } from './componentes/home/home.component';
import { AboutComponent } from './componentes/about/about.component';
import { PricingComponent } from './componentes/pricing/pricing.component';
import { FeaturesComponent } from './componentes/features/features.component';

import {JumpService} from './servicios/jump.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponent,
    HorarioComponent,
    FinalqrComponent,
    RegistroComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    PricingComponent,
    FeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [JumpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
