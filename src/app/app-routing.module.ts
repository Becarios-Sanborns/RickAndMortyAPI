import { Component, NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { EpisodiosComponentComponent } from './components/episodios-component/episodios-component.component';
import { ListaComponent } from './components/lista/lista.component';
import { UbicacionComponentComponent } from './components/ubicacion-component/ubicacion-component.component';

const routes:Routes = [
    {path: 'main', component: ListaComponent}, //Rutas
    {path: 'ubicacion', component: UbicacionComponentComponent},
    {path: 'episodios', component: EpisodiosComponentComponent},
    {path: '', component: ListaComponent}
   // {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}

