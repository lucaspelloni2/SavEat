import React from 'react';

import {Recipe, RecipeEvaluationPossibility} from '../helpers/backend-types';
import {View, Image} from 'react-native';
import Card from './Card';
import {Flex, MyView} from '../layout/Layout';
import styled from 'styled-components';
import {Ingredients} from './Ingredients';
import OverallScore from './OverallScore';
import VariantEvaluation from './VariantEvaluation';
import {getAlphaColor} from '../layout/AlphaColor';
import {__COLORS} from '../layout/Colors';

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

export default (props: {
  possibility: RecipeEvaluationPossibility;
  recipe: Recipe;
}) => {
  const possibility = props.possibility;
  const {store} = possibility;
  // @ts-ignore
  return (
    <>
      <StoresView>
        <Flex number={store === 'COOP' ? 1 : 0} />
        {Stores.map(s => {
          return (
            <Store isActive={s === store} key={s}>
              <Image
                source={getImage(s)}
                style={{
                  width: 100,
                  height: 35,
                  tintColor: s === store ? undefined : 'gray',
                }}
                resizeMode={'contain'}
              />
            </Store>
          );
        })}
        <Flex number={store === 'COOP' ? 0 : 1} />
      </StoresView>
      <Card>
        <OverallScore
          recipe={props.recipe}
          score={possibility.ingredients[0].products[0].co2Offset}
        />
        <Ingredients ingredients={possibility.ingredients} />
        <View style={{height: 12}} />
        {possibility.ingredients.map((i, idx) => (
          <View>
            {i.products.length > 0 ? (
              <>
                <VariantEvaluation
                  grayed={idx % 2 === 0}
                  evaluation={i.products[0]}
                />
              </>
            ) : null}
          </View>
        ))}
        <View
          style={{
            borderColor: getAlphaColor(0.1, __COLORS.TEARTIARY),
            borderWidth: 1,
            marginBottom: 50,
          }}
        />
      </Card>
    </>
  );
};
