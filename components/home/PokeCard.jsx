import * as R from 'ramda';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import {
  animate, motion, useMotionValue, useTransform, useViewportScroll,
} from 'framer-motion';

const Container = styled(motion.div)`
  min-height: 5.5rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: 1rem;
  background-color: ${({ theme, mainType }) => theme.colors[`${mainType}Color`]};
  color: ${({ theme }) => theme.colors.pokecardText};
  cursor: pointer;
`;

const Name = styled.h2`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
  text-transform: capitalize;
`;

const Type = styled.span`
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  text-transform: capitalize;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.pokecardTypeBackground};

  & + & {
    margin-top: 0.5rem;
  }
`;

const Picture = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  width: 42.5%;
`;

const useInitialAnimation = (initialDelay) => {
  const opacity = useMotionValue(0);
  const y = useMotionValue('1rem');

  useEffect(() => {
    const controls = animate(opacity, 1, {
      delay: initialDelay,
    });

    return controls.stop;
  });

  useEffect(() => {
    const controls = animate(y, '0rem', {
      delay: initialDelay,
    });

    return controls.stop;
  });

  return { opacity, y };
};

const useScrollOpacity = () => {
  const ref = useRef(null);
  const [clientHeight, setClientHeight] = useState(0);
  const [dimensions, setDimensions] = useState({ top: 0, height: 0 });

  const { scrollY } = useViewportScroll();
  const yOpacityRange = [
    dimensions.top + dimensions.height,
    dimensions.top,
    dimensions.top + dimensions.height - clientHeight,
    dimensions.top - clientHeight,
  ];
  const opacityRange = [0, 1, 1, 0];
  const opacity = useTransform(
    scrollY,
    yOpacityRange,
    opacityRange,
  );
  useEffect(() => {
    if (!ref.current) return null;

    const setValues = () => {
      setClientHeight(window.innerHeight);
      setDimensions({ top: ref.current.offsetTop, height: ref.current.offsetHeight });
    };

    setValues();
    document.addEventListener('load', setValues);
    window.addEventListener('resize', setValues);

    return () => {
      document.removeEventListener('load', setValues);
      window.removeEventListener('resize', setValues);
    };
  }, [setDimensions, setClientHeight]);

  return {
    ref,
    opacity,
  };
};

export const PokeCard = ({
  name,
  types,
  image,
  initialDelay,
  ...props
}) => {
  const { opacity: baseOpacity, y } = useInitialAnimation(initialDelay);
  const { ref, opacity: scrollOpacity } = useScrollOpacity();
  const opacity = useTransform([baseOpacity, scrollOpacity], R.apply(R.min));

  return (
    <Container
      {...props}
      mainType={types[0]}
      ref={ref}
      style={{ opacity, y }}
      whileHover={{ scale: 1.05 }}
    >
      <Name>
        {name}
      </Name>
      {types.map((type) => (
        <Type key={type}>
          {type}
        </Type>
      ))}
      <Picture>
        <Image src={image} alt="" width={100} height={100} />
      </Picture>
    </Container>
  );
};

PokeCard.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  initialDelay: PropTypes.number.isRequired,
};
