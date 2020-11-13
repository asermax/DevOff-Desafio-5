import { AnimateSharedLayout } from 'framer-motion';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.defaultLayoutBackground};
  min-height: 100vh;
`;

export const DefaultLayout = ({ children }) => (
  <Container>
    <AnimateSharedLayout type="crossfade">
      {children}
    </AnimateSharedLayout>
  </Container>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
