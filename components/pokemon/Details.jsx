import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  display: flex;
  flex-direction: column;
`;

const Panel = styled(motion.div)`
  flex: 1;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.pokedetailsPanelBackground};
`;

export const Details = () => (
  <Container
    initial={{ y: '100vh' }}
    animate={{ y: 0 }}
    transition={{ delay: 0.25, duration: 0.5 }}
  >
    <Panel />
  </Container>
);
