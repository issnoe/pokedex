
import Fetch from '../libs/fetch';
import { INIT_LIMIT } from '../config';
export default class PokemonService {
  static async loadPokemon(offset) {
    const url = `/pokemon?offset=${offset}&limit=${INIT_LIMIT}`;
    return Fetch.get({ url });
  }

  static async getEvolution() {

  }

  static async getAbilities() {

  }
}

