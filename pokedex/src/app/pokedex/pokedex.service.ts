import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private httpClient: HttpClient) {}

  async getPokemonList(page: number, itensPerPage: number) {
    const pokemonList = [];

    for (
      let index = 1 + (page - 1) * itensPerPage;
      index < page * itensPerPage + 1;
      index++
    ) {
      pokemonList.push(
        await lastValueFrom(
          this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${index}`)
        ).then((res) => {
          return {
            id: res.id,
            name: res.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.id}.png`,
            types: res.types.map((type: any) => type.type.name),
          } as Pokemon;
        })
      );
    }

    return pokemonList;
  }

  async countPokemons() {
    return await lastValueFrom(
      this.httpClient.get<any>(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      )
    ).then((res) => {
      return res.count;
    });
  }
}
