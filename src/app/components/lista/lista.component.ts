import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  paginaActual = 1;
  totalPorPagina = 5;
  paginasEnTotal = 0;

  constructor(private serviceRM: RickMortyService, private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPersonajes();
    this.filtrarTexto();
  }

  getPersonajes(){
    let caracteristicasPersonaje;
      for(let i=1;i<=50;i++){

        this.serviceRM.getPersonajes(i).subscribe(response =>{
          caracteristicasPersonaje = {
            imagen: response.image,
            index: i,
            nombre: response.name,
            estado: response.status,
            especie: response.species,
            tipo: response.type
          }
            this.personajes.push(caracteristicasPersonaje);
            this.paginasEnTotal = Math.ceil(this.personajes.length/this.totalPorPagina);
            this.arregloPaginado = this.segmentarArreglo();
        });
    }
  }

  segmentarArreglo(){
    let array = [];
    for(let i=0;i<this.personajes.length;i+=this.totalPorPagina){
      array.push(this.personajes.slice(i,i+this.totalPorPagina));
    }
    return array;
  }

 

  filtrarTexto(){
    this.serviceRM.textoObservable.subscribe(res => {
      console.log("texto",res);
      for(let i=1;i<=50;i++){
        this.serviceRM.filterCharacters(i,res).subscribe(objeto => {
            try{
                if(objeto.name.includes(res)){
                  console.log("objeto",objeto);
                }
              }catch(error){}  
        });
      }
    });
  }

/*  filtrar(){
    for(let i=1;i<=50;i++){
      this.serviceRM.filterCharacters(i,this.mensaje).subscribe(res => {
       try{
          if(res.name.includes(this.mensaje)){
            console.log("pp",res);
          }
        }catch(error){
          console.log(error);
        }  
  });
  }
  }*/

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
