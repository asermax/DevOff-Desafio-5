import * as R from 'ramda';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
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
  padding: 1rem 2rem;
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.pokedetailsPanelBackground};
`;

const Tabs = styled(motion.nav)`
  display: flex;
  flex-direction: row;
  border-bottom: 0.062rem solid ${({ theme }) => theme.colors.pokedetailsPanelTabsBorder};
`;

const Tab = styled(motion.button)`
  position: relative;
  padding: 0 0 1rem;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.pokedetailsPanelTab};
  cursor: pointer;

  & + & {
    margin-left: 2rem;
  }
`;

const TabUnderline = styled(motion.div)`
  position: absolute;
  bottom: -0.0625rem;
  left: 0;
  right: 0;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.pokedetailsPanelActiveTabUnderline};
`;

const TabContainer = styled(motion.div)`
  position: relative;
  flex: 1;
`;

const TabContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const Trait = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;

  & + & {
    margin-top: 0.75rem;
  }
`;

const Label = styled(motion.div)`
  width: 8rem;
  color: ${({ theme }) => theme.colors.pokedetailsPanelTraitLabel};
  font-weight: 700;
  text-transform: capitalize;
`;

const Value = styled(motion.div)`
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: capitalize;
`;

const BarContainer = styled(motion.div)`
  flex: 1;
  height: 0.125rem;
  position: relative;
  background-color: ${({ theme }) => theme.colors.pokedetailsPanelBarContainerBackground};
  border-radius: 1rem;
`;

const Bar = styled(motion.div)`
  position: absolute;
  left: 0;
  top: -0.062rem;
  bottom: -0.062rem;
  border-radius: 1rem;
  background-color: ${({ theme, type }) => theme.colors[`pokedetailsPanelBar${type}Background`]};
`;

export const Details = ({
  height,
  weight,
  species,
  abilities,
  stats,
}) => {
  const [currentTab, setCurrentTab] = useState('about');

  return (
    <Container
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
    >
      <Panel>
        <Tabs>
          <AnimateSharedLayout>
            <Tab
              onClick={(() => setCurrentTab('about'))}
            >
              About
              {currentTab === 'about' ? (<TabUnderline layoutId="underline" />) : null}
            </Tab>
            <Tab
              active={currentTab === 'stats'}
              onClick={(() => setCurrentTab('stats'))}
            >
              Base Stats
              {currentTab === 'stats' ? (<TabUnderline layoutId="underline" />) : null}
            </Tab>
          </AnimateSharedLayout>
        </Tabs>
        <TabContainer>
          <AnimatePresence>
            <TabContent
              key={currentTab}
              initial={{ x: currentTab === 'about' ? -300 : 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: currentTab === 'about' ? -300 : 300, opacity: 0 }}
            >
              {currentTab === 'about' ? (
                <>
                  <Trait>
                    <Label>
                      Species
                    </Label>
                    <Value>
                      {species}
                    </Value>
                  </Trait>
                  <Trait>
                    <Label>
                      Height
                    </Label>
                    <Value>
                      {(height / 10).toFixed(2)}
                      &nbsp;cm
                    </Value>
                  </Trait>
                  <Trait>
                    <Label>
                      Weight
                    </Label>
                    <Value>
                      {(weight / 10).toFixed(1)}
                      &nbsp;kg
                    </Value>
                  </Trait>
                  <Trait>
                    <Label>
                      Abilities
                    </Label>
                    <Value>
                      {abilities.join(', ')}
                    </Value>
                  </Trait>
                </>
              ) : R.compose(
                R.values,
                R.mapObjIndexed((value, key) => (
                  <Trait key={key}>
                    <Label>
                      {key}
                    </Label>
                    <Value>
                      {value}
                    </Value>
                    <BarContainer>
                      <Bar
                        type={value > 50 ? 'Good' : 'Bad'}
                        initial={{ right: '100%' }}
                        animate={{ right: `${100 - value}%` }}
                      />
                    </BarContainer>
                  </Trait>
                )),
              )(stats)}
            </TabContent>
          </AnimatePresence>
        </TabContainer>
      </Panel>
    </Container>
  );
};

Details.propTypes = {
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  species: PropTypes.string.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  stats: PropTypes.objectOf(PropTypes.number).isRequired,
};
