import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RickMortyService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPersonajes(tamaño:number){
    return this.http.get<any>(`${this.baseUrl}/character/${tamaño}`); 
  }

  getUbicacion(tamaño:number){
    return this.http.get<any>(`${this.baseUrl}/location/${tamaño}`);
  }

  getEpisodios(tamaño:number){
    return this.http.get<any>(`${this.baseUrl}/episode/${tamaño}`);
  }

  filterCharacters(tamaño:number,name:string){
    return this.http.get<any>(`${this.baseUrl}/character/${tamaño}/?name=${name}`);
  }

  texto!:string;
  filtrarTexto = new BehaviorSubject<string>(this.texto);

  get textoObservable():Observable<string>{
    return  this.filtrarTexto.asObservable();
  }

  textoSet(txt:string){
    this.texto = txt;
    this.filtrarTexto.next(this.texto);
  }

}

