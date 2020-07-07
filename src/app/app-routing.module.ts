import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnoComponent } from './componentes/turno/turno.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { PricingComponent } from './componentes/pricing/pricing.component';
import { AboutComponent } from './componentes/about/about.component';
import { FeaturesComponent } from './componentes/features/features.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  { 
    path: 'turno/:link', component: TurnoComponent 
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
