import * as R from 'ramda';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fetchPokemon, useAppState } from '~/data';
import { DefaultLayout } from '~/layouts';
import { Body, Details, Picture } from '~/components/pokemon';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Pokemon = ({ pokemon }) => {
  const doFirstRender = useAppState(R.prop('doFirstRender'));
  useEffect(() => doFirstRender(), [doFirstRender]);

  return (
    <Container>
      <Body
        {...pokemon}
      />
      <Picture {...pokemon} />
      <Details {...pokemon} />
    </Container>
  );
};

Pokemon.Layout = DefaultLayout;

Pokemon.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    species: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    stats: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default Pokemon;
export const getStaticProps = async ({ params }) => {
  const pokemon = await R.compose(
    fetchPokemon([
      'id', 'name', 'types', 'image', 'stats',
      'species', 'abilities', 'height', 'weight',
    ]),
    R.prop('id'),
  )(params);

  return {
    props: {
      pokemon,
    },
  };
};

export const getStaticPaths = () => ({
  paths: R.map(
    R.compose(
      R.objOf('params'),
      R.objOf('id'),
      R.toString,
    ),
    R.range(1, parseInt(process.env.POKEMON_TRESHOLD, 10)),
  ),
  fallback: false,
});
