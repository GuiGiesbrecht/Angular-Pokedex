import { Component, OnInit } from '@angular/core';
import { PokeApiService } from './pokedex.service';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.getPokemonList().then((res) => {
      this.pokemonList = res;
    });
  }
}
