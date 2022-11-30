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
  }

  tituloTabla = ['#','Name','Episode','Air date','Total characters'];
  arrayEpisodios:any[] = [];
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
          this.arrayEpisodios.push(detallesEpisodio);
          this.paginasEnTotal = Math.ceil(this.arrayEpisodios.length/this.totalPorPagina);
          this.arregloPaginado = this.segmentarArreglo();
      });
    }
  }

  segmentarArreglo(){
    let array = [];

    for(let i=0;i<this.arrayEpisodios.length;i+=this.totalPorPagina){
      array.push(this.arrayEpisodios.slice(i,i+this.totalPorPagina));
    }
    return array;
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
