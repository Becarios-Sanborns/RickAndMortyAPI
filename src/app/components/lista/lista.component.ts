import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjetoDatos } from 'src/app/interface/objeto-datos';
import { RickMortyService } from 'src/app/services/RickMorty.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  thHead:string[] = ['Image','#','Name','Status','Species / Type']; 
  personajes:any[] = [];
  arregloPaginado:any[] = [];
  arregloObjeto:ObjetoDatos[]=[];

  interfaceObjeto!:ObjetoDatos;
  
  paginaActual = 1;
  totalPorPagina = 5;
  paginasEnTotal = 0;

  constructor(private serviceRM: RickMortyService) { }

  ngOnInit(): void {
    this.getPersonajes();
    this.filtrarPersonaje();
  }

  getPersonajes(){
   let caracteristicasPersonaje;
      for(let i=1;i<=50;i++){
        this.serviceRM.getPersonajes(i).subscribe(response =>{
          caracteristicasPersonaje = {
            imagen: response.image,
            index: i,
            name: response.name,
            estado: response.status,
            especie: response.species,
            tipo: response.type
          }
            this.personajes.push(caracteristicasPersonaje);
            this.paginasEnTotal = Math.ceil(this.personajes.length/this.totalPorPagina);
            this.arregloPaginado = this.serviceRM.dividirArreglo(this.personajes);
        });
    }
  }

  filtrarPersonaje(){
    this.serviceRM.textoObservable.subscribe(res => {
      console.log("textoP",res);  
      this.arregloPaginado = this.serviceRM.filtrarPorTexto(this.personajes,res);
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

/*for(let i=1;i<=50;i++){
        this.serviceRM.filterCharacters(i,res).subscribe(objeto => {
                if(objeto.name.includes(res)){

                    this.interfaceObjeto = {
                      index: i,
                      nombre:objeto.name,
                      estado:objeto.status,
                      especie:objeto.species,
                      tipo: objeto.type
                    }

                   console.log(this.interfaceObjeto);

                }
        });
      }*/
