import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { RickMortyService } from 'src/app/services/RickMorty.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(private router: Router,private service:RickMortyService) { }

  ngOnInit(): void {
  }

  personajes(){
    console.log("click");
    this.router.navigateByUrl('/main');
  }

  ubicacion(){
    console.log("Ubicacion");
    this.router.navigateByUrl('/ubicacion');
  }

  episodio(){
    console.log("episodio");
    this.router.navigateByUrl('/episodios');
  }

  texto = "";
  txtIgnoreCase = "";
   
  filtrarPersonajes(ev:any){
    this.texto = ev.target.value;
    let mayuscula = this.texto.charAt(0).toUpperCase();
    this.txtIgnoreCase = this.texto.replace(this.texto.charAt(0),mayuscula);

    this.service.textoSet(this.txtIgnoreCase);
    
    /*for(let i=1;i<=50;i++){
      this.service.filterCharacters(i,this.txtIgnoreCase).subscribe(res => {
       try{
          if(res.name.includes(this.txtIgnoreCase)){
            console.log("pp",res);
          }
        }catch(error){
          console.log(error);
        }  
      });
        }*/
  }

}
