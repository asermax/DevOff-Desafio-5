import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Picture = ({ id, image }) => (
  <Container
    layoutId={`pokemon-image-${id}`}
  >
    <Image src={image} alt="" width={250} height={250} layout="fixed" />
  </Container>
);

Picture.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
