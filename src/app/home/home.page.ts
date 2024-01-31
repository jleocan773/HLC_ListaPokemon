import { Component } from '@angular/core';
import {Pokemon} from '../pokemon'
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemonEditando = {} as Pokemon;
  arrayColeccionPokemon: any = [{
    id: "",
    pokemon: {} as Pokemon
  }];
  idPokemonSelec: string = "";

  constructor(private firestoreService: FirestoreService, private router: Router) {
    this.obtenerListaPokemons();
  }



  obtenerListaPokemons() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar("pokemons").subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionPokemon = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosTarea) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionPokemon.push({
          id: datosTarea.payload.doc.id,
          pokemon: datosTarea.payload.doc.data()
        })
      });
    });
  }

  selecPokemon(idTarea:string, tareaSelec:Pokemon) {
    this.pokemonEditando = tareaSelec;
    this.idPokemonSelec = idTarea;
    this.router.navigate(['detalle', this.idPokemonSelec])
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("pokemons", this.pokemonEditando).then(() => {
      console.log('Tarea creada correctamente!');
      this.pokemonEditando= {} as Pokemon;
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idPokemonSelec).then(() => {
      console.log('Tarea borrada correctamente!');
      this.pokemonEditando= {} as Pokemon;
      this.idPokemonSelec = "";
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonModificar(){
    this.firestoreService.modificar("tareas", this.idPokemonSelec, this.pokemonEditando).then(() => {
      console.log('Tarea editada correctamente!');
    }, (error) => {
      console.error(error);
    });
  }

}

