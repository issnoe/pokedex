
import Fetch from '../libs/fetch';
import { INIT_LIMIT, GET_EVOLUTION, GET_EVOLUTION_CHAIN, GET_ABILITY, GET_BASE } from '../config';
import Transform from '../libs/transform'
export default class PokemonService {
  static async loadPokemon(offset) {
    const url = `/pokemon?offset=${offset}&limit=${INIT_LIMIT}`;
    return Fetch.get({ url });
  }
  static async getPokemon(id) {
    const responsePromise = await Promise.all([
      this.getEvolution(id),
      this.getAbilities(id),
      this.getBase(id),
    ]);

    const evolution = responsePromise[0] || {};
    const abilities = responsePromise[1].data || {};
    const base = responsePromise[2].data || {};
    const evolutionResponse = await this.getEvolutionChain(Transform.getId(evolution.data.evolution_chain.url));
    const evolutionChain = this.getChainEvolutionTransform(evolutionResponse.data);
    return {
      evolution: evolutionChain,
      abilities,
      base,
    };
  }

  static async getEvolution(id) {
    const url = `/${GET_EVOLUTION}/${id}`;
    return Fetch.get({ url });
  }
  static async getEvolutionChain(evolutionId) {
    const url = `/${GET_EVOLUTION_CHAIN}/${evolutionId}`;
    return Fetch.get({ url });
  }

  static async getAbilities(id) {
    const url = `/${GET_ABILITY}/${id}`;
    return Fetch.get({ url });
  }
  static async getBase(id) {
    const url = `/${GET_BASE}/${id}`;
    return Fetch.get({ url });
  }

  static getChainEvolution(id) {
    const url = `/${GET_ABILITY}/${id}`;
    return Fetch.get({ url });
  }

  static getChainEvolutionTransform(params) {
    const { evolves_to, species } = params.chain;
    const arrSpecies = []
    arrSpecies.push({ name: species.name, id: Transform.getId(species.url) });
    return this.getSpecies(evolves_to, arrSpecies, 0);
  }

  static getSpecies = (chainItem, arrSpecies, index) => {
    const { evolves_to, species } = chainItem[index];
    arrSpecies.push({ name: species.name, id: Transform.getId(species.url) });
    return evolves_to && evolves_to[index] && evolves_to[index].species ? this.getSpecies(evolves_to, arrSpecies, index) : arrSpecies;
  }
}

