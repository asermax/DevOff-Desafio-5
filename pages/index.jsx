import * as R from 'ramda';
import { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll';
import { PokeCard } from '~/components/home';
import { DefaultLayout } from '~/layouts';
import { fetchPokemon, useAppState } from '~/data';

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

const Home = ({ pokemon }) => {
  const {
    firstRender,
    homeScroll,
    doFirstRender,
    saveHomeScroll,
  } = useAppState();
  const scrollY = useScrollPosition(1);

  useEffect(() => doFirstRender(), [doFirstRender]);
  useEffect(() => () => {
    saveHomeScroll(scrollY);
  }, [scrollY, saveHomeScroll]);
  useEffect(() => {
    window.scrollTo(0, homeScroll);
  // only scroll on first render
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
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
            <Link
              href={`/${id}`}
              key={id}
            >
              <PokeCard
                id={id}
                name={name}
                types={types}
                image={image}
                initialDelay={0.05 * Math.floor(index / 2)}
                shouldAnimate={firstRender}
              />
            </Link>
          ))}
        </PokemonGrid>
      </main>
    </Container>
  );
};

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
    R.map(fetchPokemon(['id', 'name', 'types', 'image'])),
  )(R.range(1, parseInt(process.env.POKEMON_TRESHOLD, 10)));

  return {
    props: {
      pokemon,
    },
  };
};
