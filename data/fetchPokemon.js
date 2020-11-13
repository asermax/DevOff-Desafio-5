import * as R from 'ramda';

export const fetchPokemon = R.curry((fields, id) => R.compose(
  R.andThen(R.compose(
    R.when(
      R.always(R.includes('image', fields)),
      R.assoc('image', `${process.env.POKEIMAGE_URL}/${id}.png`),
    ),
    R.evolve({
      types: R.map(R.path(['type', 'name'])),
      species: R.prop('name'),
      abilities: R.map(R.compose(
        R.replace('-', ' '),
        R.path(['ability', 'name']),
      )),
      stats: R.compose(
        R.reduce(R.mergeRight, {}),
        R.map(R.converge(
          R.objOf,
          [
            R.compose(R.replace('-', ' '), R.path(['stat', 'name'])),
            R.prop('base_stat'),
          ],
        )),
      ),
    }),
    R.pick(fields),
  )),
  R.andThen((response) => response.json()),
  fetch,
)(`${process.env.POKEAPI_URL}/${id}`));
