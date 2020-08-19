export const INIT_LIMIT = 100;
export const INDEX_ID = 6;
/**
 * Options sources
 * 'https://pokeres.bastionbot.org/images/pokemon/'
 * 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
 */
export const URL_IMAGES = 'https://pokeres.bastionbot.org/images/pokemon/';
export const URL_API = 'https://pokeapi.co/api/v2';
export const GET_BASE = 'pokemon';
export const GET_ABILITY = 'ability';
export const GET_EVOLUTION = 'pokemon-species';
export const GET_EVOLUTION_CHAIN = 'evolution-chain';

export const SECOND_COLOR = '#00ff00';
export const COLUMS_SEARCH = 3;

export const ANIMATION_SETTING = {
  animation: 'spring',
  config: {
    stiffness: 9000,
    damping: 100,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};