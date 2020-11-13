import { transparentize, darken } from 'polished';

const baseColors = {
  green: '#48d0b0',
  red: '#fb6c6c',
  blue: '#76bdfe',
  yellow: '#ffd86f',
  white: '#ffffff',
};

const colors = {
  // default layout
  defaultLayoutBackground: baseColors.white,

  // pokemon type colors
  grassColor: baseColors.green,
  fireColor: baseColors.red,
  waterColor: baseColors.blue,
  electricColor: baseColors.yellow,
  bugColor: baseColors.green,
  grassDarkerColor: darken(0.06, baseColors.green),
  fireDarkerColor: darken(0.06, baseColors.red),
  waterDarkerColor: darken(0.06, baseColors.blue),
  electricDarkerColor: darken(0.06, baseColors.yellow),
  bugDarkerColor: darken(0.06, baseColors.green),

  // pokecard
  pokecardText: baseColors.white,
  pokecardTypeBackground: transparentize(0.8, baseColors.white),

  // pokemon details
  pokedetailsText: baseColors.white,
  pokedetailsTypeBackground: transparentize(0.8, baseColors.white),
  pokedetailsPanelBackground: baseColors.white,
};

const fonts = {
  main: 'Roboto, sans-serif',
};

export const theme = {
  colors,
  fonts,
};
