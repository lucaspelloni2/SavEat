import React from 'react';
import {RecipeEvaluationPossibility} from '../helpers/backend-types';
import {View, ScrollView, Image} from 'react-native';
import Card from './Card';
import {Flex, MyView, TextBold} from '../layout/Layout';
import styled from 'styled-components';
import {Ingredients} from './Ingredients';

const StoresView = styled(MyView)`
  flex-direction: row;
  margin-top: -20px;
  margin-bottom: 10px;
`;

const Store = styled(MyView)<{isActive: boolean}>`
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  transform: ${props => (props.isActive ? 'scale(1)' : 'scale(0.5)')};
  flex: 1;
`;

export const Stores = ['COOP', 'MIGROS'];

const getImage = (store: string) => {
  if (store === 'COOP') {
    return require('../assets/images/coop.png');
  } else if (store === 'MIGROS') {
    return require('../assets/images/migros.png');
  }
};

export default (props: {possibility: RecipeEvaluationPossibility}) => {
  const possibility = props.possibility;
  const {store, ingredients} = possibility;
  // @ts-ignore
  return (
    <>
      <StoresView>
        <Flex number={store === 'COOP' ? 1 : 0} />
        {Stores.map(s => {
          return (
            <>
              <Store isActive={s === store}>
                <Image
                  source={getImage(s)}
                  style={{
                    width: 100,
                    height: 35,
                    tintColor: s === store ? 'default' : 'gray',
                  }}
                  resizeMode={'contain'}
                />
              </Store>
            </>
          );
        })}
        <Flex number={store === 'COOP' ? 0 : 1} />
      </StoresView>
      <Card>
        <Ingredients ingredients={possibility.ingredients} />
      </Card>
    </>
  );
};
