import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.defaultLayoutBackground};
`;

export const DefaultLayout = ({ children }) => (
  <Container>
    {children}
  </Container>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
