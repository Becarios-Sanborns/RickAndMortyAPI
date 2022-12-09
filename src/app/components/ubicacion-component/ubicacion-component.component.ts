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
    this.filtrarUbicacion();
  }

  titulosTabla = ['#','Name','Type','Created'];
  ubicaciones:any[] = [];
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
          nombre: response.name,
          type: response.type,
          dimention: response.dimension,
          created: response.created
        }
          this.ubicaciones.push(detallesDeUbicacion);
          this.paginasEnTotal = Math.ceil(this.ubicaciones.length/this.totalPorPagina);
          this.arregloPaginado = this.servicio.dividirArreglo(this.ubicaciones);
        });
    }
  }

  filtrarUbicacion(){
    this.servicio.textoObservable.subscribe(res =>{
      console.log("textoU",res);
      this.arregloPaginado = this.servicio.filtrarPorTexto(this.ubicaciones,res);
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
