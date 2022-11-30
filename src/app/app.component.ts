import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Marvel';
}

/*fetch('https://rickandmortyapi.com/api/character')
  .then(response=>response.json())
  .then(json=>{
    console.log(json.results);
});*/