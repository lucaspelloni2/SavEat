import React, {useState, useContext} from 'react';
import {Recipe, RecipeEvaluationPossibility} from '../helpers/backend-types';
import {View, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import {Flex, MyView} from '../layout/Layout';
import styled from 'styled-components';
import {Ingredients} from './Ingredients';
import OverallScore from './OverallScore';
import VariantEvaluation from './VariantEvaluation';
import {getAlphaColor} from '../layout/AlphaColor';
import {__COLORS} from '../layout/Colors';
import {ModalSetterContext} from '../helpers/modalize-context';
import {TouchableHighlight} from 'react-native-gesture-handler';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const possibility = props.possibility;

  const ingredients = possibility.ingredients.filter(
    i => i.products.length > 0,
  );
  const {store} = possibility;
  let currentScore = ingredients[currentIndex].products[0]
    ? ingredients[currentIndex].products[0].co2Offset
    : 0;

  const setModalizeContext = useContext(ModalSetterContext);
  // @ts-ignore
  const grams = props.recipe.ingredients.map(i => i.gram);
  const offsets = ingredients.map(i => i.products[0].co2Offset);
  let totalGrams = 0;
  let totalOffset = 0;
  for (let i = 0; i < grams.length; i++) {
    if (!grams[i] || !offsets[i]) {
      continue;
    }
    const gram = grams[i];
    totalGrams += gram;
    const offset = offsets[i];
    totalOffset += offset;
  }
  const co2Score = (totalOffset / totalGrams) * 100;
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
          currentIndex={currentIndex}
          currentScore={currentScore}
          scores={ingredients
            .map(i => {
              return i.products[0] && i.products[0].co2Offset;
            })
            .filter(Boolean)}
          co2Score={co2Score}
        />
        <Ingredients
          ingredients={ingredients}
          onSnapToItem={currentIndex => {
            setCurrentIndex(currentIndex);
          }}
        />
        <View style={{height: 12}} />
        {ingredients.map((i, idx) => (
          <View key={idx}>
            {i.products.length > 0 ? (
              <>
                <TouchableHighlight
                  underlayColor="rgba(0, 0, 0, 0.05)"
                  onLongPress={() => {
                    setModalizeContext(i.products);
                  }}>
                  <VariantEvaluation
                    grayed={idx % 2 === 0}
                    evaluation={i.products[0]}
                  />
                </TouchableHighlight>
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
