import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private httpClient: HttpClient) {}

  async getPokemonList() {
    const req = await lastValueFrom(
      this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon?limit=151')
    );

    const pokemonBasicList = await Promise.all(
      req.results.map(async (pokemon: any) => {
        const id = pokemon.url.split('/')[6];
        console.log(id);
        return {
          id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      })
    );

    console.log(pokemonBasicList);

    return pokemonBasicList;
  }
}
