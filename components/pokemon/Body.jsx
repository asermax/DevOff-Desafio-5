import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  height: 100vh;
  padding: 1.5rem 1.5rem 50vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, mainType }) => theme.colors[`${mainType}Color`]};
  color: ${({ theme }) => theme.colors.pokedetailsText};
`;

const Top = styled(motion.div)`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NameTypesContainer = styled(motion.div)``;

const Name = styled(motion.h1)`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
  text-transform: capitalize;
`;

const Types = styled(motion.div)`
  display: flex;
  flex-direction: row;
`;

const Type = styled(motion.div)`
  padding: 0.5rem 1.25rem;
  border-radius: 1rem;
  text-transform: capitalize;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.pokedetailsTypeBackground};

  & + & {
    margin-left: 0.5rem;
  }
`;

const PokeNumber = styled(motion.div)`
  font-size: 1rem;
  font-weight: 700;
`;

export const Body = ({
  id,
  name,
  types,
  image,
  ...props
}) => (
  <Container
    {...props}
    mainType={types[0]}
    initial={{ y: '-100vh' }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Top>
      <NameTypesContainer>
        <Name>
          {name}
        </Name>
        <Types>
          {types.map((type) => (
            <Type key={type}>
              {type}
            </Type>
          ))}
        </Types>
      </NameTypesContainer>
      <PokeNumber>
        #
        {id.toString().padStart(3, '0')}
      </PokeNumber>
    </Top>
  </Container>
);

Body.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
};
