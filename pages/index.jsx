import * as R from 'ramda';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import { PokeCard } from '~/components/home';
import { DefaultLayout } from '~/layouts';

const Container = styled.main`
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: 1fr 1fr;
`;

const Home = ({ pokemon }) => (
  <Container>
    <Head>
      <title>Pokedex</title>
    </Head>
    <main>
      <Title>Pokedex</Title>
      <PokemonGrid>
        {pokemon.map(({
          id,
          name,
          types,
          image,
        }, index) => (
          <PokeCard
            key={id}
            name={name}
            types={types}
            image={image}
            initialDelay={0.05 * index}
          />
        ))}
      </PokemonGrid>
    </main>
  </Container>
);

Home.Layout = DefaultLayout;
Home.propTypes = {
  pokemon: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
  })).isRequired,
};

export default Home;
export const getStaticProps = async () => {
  const pokemon = await R.compose(
    Promise.all.bind(Promise),
    R.map(R.compose(
      R.andThen(({ id, name, types }) => ({
        id,
        name,
        types: types.map(R.path(['type', 'name'])),
        image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
      })),
      R.andThen((response) => response.json()),
      (id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    )),
  )(R.range(1, 15));

  return {
    props: {
      pokemon,
    },
  };
};
