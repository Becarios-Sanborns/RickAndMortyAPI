import { Component, OnInit } from '@angular/core';
import { RickMortyService } from 'src/app/services/RickMorty.service';

@Component({
  selector: 'app-episodios-component',
  templateUrl: './episodios-component.component.html',
  styleUrls: ['./episodios-component.component.css']
})
export class EpisodiosComponentComponent implements OnInit {

  constructor(private servicio:RickMortyService) { }

  ngOnInit(): void {
    this.getEpisodiosAPI();
    this.filtrarEpisodios();
  }

  tituloTabla = ['#','Name','Episode','Air date','Total characters'];
  episodios:any[] = [];
  arregloPaginado:any[] = [];

  paginaActual = 1;
  totalPorPagina = 5;
  paginasEnTotal = 0;

  getEpisodiosAPI(){
    let detallesEpisodio;
    for(let i=1;i<=50;i++){      
      this.servicio.getEpisodios(i).subscribe(response =>{
        detallesEpisodio = {
          id: i,
          name: response.name,
          episode: response.episode,
          airDate: response.air_date,
          personajes: response.characters.length
        }
          this.episodios.push(detallesEpisodio);
          this.paginasEnTotal = Math.ceil(this.episodios.length/this.totalPorPagina);
          this.arregloPaginado = this.servicio.dividirArreglo(this.episodios);
      });
    }
  }

  filtrarEpisodios(){
    this.servicio.textoObservable.subscribe(res =>{
      console.log("texto",res);
      this.arregloPaginado = this.servicio.filtrarPorTexto(this.episodios,res);
    });
  }

   /*================================================*/
   inicioPagina(){
    console.log("Inicio");
    this.paginaActual = 1;
  }

  anteriorPagina(){
    console.log("Anterior");
    if(this.paginaActual > 1){
      this.paginaActual--;
    }
  }

  siguientePagina(){
    console.log("Siguiente");
    if(this.paginaActual < this.paginasEnTotal){
      this.paginaActual++;
    }
  }

  ultimaPagina(){
    console.log("Ultima");
    this.paginaActual = this.paginasEnTotal;
  }

}
