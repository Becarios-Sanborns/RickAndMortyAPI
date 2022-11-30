import { Component, OnInit } from '@angular/core';
import { RickMortyService } from 'src/app/services/RickMorty.service';

@Component({
  selector: 'app-ubicacion-component',
  templateUrl: './ubicacion-component.component.html',
  styleUrls: ['./ubicacion-component.component.css']
})
export class UbicacionComponentComponent implements OnInit {

  constructor(private servicio: RickMortyService) { }

  ngOnInit(): void {
    this.getUbicacionesAPI();
  }

  titulosTabla = ['#','Name','Type','Created'];
  arrayUbicaciones:any[] = [];
  arregloPaginado:any[] = [];

  paginaActual = 1;
  totalPorPagina = 5;
  paginasEnTotal = 0;

  getUbicacionesAPI(){
    let detallesDeUbicacion;

    for(let i=1;i<=50;i++){
      this.servicio.getUbicacion(i).subscribe(response =>{
        detallesDeUbicacion = {
          id: i,
          name: response.name,
          type: response.type,
          dimention: response.dimension,
          created: response.created
        }
          this.arrayUbicaciones.push(detallesDeUbicacion);
          this.paginasEnTotal = Math.ceil(this.arrayUbicaciones.length/this.totalPorPagina);
          this.arregloPaginado = this.segmentarArreglo();
        });
    }
  }

  segmentarArreglo(){
    let array = [];
    for(let i=0;i<this.arrayUbicaciones.length;i+=this.totalPorPagina){
      array.push(this.arrayUbicaciones.slice(i,i+this.totalPorPagina));
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
