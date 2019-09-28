import React from 'react';
import {RecipeEvaluationPossibility} from '../helpers/backend-types';
import styled from 'styled-components';
import {View, Text, Image} from 'react-native';

const Container = styled(View)`
  background: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 1;
`;

export default (props: {possibility: RecipeEvaluationPossibility}) => {
  return (
    <Container>
      <Text>{props.possibility.store}</Text>

      {props.possibility.ingredients.map(ingredient => {
        if (!ingredient.products.length) {
          // TODO: Show empty view
          return null;
        }
        return (
          <View key={ingredient.products[0].name}>
            <Image
              style={{height: 40, width: 40}}
              source={{
                uri: ingredient.products[0].image,
              }}
            />
            <Text>{ingredient.products[0].food}</Text>
            <Text>{ingredient.products[0].name}</Text>
          </View>
        );
      })}
    </Container>
  );
};
