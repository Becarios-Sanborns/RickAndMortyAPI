import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaComponent } from './components/lista/lista.component';
import { HttpClientModule } from '@angular/common/http';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { AppRoutingModule } from './app-routing.module';
import { UbicacionComponentComponent } from './components/ubicacion-component/ubicacion-component.component';
import { EpisodiosComponentComponent } from './components/episodios-component/episodios-component.component';
import { CardPersonajeComponent } from './components/card-personaje/card-personaje.component';
import { CardEpisodioComponent } from './components/card-episodio/card-episodio.component';
import { CardUbicacionComponent } from './components/card-ubicacion/card-ubicacion.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ListaComponent,
    BuscadorComponent,
    UbicacionComponentComponent,
    EpisodiosComponentComponent,
    CardPersonajeComponent,
    CardEpisodioComponent,
    CardUbicacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
