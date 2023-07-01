import { Component, OnInit } from '@angular/core';
import { PokeApiService } from './pokedex.service';
import { Pokemon } from './pokemon';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  page = 2;
  itensPerPage = 10;
  numberOfPages = 0;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.countPokemons().then((res) => {
      this.numberOfPages = Math.ceil(res / this.itensPerPage);
    });

    this.pokeApiService
      .getPokemonList(this.page, this.itensPerPage)
      .then((res) => {
        this.pokemonList = res;

        setTimeout(() => {
          const cardElements = document.querySelectorAll('.card');
          VanillaTilt.init(Array.from(cardElements) as HTMLElement[]);
        }, 1000);
      });
  }

  colorByType(type: string): string {
    const classType = 'badge ';

    switch (type.toLowerCase()) {
      case 'grass':
        return classType.concat('text-bg-success');
      case 'poison':
        return classType.concat('text-bg-purple');
      case 'fire':
        return classType.concat('text-bg-danger');
      case 'flying':
        return classType.concat('bg-info');
      case 'water':
        return classType.concat('text-bg-primary');
      case 'bug':
        return classType.concat('text-bg-dark');
      case 'normal':
        return classType.concat('text-bg-light');
      case 'electric':
        return classType.concat('text-bg-warning');
      case 'ground':
        return classType.concat('text-bg-brown');
      case 'fairy':
        return classType.concat('text-bg-pink');
      case 'fighting':
        return classType.concat('text-bg-danger');
      case 'psychic':
        return classType.concat('text-bg-pink');
      case 'rock':
        return classType.concat('text-bg-brown');
      case 'steel':
        return classType.concat('text-bg-gray');
      case 'ice':
        return classType.concat('text-bg-info');
      case 'ghost':
        return classType.concat('text-bg-dark');
      case 'dragon':
        return classType.concat('text-bg-purple');
      default:
        return classType.concat('text-bg-light');
    }
  }
}
