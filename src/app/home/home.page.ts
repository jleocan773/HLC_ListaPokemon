import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonEditando = {} as Pokemon;
  arrayColeccionPokemon: any = [
    {
      id: '',
      pokemon: {} as Pokemon,
    },
  ];
  idPokemonSelec: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private SocialSharing: SocialSharing
  ) {
    this.obtenerListaPokemons();
  }

  obtenerListaPokemons() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar('pokemons').subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionPokemon = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosPokemon) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionPokemon.push({
          id: datosPokemon.payload.doc.id,
          pokemon: datosPokemon.payload.doc.data(),
        });
      });
    });
  }

  selecPokemon(idTarea: string, tareaSelec: Pokemon) {
    this.pokemonEditando = tareaSelec;
    this.idPokemonSelec = idTarea;
    this.router.navigate(['detalle', this.idPokemonSelec]);
  }

  share() {
    this.SocialSharing.share(
      'Mensaje para compartir',
      'Asunto opcional',
      "Archivo opcional",
      'https://www.example.com'
    )
      .then(() => {
        console.log('Compartido con éxito');
      })
      .catch((error) => {
        console.error('Error al compartir', error);
      });
  }
}